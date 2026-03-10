import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { dummyUser } from "@/assets/assets";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, PROFILE_MENU } from "@/constants";
import { Image } from "expo-image";

export default function Profile() {
  const { user } = { user: dummyUser };
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Profile" />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          !user
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : {
                paddingTop: 16,
              }
        }
      >
        {!user ? (
          // guest user Screen
          <View className="items-center w-full">
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6">
              <Ionicons name="person" size={40} color={COLORS.secondary} />
            </View>
            <Text className="text-primary font-bold text-xl mb-2">
              Guest User
            </Text>
            <Text className="text-secondary text-base mb-8 text-center w-3/4 px-4">
              Login to view your profile, orders and addresses
            </Text>
            <Pressable
              onPress={() => router.push("/")}
              className="bg-primary w-3/5 py-3 rounded-full items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">
                Login / Sign Up
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="items-center mb-8">
              <View className="size-24 overflow-hidden mb-3 border-2 border-white shadow-sm rounded-full">
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text className="text-xl font-bold text-primary">
                {user.firstName + " " + user.lastName}
              </Text>
              <Text className="text-secondary text-sm">
                {user.emailAddresses[0].emailAddress}
              </Text>

              {/* Admin Panel button if user is admin */}
              {user.publicMetadata?.role === "admin" && (
                <Pressable
                  className="mt-4 bg-primary px-6 py-3 rounded-full"
                  onPress={() => router.push("/")}
                >
                  <Text className="text-white font-bold">Admin Panel</Text>
                </Pressable>
              )}
            </View>
            {/* Menu */}
            <View className="bg-white rounded-xl border border-gray-100/75 p-2 mb-4">
              {PROFILE_MENU.map((item, index) => (
                <Pressable
                  key={item.id}
                  className={`flex-row items-center p-4 ${index !== PROFILE_MENU.length - 1 ? "border-b border-gray-100" : ""}`}
                  onPress={() => router.push(item.route as any)}
                >
                  <View className="w-10 h-10 flex-row items-center justify-center mr-4 rounded-lg bg-surface">
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text className="flex-1 text-primary font-medium">
                    {item.title}
                  </Text>
                  <Ionicons
                    name={"chevron-forward"}
                    size={20}
                    color={COLORS.secondary}
                  />
                </Pressable>
              ))}
            </View>

            {/* Logout button */}
            <Pressable
              className="flex-row items-center justify-center p-4"
              onPress={() => router.push("/")}
            >
              <Text className="text-red-500 font-bold ml-2 ">Logout</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
