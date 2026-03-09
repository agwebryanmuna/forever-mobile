import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProducts = async () => {
    setProduct(dummyProducts.find((p) => p._id === id) || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg text-secondary">Product not found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toast.show({
        type: "info",
        text1: "No size selected",
        text2: "Please select a size before adding to cart.",
      });
      return;
    }
    addToCart(product, selectedSize || "");
    router.push("/(tabs)/cart");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Carousel */}
        <View className="relative h-[450px] bg-gray-100 mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.round(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              );
              setActiveImageIndex(slide);
            }}
          >
            {product.images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                contentFit="cover"
                style={{ width: width, height: 450 }}
              />
            ))}
          </ScrollView>

          {/* Header actions */}
          <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/80 rounded-full justify-center items-center"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </Pressable>

            <Pressable
              onPress={() => toggleWishlist(product)}
              className="w-10 h-10 bg-white/80 rounded-full justify-center items-center"
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? COLORS.accent : COLORS.primary}
              />
            </Pressable>
          </View>
          {/* Paggination Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {product.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${index === activeImageIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"}`}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View className="px-5">
          <View className="flex-row items-center mb-2 justify-between">
            <Text className="text-2xl font-bold text-primary flex-1 mr-4">
              {product.name}
            </Text>
            <View className="flex-row items-start mb-2 justify-between">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-sm font-bold ml-1">4.6</Text>
              <Text className="text-xs text-secondary ml-1">(85)</Text>
            </View>
          </View>

          {/* price */}
          <Text className="text-2xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </Text>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text className="text-base font-bold text-primary mb-3">
                Size
              </Text>
              <View className="flex-row gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <Pressable
                    key={size}
                    onPress={() => {
                      setSelectedSize(size);
                    }}
                    className={`w-12 h-12 rounded-full items-center justify-center border  ${
                      selectedSize === size
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedSize === size ? "text-white" : "text-primary"
                      }`}
                    >
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {/* Description */}
          <Text className="text-base text-primary font-bold mt-2">
            Description
          </Text>
          <Text className="text-secondary font-bold mt-6 leading-6">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white flex-row py-4 px-5 border-t border-gray-100 ">
        <Pressable
          className="w-4/5 bg-primary py-4 rounded-full items-center shadow-lg flex-row justify-center"
          onPress={() => {
            handleAddToCart;
          }}
        >
          <Ionicons name="bag-outline" size={20} color={"white"} />
          <Text className="text-white font-bold text-base ml-2">
            Add to Cart
          </Text>
        </Pressable>

        <Pressable
          className="w-1/5 py-3 relative flex-row justify-center"
          onPress={() => router.push("/(tabs)/cart")}
        >
          <Ionicons name="cart-outline" size={28} />
          <View className="absolute top-2 right-4 bg-primary w-4 h-4 rounded-full justify-center items-center">
            <Text className="text-white text-[9px]">{itemCount}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
