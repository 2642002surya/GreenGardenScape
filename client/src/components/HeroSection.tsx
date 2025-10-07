import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Garden_hero_background_image_cc861333.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-700/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6" data-testid="text-hero-title">
          <img src="/hero-bg.png" alt="Garden" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Discover the best tools, seeds, and supplies for your gardening journey
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/shop">
            <Button 
              size="lg" 
              className="bg-white text-green-900 hover:bg-white/90 shadow-lg shadow-green-500/50"
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
          </Link>
          <Link href="/blog">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
