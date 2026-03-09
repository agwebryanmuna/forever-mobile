import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { HeaderProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useRouter } from "expo-router";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter();

  const { itemCount } = { itemCount: 5 };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      {/* Left Side */}
      <View className="flex-row items-center flex-1">
        {showBack && (
          <Pressable onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </Pressable>
        )}

        {showMenu && (
          <Pressable className="mr-3">
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </Pressable>
        )}

        {showLogo ? (
          <View className="flex-1 items-center">
            <Image
              source={require("@/assets/logo.png")}
              style={{ width: 135, height: 26 }}
              contentFit="contain"
            />
          </View>
        ) : (
          title && (
            <Text className="text-xl font-bold text-primary text-center flex-1 mr-8">
              {title}
            </Text>
          )
        )}

        {title && !showSearch && <View className="flex-1" />}
      </View>

      {/* Right side */}
      <View className="flex-row items-center gap-4">
        {showSearch && (
          <Pressable>
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </Pressable>
        )}

        {showCart && (
          <Pressable onPress={() => router.push("/(tabs)/cart")}>
            <View className="relative">
              <Ionicons name="bag-outline" size={24} color={COLORS.primary} />
              <View className="justify-center items-center absolute -top-1 -right-1 bg-accent w-4 h-4 rounded-full">
                <Text className="text-white text-[10px] font-bold">
                  {itemCount}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}
