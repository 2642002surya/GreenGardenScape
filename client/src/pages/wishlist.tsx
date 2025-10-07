

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, getCurrentUser } from "../lib/supabase";

type WishlistItem = {
  id: string;
  products?: {
    name?: string;
    image_urls?: string[];
    sale_price?: number;
    price?: number;
  };
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const u = await getCurrentUser();
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from("wishlist_items")
          .select("*, products(*)");
        setItems((data as WishlistItem[]) || []);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (id: string) => {
    await supabase.from("wishlist_items").delete().eq("id", id);
    setItems(items.filter((item) => item.id !== id));
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10">Please log in.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Wishlist</h2>
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">Your wishlist is empty.</div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img src={item.products?.image_urls?.[0] || "/default-product.png"} alt={item.products?.name || "Product"} loading="lazy" className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-gray-100">{item.products?.name}</div>
                <div className="text-green-600 dark:text-green-400 font-bold">${item.products?.sale_price || item.products?.price || 0}</div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
