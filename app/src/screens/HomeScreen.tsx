import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const quickActions = [
    { id: 1, title: 'Book Doctor', icon: '🩺', color: 'bg-blue-100', textColor: 'text-blue-700' },
    { id: 2, title: 'Symptom Checker', icon: '🤖', color: 'bg-purple-100', textColor: 'text-purple-700' },
    { id: 3, title: 'Video Consult', icon: '🎥', color: 'bg-emerald-100', textColor: 'text-emerald-700' },
    { id: 4, title: 'My Reports', icon: '📄', color: 'bg-amber-100', textColor: 'text-amber-700' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="px-6 pt-10 pb-6 bg-white rounded-b-3xl shadow-sm border-b border-slate-100">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-slate-500 text-base font-medium">Good Morning,</Text>
              <Text className="text-3xl font-extrabold text-slate-900 mt-1">Rahul Sharma</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center border-2 border-white shadow-sm">
              <Text className="text-blue-700 font-bold text-lg">RS</Text>
            </TouchableOpacity>
          </View>
          
          {/* AI Banner */}
          <TouchableOpacity className="mt-8 bg-purple-600 rounded-2xl p-5 flex-row items-center shadow-lg shadow-purple-200">
            <Text className="text-4xl mr-4">✨</Text>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">NexHeal AI Assistant</Text>
              <Text className="text-purple-100 text-sm mt-1">Check your symptoms instantly with our advanced AI.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8">
          <Text className="text-xl font-bold text-slate-800 mb-4">Quick Services</Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                className="w-[48%] bg-white p-4 rounded-2xl mb-4 items-center justify-center shadow-sm border border-slate-100"
              >
                <View className={`w-14 h-14 rounded-full ${action.color} items-center justify-center mb-3`}>
                  <Text className="text-2xl">{action.icon}</Text>
                </View>
                <Text className="font-bold text-slate-700">{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View className="px-6 mt-4 mb-10">
          <Text className="text-xl font-bold text-slate-800 mb-4">Upcoming Schedule</Text>
          
          <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <View className="flex-row justify-between items-center mb-4 border-b border-slate-100 pb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-3">
                  <Text className="text-xl">👨‍⚕️</Text>
                </View>
                <View>
                  <Text className="font-bold text-slate-800 text-lg">Dr. Smith</Text>
                  <Text className="text-slate-500 text-sm">Cardiologist</Text>
                </View>
              </View>
              <View className="bg-emerald-100 px-3 py-1.5 rounded-full">
                <Text className="text-emerald-700 font-bold text-xs">Confirmed</Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between bg-slate-50 p-3 rounded-xl mb-4">
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">📅</Text>
                <Text className="font-semibold text-slate-700">Today, 10:30 AM</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">🎥</Text>
                <Text className="font-semibold text-slate-700">Video Call</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => navigation.navigate('Call')}
              className="w-full bg-blue-600 rounded-xl py-3.5 items-center"
            >
              <Text className="text-white font-bold text-base">Join Consultation</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
