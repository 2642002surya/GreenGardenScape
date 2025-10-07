import { Link } from "wouter";
import { Leaf, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-heading font-bold">GreenGarden</span>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="text-footer-description">
              Your trusted source for the best gardening products and advice.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4" data-testid="text-quick-links">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-footer-shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-footer-blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4" data-testid="text-legal">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-terms">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4" data-testid="text-follow-us">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-disclaimer">
            As an Amazon Associate, we may earn commissions from qualifying purchases.
          </p>
          <p className="mt-2" data-testid="text-copyright">
            © 2024 GreenGarden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
