import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants";
import { useCart } from "@/context/CartContext";

export default function TabsLayout() {
  const { cartItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 2, //1
          borderTopColor: "#F0F0F0",
          height: 60, //56
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <View className="relative">
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                color={color}
                size={26}
              />

              {cartItems.length > 0 && (
                <View className="absolute -top-2 -right-2 bg-accent size-3 rounded-full items-center justify-center">
                  <Ionicons name="ellipse" size={6} color={"white"} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
