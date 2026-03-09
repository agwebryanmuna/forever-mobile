import { Stack } from "expo-router";
import "@/global.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Root app layout that provides gesture handling and supplies cart and wishlist contexts to the navigation stack.
 *
 * @returns A React element rendering a GestureHandlerRootView that wraps CartProvider and WishlistProvider around the app's navigation Stack with headers hidden.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <CartProvider>
      <WishlistProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </WishlistProvider>
    </CartProvider>
    </GestureHandlerRootView>
  );
}
