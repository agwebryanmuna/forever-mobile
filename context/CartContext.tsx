import { dummyCart, dummyWishlist } from "@/assets/assets";
import { CartContextItem, CartContextType, Product } from "@/constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartContextItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  // get cart items
  const fetchCart = async () => {
    setIsLoading(true);
    const serverCart = dummyCart;
    const mappedItems: CartContextItem[] = serverCart.items.map(
      (item: any) => ({
        id: item.product._id,
        productId: item.product._id,
        product: item.product,
        quantity: item.quantity,
        size: item?.size || "M",
        price: item.price,
      }),
    );
    setCartItems(mappedItems);
    setCartTotal(serverCart.totalAmount);
    setIsLoading(false);
  };

  // add item to cart
  const addToCart = async (product: Product, size: string) => {};

  // remove item from cart
  const removeFromCart = async (itemId: string) => {};

  // update item quantity
  const updateQuantity = async (
    itemId: string,
    quantity: number,
    size: string,
  ) => {};

  // clear cart
  const clearCart = async () => {
    setCartItems([]);
  };

  // calculate total items in cart
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
