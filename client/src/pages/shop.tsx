import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

// todo: remove mock functionality - sample product data
import toolsImage from "@assets/generated_images/Gardening_tools_product_image_51be800b.png";
import seedsImage from "@assets/generated_images/Seeds_category_product_image_18b61131.png";
import fertilizerImage from "@assets/generated_images/Fertilizer_product_image_681d4d65.png";
import potsImage from "@assets/generated_images/Pots_and_planters_image_ae6a8c65.png";
import plantsImage from "@assets/generated_images/Indoor_plants_product_image_7590ab82.png";

// todo: remove mock functionality
const allProducts = [
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
  {
    id: "7",
    image: seedsImage,
    name: "Flower Seed Variety Pack",
    price: 19.99,
    rating: 5,
    category: "Seeds",
  },
  {
    id: "8",
    image: plantsImage,
    name: "Succulent Collection",
    price: 39.99,
    discountPrice: 29.99,
    rating: 5,
    category: "Indoor Plants",
  },
];

const categories = ["All", "Tools", "Seeds", "Fertilizers", "Pots & Planters", "Indoor Plants"];

export default function ShopPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // todo: remove mock functionality - filtering logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-heading font-bold mb-8" data-testid="text-shop-title">
            Shop All Products
          </h1>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for products..."
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="text-no-results">
                No products found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
