import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Calendar, User } from "lucide-react";

// todo: remove mock functionality - will load from JSON
import blogImage1 from "@assets/generated_images/Blog_planting_tips_image_fa86e72c.png";
import toolsImage from "@assets/generated_images/Gardening_tools_product_image_51be800b.png";
import seedsImage from "@assets/generated_images/Seeds_category_product_image_18b61131.png";

// todo: remove mock functionality
const blogPosts: any = {
  "1": {
    id: "1",
    slug: "spring-planting-tips",
    title: "10 Essential Tips for Spring Planting",
    image: blogImage1,
    date: "March 15, 2024",
    author: "Sarah Green",
    readTime: "5 min read",
    content: `
      <p>Spring is the perfect time to start your garden and watch it flourish. Here are 10 essential tips to ensure your spring planting is successful.</p>
      
      <h2>1. Prepare Your Soil</h2>
      <p>Good soil is the foundation of a healthy garden. Test your soil pH and add organic matter like compost to improve its structure and nutrient content.</p>
      
      <h2>2. Choose the Right Plants</h2>
      <p>Select plants that are suitable for your climate zone and the specific conditions of your garden, including sunlight exposure and soil type.</p>
      
      <h2>3. Time Your Planting</h2>
      <p>Wait until after the last frost date in your area to plant tender seedlings. Hardy vegetables can go in earlier.</p>
      
      <h2>4. Water Wisely</h2>
      <p>Water deeply but less frequently to encourage deep root growth. Morning watering is best to reduce disease risk.</p>
      
      <h2>5. Mulch for Success</h2>
      <p>Apply a layer of mulch around your plants to retain moisture, suppress weeds, and regulate soil temperature.</p>
      
      <blockquote>"The glory of gardening: hands in the dirt, head in the sun, heart with nature. To nurture a garden is to feed not just the body, but the soul." - Alfred Austin</blockquote>
      
      <h2>6. Support Your Plants</h2>
      <p>Install stakes, trellises, or cages at planting time for vegetables that will need support as they grow.</p>
      
      <h2>7. Practice Companion Planting</h2>
      <p>Plant complementary crops together to maximize space, deter pests naturally, and improve yields.</p>
      
      <h2>8. Monitor for Pests</h2>
      <p>Check your plants regularly for signs of pest damage and address issues early with organic solutions when possible.</p>
      
      <h2>9. Feed Your Plants</h2>
      <p>Use organic fertilizers to provide essential nutrients throughout the growing season.</p>
      
      <h2>10. Keep a Garden Journal</h2>
      <p>Record what you plant, when you plant it, and how it performs. This information will be invaluable for future seasons.</p>
      
      <p>Following these tips will set you up for a bountiful and beautiful spring garden. Happy planting!</p>
    `,
  },
};

// todo: remove mock functionality
const recommendedProducts = [
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
];

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:id");
  const [, setLocation] = useLocation();
  const blogId = params?.id || "1";
  
  // todo: remove mock functionality - get from JSON file
  const post = blogPosts[blogId] || blogPosts["1"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6" data-testid="text-blog-title">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="text-author">
                <User className="h-5 w-5" />
                {post.author}
              </div>
              <div className="flex items-center gap-2" data-testid="text-date">
                <Calendar className="h-5 w-5" />
                {post.date}
              </div>
              <span data-testid="text-read-time">{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-12">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              data-testid="img-featured"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="content-article"
          />

          {/* Recommended Products */}
          <section className="border-t pt-12">
            <h2 className="text-3xl font-heading font-bold mb-8" data-testid="text-recommended-title">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedProducts.map((product) => (
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
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
