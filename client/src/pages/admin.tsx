import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "suryareddy380@gmail.com";
const ADMIN_PASSWORD = "spligiT09@";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({ name: "", price: "", image_url: "" });
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid admin credentials.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!product.name || !product.price) {
      setError("Name and price are required.");
      return;
    }
    setLoading(true);
    let result;
    if (editId) {
      result = await supabase.from("products").update({
        name: product.name,
        price: Number(product.price),
        image_urls: product.image_url ? [product.image_url] : [],
      }).eq("id", editId);
    } else {
      result = await supabase.from("products").insert([
        {
          name: product.name,
          price: Number(product.price),
          image_urls: product.image_url ? [product.image_url] : [],
        },
      ]);
    }
    setLoading(false);
    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(editId ? "Product updated successfully!" : "Product uploaded successfully!");
      setProduct({ name: "", price: "", image_url: "" });
      setEditId(null);
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleEdit = (prod: any) => {
    setProduct({
      name: prod.name,
      price: prod.price,
      image_url: prod.image_urls?.[0] || ""
    });
    setEditId(prod.id);
    setSuccess("");
    setError("");
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Product deleted.");
      fetchProducts();
    }
  };

  // Fetch products on login
  React.useEffect(() => {
    if (loggedIn) fetchProducts();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Login</button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Product" : "Upload Product"}</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" placeholder="Product Name" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Image URL (optional)" value={product.image_url} onChange={e => setProduct({ ...product, image_url: e.target.value })} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded" disabled={loading}>{editId ? "Update" : "Upload"}</button>
        {editId && <button type="button" className="w-full py-2 mt-2 bg-gray-400 text-white rounded" onClick={() => { setEditId(null); setProduct({ name: "", price: "", image_url: "" }); }}>Cancel Edit</button>}
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
      <hr className="my-8" />
      <h3 className="text-xl font-bold mb-4">Product List</h3>
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-4">
          {products.map(prod => (
            <li key={prod.id} className="flex items-center gap-4 border-b pb-4">
              <img src={prod.image_urls?.[0] || "/default-product.png"} alt={prod.name} loading="lazy" className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-gray-100">{prod.name}</div>
                <div className="text-gray-500 dark:text-gray-400">${prod.price}</div>
              </div>
              <button className="px-3 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleEdit(prod)}>Edit</button>
              <button className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600" onClick={() => handleDelete(prod.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
