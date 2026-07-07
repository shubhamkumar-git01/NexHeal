"use client";

import { useEffect, useRef, useState, use } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function VideoCallPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
  const myStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    // 1. Initialize Socket
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socket = io(API_URL);
    
    // 2. Initialize PeerJS (WebRTC)
    const peer = new Peer({
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" }
        ]
      }
    });
    peerInstance.current = peer;

    // 3. Get Media (Camera & Mic)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      myStream.current = stream;
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // 4. Answer incoming calls
      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = userVideoStream;
          }
        });
      });

      // 5. Connect to room via Socket
      peer.on("open", (id) => {
        socket.emit("join-room", roomId, id);
      });

      // 6. When a new user connects, call them
      socket.on("user-connected", (userId) => {
        const call = peer.call(userId, stream);
        call.on("stream", (userVideoStream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = userVideoStream;
          }
        });
      });
      
      socket.on("user-disconnected", () => {
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = null;
        }
      });
      
    }).catch(err => {
      console.error("Error accessing media devices", err);
      alert("Please allow camera and microphone access to use video calls.");
    });

    return () => {
      socket.disconnect();
      peer.destroy();
      myStream.current?.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  const toggleMute = () => {
    if (myStream.current) {
      const audioTrack = myStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (myStream.current) {
      const videoTrack = myStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const endCall = () => {
    router.push("/dashboard/appointments");
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Remote Video (Full Screen) */}
      <video
        ref={userVideoRef}
        autoPlay
        className="w-full h-full object-cover"
      />
      
      {/* Local Video (Floating Picture-in-Picture) */}
      <div className="absolute top-6 right-6 w-48 h-64 bg-slate-800 rounded-xl overflow-hidden border-2 border-white shadow-2xl z-10">
        <video
          ref={myVideoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-700 flex items-center space-x-6 z-20 shadow-2xl">
        <button 
          onClick={toggleMute}
          className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button 
          onClick={endCall}
          className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-lg"
        >
          <PhoneOff className="w-8 h-8" />
        </button>
        
        <button 
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Overlay info */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 flex items-center shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
          <p className="text-white font-medium text-sm">Room: {roomId}</p>
        </div>
      </div>
    </div>
  );
}
