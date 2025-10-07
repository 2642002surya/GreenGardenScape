import { Link } from "wouter";
import { ShoppingCart, Menu, X, Leaf, User as UserIcon } from "lucide-react";
// @ts-ignore
import DarkModeToggle from "./DarkModeToggle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase, getCurrentUser, signOut } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<{ username?: string; avatar_url?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      const u = await getCurrentUser();
      setUser(u);
      if (u) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", u.id)
          .single();
        setProfile(profileData ?? null);
        const { count } = await supabase
          .from("cart_items")
          .select("id", { count: "exact", head: true })
          .eq("user_id", u.id);
        setCartCount(count || 0);
      } else {
        setProfile(null);
        setCartCount(0);
      }
    };
    fetchUserAndCart();
  const { data: { subscription } } = supabase.auth.onAuthStateChange(() => fetchUserAndCart());
  return () => subscription?.unsubscribe?.();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-white/20 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 -ml-3">
            <Leaf className="h-8 w-8 text-primary" data-testid="logo-icon" />
            <span className="text-2xl font-heading font-bold text-foreground" data-testid="text-logo">
              GreenGarden
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/shop">
              <Button variant="ghost" data-testid="link-shop">Shop</Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" data-testid="link-blog">Blog</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" data-testid="link-about">About</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" data-testid="link-contact">Contact</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" data-testid="link-profile">Profile</Button>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/account">
              <Button variant="ghost" size="icon" data-testid="button-account">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <DarkModeToggle />
            {user && profile ? (
              <div className="relative">
                <button
                  className="ml-2 rounded-full border-2 border-green-400 shadow focus:outline-none"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <img
                    src={profile?.avatar_url || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                    <div className="px-4 py-2 text-gray-800 dark:text-gray-100 font-semibold border-b border-gray-100 dark:border-gray-800">
                      {profile?.username || user?.email}
                    </div>
                    <Link href="/profile">
                      <button className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-gray-800 rounded-xl">Profile</button>
                    </Link>
                    <Link href="/wishlist">
                      <button className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-gray-800 rounded-xl">Wishlist</button>
                    </Link>
                    <Link href="/cart">
                      <button className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-gray-800 rounded-xl">Cart</button>
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-800 rounded-xl text-red-600 dark:text-red-400"
                      onClick={handleLogout}
                    >Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth">
                <Button data-testid="button-login">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2" data-testid="mobile-menu">
            <Link href="/shop">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-shop">
                Shop
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-blog">
                Blog
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-about">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-contact">
                Contact
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-profile">
                Profile
              </Button>
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/account" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-mobile-account">
                  Account
                </Button>
              </Link>
              <Link href="/auth" className="flex-1">
                <Button className="w-full" data-testid="button-mobile-login">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
