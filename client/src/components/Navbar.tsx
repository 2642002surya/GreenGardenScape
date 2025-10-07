import { Link } from "wouter";
import { ShoppingCart, User, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-background/90 border-b">
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
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/account">
              <Button variant="ghost" size="icon" data-testid="button-account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/auth">
              <Button data-testid="button-login">Login</Button>
            </Link>
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
