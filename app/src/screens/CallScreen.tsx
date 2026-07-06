import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CallScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-row justify-between items-center px-4 py-3 bg-slate-800">
        <Text className="text-white font-bold text-lg">Dr. Smith (Consultation)</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-red-500 px-4 py-1.5 rounded-full"
        >
          <Text className="text-white font-bold">End Call</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center bg-slate-900 z-10">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white mt-4 font-medium">Connecting securely to Doctor...</Text>
        </View>
      )}

      <WebView 
        source={{ uri: 'http://192.168.1.5:3000/call/mobile-room-1' }} // Using local IP for mobile access
        className="flex-1 bg-slate-900"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
}
