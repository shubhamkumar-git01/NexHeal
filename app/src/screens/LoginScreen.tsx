import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Home');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <Text className="text-5xl font-extrabold text-blue-600 tracking-tight">NexHeal</Text>
          <Text className="text-slate-500 mt-2 text-center text-base">Your personal healthcare companion.</Text>
        </View>

        <View className="space-y-4">
          <View className="space-y-1 mb-4">
            <Text className="font-semibold text-slate-700 ml-1 mb-1">Email</Text>
            <TextInput 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-base"
              placeholder="patient@nexheal.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View className="space-y-1 mb-6">
            <Text className="font-semibold text-slate-700 ml-1 mb-1">Password</Text>
            <TextInput 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-base"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            disabled={isLoading}
            className={`w-full rounded-xl py-4 items-center shadow-sm ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
          >
            <Text className="text-white font-bold text-lg">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-slate-500 text-base">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-bold text-base">Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
