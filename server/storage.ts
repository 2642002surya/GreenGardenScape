import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Products
export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
}

export async function getProduct(id: string) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data;
}

export async function createProduct(product: any) {
  const { data, error } = await supabase.from('products').insert([product]).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function updateProduct(id: string, updates: any) {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Basket
export async function getBasketByUser(userId: string) {
  const { data, error } = await supabase.from('basket').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function addToBasket(item: any) {
  const { data, error } = await supabase.from('basket').insert([item]).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function removeFromBasket(id: string) {
  const { error } = await supabase.from('basket').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Wishlist
export async function getWishlistByUser(userId: string) {
  const { data, error } = await supabase.from('wishlist').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function addToWishlist(item: any) {
  const { data, error } = await supabase.from('wishlist').insert([item]).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function removeFromWishlist(id: string) {
  const { error } = await supabase.from('wishlist').delete().eq('id', id);
  if (error) throw error;
  return true;
}
