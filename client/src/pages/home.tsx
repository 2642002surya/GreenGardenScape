import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import AnimatedPage from "@/components/AnimatedPage";
import { Shovel, Sprout, Droplet, Flower, Leaf } from "lucide-react";
import { useLocation } from "wouter";

// todo: remove mock functionality - sample product data
import toolsImage from "@assets/generated_images/Gardening_tools_product_image_51be800b.png";
import seedsImage from "@assets/generated_images/Seeds_category_product_image_18b61131.png";
import fertilizerImage from "@assets/generated_images/Fertilizer_product_image_681d4d65.png";
import potsImage from "@assets/generated_images/Pots_and_planters_image_ae6a8c65.png";
import plantsImage from "@assets/generated_images/Indoor_plants_product_image_7590ab82.png";

// todo: remove mock functionality
const categories = [
  { icon: Shovel, title: "Tools" },
  { icon: Sprout, title: "Seeds" },
  { icon: Droplet, title: "Fertilizers" },
  { icon: Flower, title: "Pots & Planters" },
  { icon: Leaf, title: "Indoor Plants" },
];

// todo: remove mock functionality
const featuredProducts = [
  {
    id: "1",
    image: toolsImage,
    name: "Professional Gardening Tool Set",
    price: 49.99,
    discountPrice: 39.99,
    rating: 5,
    category: "Tools",
  },
  {
    id: "2",
    image: seedsImage,
    name: "Organic Vegetable Seed Collection",
    price: 24.99,
    discountPrice: 19.99,
    rating: 5,
    category: "Seeds",
  },
  {
    id: "3",
    image: fertilizerImage,
    name: "Premium Organic Fertilizer",
    price: 34.99,
    rating: 4,
    category: "Fertilizers",
  },
  {
    id: "4",
    image: potsImage,
    name: "Terracotta Planter Set",
    price: 44.99,
    discountPrice: 34.99,
    rating: 5,
    category: "Pots & Planters",
  },
  {
    id: "5",
    image: plantsImage,
    name: "Indoor Plant Collection",
    price: 59.99,
    rating: 5,
    category: "Indoor Plants",
  },
  {
    id: "6",
    image: toolsImage,
    name: "Ergonomic Pruning Shears",
    price: 29.99,
    discountPrice: 24.99,
    rating: 4,
    category: "Tools",
  },
];

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEO 
        title="Home" 
        description="GreenGarden - Your ultimate destination for premium gardening tools, seeds, fertilizers, and expert advice. Transform your garden with our curated collection of eco-friendly products." 
      />
      <AnimatedPage>
        <div className="min-h-screen flex flex-col">
          <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* Featured Categories */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12" data-testid="text-categories-title">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  icon={category.icon}
                  title={category.title}
                  onClick={() => {
                    console.log(`Category clicked: ${category.title}`);
                    setLocation('/shop');
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" data-testid="text-featured-title">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg" data-testid="text-featured-description">
                Handpicked essentials for your garden
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onViewDetails={() => {
                    console.log(`View product: ${product.name}`);
                    setLocation(`/product/${product.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best Deals Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" data-testid="text-deals-title">
                Best Deals
              </h2>
              <p className="text-muted-foreground text-lg" data-testid="text-deals-description">
                Don't miss out on these amazing offers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).filter(p => p.discountPrice).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onViewDetails={() => {
                    console.log(`View product: ${product.name}`);
                    setLocation(`/product/${product.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

          <Footer />
        </div>
      </AnimatedPage>
    </>
  );
}
