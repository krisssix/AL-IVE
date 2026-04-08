import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#6B6B8A",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1C1B2E",
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "web" ? 84 : 64,
          paddingBottom: Platform.OS === "web" ? 20 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_400Regular",
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Nástěnka",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="slevy"
        options={{
          title: "Slevy",
          tabBarIcon: ({ color }) => (
            <Feather name="tag" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prukazy"
        options={{
          title: "Průkazy",
          tabBarIcon: ({ color }) => (
            <Feather name="credit-card" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="skenovani"
        options={{
          title: "Skenování",
          tabBarIcon: ({ color }) => (
            <Feather name="maximize" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
