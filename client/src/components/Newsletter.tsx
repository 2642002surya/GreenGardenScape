import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Mail className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" data-testid="text-newsletter-title">
            Get Gardening Tips & Deals
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8" data-testid="text-newsletter-description">
            Subscribe to our newsletter for expert advice, seasonal tips, and exclusive product discounts.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-foreground border-0"
              data-testid="input-newsletter-email"
            />
            <Button 
              type="submit" 
              className="bg-white text-primary hover:bg-white/90"
              data-testid="button-newsletter-subscribe"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
