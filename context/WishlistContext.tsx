import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

/**
 * Provides wishlist state and actions to descendant components via WishlistContext.
 *
 * Exposes: `wishlist` (array of Product), `loading` (boolean), `toggleWishlist(product)` (adds or removes a product), and `isInWishlist(productId)` (checks presence by id).
 *
 * @param children - React nodes that will receive the wishlist context
 * @returns The provider element that supplies wishlist state and actions to its children
 */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // get wishlist from database
  const fetchWishlist = async () => {
    setLoading(true);
    setWishlist(dummyWishlist);
    setLoading(false);
  };

  // add/remove item from wishlist
  const toggleWishlist = async (product: Product) => {
    const exists = wishlist.find((p) => p._id === product._id);
    setWishlist((prev) => {
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      }
      return [...prev, product];
    });
  };

  // check if item in wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((p) => p._id === productId);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/**
 * Accesses the wishlist context for components rendered inside a `WishlistProvider`.
 *
 * @returns The wishlist context containing `wishlist`, `loading`, `toggleWishlist`, and `isInWishlist`.
 * @throws Error if called outside a `WishlistProvider`.
 */
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
