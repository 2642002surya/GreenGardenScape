"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const categories = ["Tools", "Seeds", "Plants", "Fertilizer", "Pots", "Other"];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
    location: "",
    bio: "",
    favorite_category: ""
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url, location, bio, favorite_category")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile(data);
          if (data.avatar_url) setAvatarPreview(data.avatar_url);
        }
      }
      setLoading(false);
    };
    fetchUserAndProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return profile.avatar_url;
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });
    if (error) return profile.avatar_url;
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccess(false);
    let avatar_url = profile.avatar_url;
    if (avatarFile) {
      avatar_url = await uploadAvatar();
    }
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...profile, avatar_url });
    if (!error) {
      setSuccess(true);
      setProfile((p) => ({ ...p, avatar_url }));
      setAvatarFile(null);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10">Please log in.</div>;

  return (
    <div className="max-w-lg mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-green-400 shadow"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-1 shadow hover:bg-green-700"
            >
              Edit
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Favorite Category</label>
          <select
            name="favorite_category"
            value={profile.favorite_category}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option value="">Select...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full p-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300"
        >
          Save Changes
        </button>
        {success && (
          <div className="mt-2 text-green-600 dark:text-green-400">Profile updated successfully!</div>
        )}
      </form>
    </div>
  );
}
