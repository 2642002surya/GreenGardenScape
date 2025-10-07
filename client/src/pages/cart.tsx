import { useEffect, useState } from "react";
import { supabase, getCurrentUser } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Product = {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  image_urls?: string[];
};

type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  products?: Product;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const u = await getCurrentUser();
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from("cart_items")
          .select("*, products(*)")
          .eq("user_id", u.id);
        setItems((data as CartItem[]) || []);
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  const handleRemove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateQty = async (id: string, qty: number) => {
    await supabase.from("cart_items").update({ quantity: qty }).eq("id", id);
    setItems(items.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  };

  const total = items.reduce((sum, item) => sum + ((item.products?.sale_price ?? item.products?.price ?? 0) * item.quantity), 0);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10">Please log in.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">Your cart is empty.</div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img src={item.products?.image_urls?.[0] || "/default-product.png"} alt={item.products?.name || "Product"} loading="lazy" className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-gray-100">{item.products?.name}</div>
                <div className="text-gray-500 dark:text-gray-400">Qty: <input type="number" min={1} value={item.quantity} onChange={e => handleUpdateQty(item.id, Number(e.target.value))} className="w-16 p-1 rounded border" /></div>
                <div className="text-green-600 dark:text-green-400 font-bold">${(item.products?.sale_price || item.products?.price || 0) * item.quantity}</div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600">Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-xl font-bold text-right text-green-700 dark:text-green-400">Total: ${total}</div>
    </div>
  );
}
