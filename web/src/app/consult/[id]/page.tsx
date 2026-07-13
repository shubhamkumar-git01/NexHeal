"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, PenTool, LayoutTemplate, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || "http://localhost:5000";

export default function ConsultationRoom() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params.id as string;
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [prescription, setPrescription] = useState("");
  const [isDoctor, setIsDoctor] = useState(true); // For demo, assume true. In real app, fetch from auth context.

  useEffect(() => {
    const s = io(BACKEND_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to signaling server");
      s.emit("join-consultation", consultationId);
    });

    s.on("user-joined", async (userId) => {
      console.log("Other user joined:", userId);
      setIsRemoteConnected(true);
      // Initiator creates offer
      createOffer(s);
    });

    s.on("user-left", () => {
      console.log("Other user left");
      setIsRemoteConnected(false);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });

    return () => {
      s.disconnect();
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, [consultationId]);

  useEffect(() => {
    if (!socket) return;

    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    
    const pc = new RTCPeerConnection(configuration);
    setPeerConnection(pc);

    // Get local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });
      })
      .catch(err => console.error("Error accessing media devices.", err));

    // Handle incoming tracks
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsRemoteConnected(true);
      }
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", {
          consultationId,
          candidate: event.candidate
        });
      }
    };

    // Signaling handlers
    socket.on("webrtc-offer", async (data) => {
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("webrtc-answer", {
        consultationId,
        answer
      });
    });

    socket.on("webrtc-answer", async (data) => {
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on("webrtc-ice-candidate", async (data) => {
      if (!pc) return;
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error("Error adding received ice candidate", e);
      }
    });

    return () => {
      pc.close();
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
    };
  }, [socket, consultationId]);

  const createOffer = async (s: Socket) => {
    if (!peerConnection) return;
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      s.emit("webrtc-offer", {
        consultationId,
        offer
      });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !isVideoOn;
      setIsVideoOn(!isVideoOn);
    }
  };

  const endCall = () => {
    if (socket) {
      socket.emit("leave-consultation", consultationId);
    }
    localStream?.getTracks().forEach(track => track.stop());
    router.push("/dashboard");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6 pb-6">
      <div className="flex-1 flex flex-col gap-6">
        {/* Video Area */}
        <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 shadow-xl flex items-center justify-center">
          {isRemoteConnected ? (
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-slate-500 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-slate-600" />
              </div>
              <p className="font-medium">Waiting for other participant to join...</p>
              <p className="text-sm mt-1">Consultation ID: {consultationId}</p>
            </div>
          )}

          {/* Local Video Picture-in-Picture */}
          <div className="absolute bottom-6 right-6 w-48 aspect-video bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl">
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/50">
            <Button 
              variant={isMicOn ? "secondary" : "destructive"} 
              size="icon" 
              className="rounded-full w-12 h-12"
              onClick={toggleMic}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button 
              variant={isVideoOn ? "secondary" : "destructive"} 
              size="icon" 
              className="rounded-full w-12 h-12"
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button 
              variant="destructive" 
              size="icon" 
              className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600"
              onClick={endCall}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Prescription / Notes Sidebar */}
      <div className="w-96 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-none">Live Prescription</h3>
              <p className="text-xs text-muted-foreground mt-1">Logged securely to EHR</p>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <Textarea 
              placeholder={isDoctor ? "Write prescription, medicines, advice..." : "Doctor is writing prescription..."}
              className="flex-1 resize-none border-0 focus-visible:ring-0 px-0 rounded-none bg-transparent"
              value={prescription}
              onChange={(e) => isDoctor && setPrescription(e.target.value)}
              readOnly={!isDoctor}
            />
          </div>
          
          {isDoctor && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <Button className="w-full">
                Save to Patient EHR
              </Button>
            </div>
          )}
        </Card>

        {/* Patient Vitals Quick View */}
        <Card className="p-4 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground">
            <Activity className="w-4 h-4" />
            Patient Vitals (Syncing)
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">Heart Rate</p>
              <p className="text-xl font-bold mt-1 text-slate-800 dark:text-slate-200">72 bpm</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Blood Pressure</p>
              <p className="text-xl font-bold mt-1 text-slate-800 dark:text-slate-200">120/80</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
