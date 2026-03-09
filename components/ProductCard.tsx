import { View, Text, Pressable } from "react-native";
import React from "react";
import { ProductCardProps } from "@/constants/types";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useWishlist } from "@/context/WishlistContext";

/**
 * Renders a tappable product card showing image, name, price, rating, and optional featured badge.
 *
 * The card is wrapped in a Link (making the card navigable) and includes a heart button that toggles
 * the wishlist state for the product without triggering the card navigation.
 *
 * @param product - Product object to render; expected to include `_id`, `images` (first image used), `isFeatured`, `name`, and `price`.
 * @returns A JSX element representing the product card.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const {toggleWishlist, isInWishlist} = useWishlist()
  const isLiked = isInWishlist(product._id);

  return (
    <Link className=" w-[48%]" href={`/`} asChild>
      {/* <Link href={`/product/${product._id}`} asChild> */}
      <Pressable className="mb-4 bg-white rounded-lg overflow-hidden">
        <View className="relative bg-gray-100">
          <View className="h-[240px]">
            <Image
              source={{ uri: product.images[0] }}
              contentFit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          {/* Favorite icon */}
          <Pressable
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm"
            onPress={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </Pressable>

          {/* is Featured */}
          {product.isFeatured && (
            <View className="absolute top-2 left-2 bg-black px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold uppercase">
                Featured
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-secondary text-xs ml-1">4.6</Text>
          </View>
          <Text className="text-primary font-medium text-sm mb-1" numberOfLines={1}>{product.name}</Text>
          <View>
            <Text className="text-primary font-bold text-base">${product.price.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
