import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4" data-testid="text-about-title">
              About GreenGarden
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-about-subtitle">
              Your trusted partner in creating beautiful, thriving gardens
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold m-0" data-testid="text-mission-title">Our Mission</h2>
              </div>
              <p className="text-muted-foreground m-0" data-testid="text-mission-description">
                At GreenGarden, our mission is to help gardeners of all skill levels find the best tools, 
                products, and knowledge to create and maintain beautiful gardens. We carefully curate and 
                recommend only the highest quality gardening supplies, ensuring that every purchase supports 
                your gardening success.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold m-0" data-testid="text-passion-title">Our Passion</h2>
              </div>
              <p className="text-muted-foreground m-0" data-testid="text-passion-description">
                We believe that gardening is more than just a hobby – it's a way to connect with nature, 
                grow your own food, and create peaceful outdoor spaces. Our team of gardening enthusiasts 
                is dedicated to sharing expert advice, seasonal tips, and product recommendations that make 
                your gardening experience more enjoyable and successful.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold m-0" data-testid="text-community-title">Our Community</h2>
              </div>
              <p className="text-muted-foreground m-0" data-testid="text-community-description">
                Join thousands of gardeners who trust GreenGarden for their gardening needs. Whether you're 
                growing vegetables, cultivating flowers, or maintaining indoor plants, we're here to support 
                your journey with honest reviews, helpful guides, and exclusive deals on quality products.
              </p>
            </div>

            <div className="text-center pt-8">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
