import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { useLocation } from "wouter";

// todo: remove mock functionality - sample blog data
import blogImage1 from "@assets/generated_images/Blog_planting_tips_image_fa86e72c.png";
import blogImage2 from "@assets/generated_images/Blog_gardening_guide_image_7679075e.png";

// todo: remove mock functionality
const blogPosts = [
  {
    id: "1",
    image: blogImage1,
    title: "10 Essential Tips for Spring Planting",
    excerpt: "Discover the best practices for starting your spring garden with these expert tips that will ensure healthy growth and abundant harvests.",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    id: "2",
    image: blogImage2,
    title: "Complete Guide to Organic Gardening",
    excerpt: "Learn everything you need to know about growing an organic garden, from soil preparation to natural pest control methods.",
    date: "March 10, 2024",
    readTime: "8 min read",
  },
  {
    id: "3",
    image: blogImage1,
    title: "How to Choose the Right Seeds",
    excerpt: "A comprehensive guide to selecting the best seeds for your climate, soil type, and gardening goals.",
    date: "March 5, 2024",
    readTime: "6 min read",
  },
  {
    id: "4",
    image: blogImage2,
    title: "Indoor Plant Care for Beginners",
    excerpt: "Master the basics of indoor plant care with our beginner-friendly guide covering watering, lighting, and common problems.",
    date: "February 28, 2024",
    readTime: "7 min read",
  },
  {
    id: "5",
    image: blogImage1,
    title: "Composting 101: Turn Waste into Gold",
    excerpt: "Transform your kitchen and garden waste into nutrient-rich compost with this step-by-step composting guide.",
    date: "February 20, 2024",
    readTime: "6 min read",
  },
  {
    id: "6",
    image: blogImage2,
    title: "Best Tools for Small Space Gardening",
    excerpt: "Maximize your small garden space with our curated selection of compact, efficient gardening tools and techniques.",
    date: "February 15, 2024",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4" data-testid="text-blog-title">
              Gardening Tips & Guides
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-blog-description">
              Expert advice and inspiration for your gardening journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                {...post}
                onClick={() => {
                  console.log(`View blog: ${post.title}`);
                  setLocation(`/blog/${post.id}`);
                }}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
