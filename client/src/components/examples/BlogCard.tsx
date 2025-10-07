import BlogCard from '../BlogCard';
import blogImage from '@assets/generated_images/Blog_planting_tips_image_fa86e72c.png';

export default function BlogCardExample() {
  return (
    <BlogCard
      id="1"
      image={blogImage}
      title="10 Essential Tips for Spring Planting"
      excerpt="Discover the best practices for starting your spring garden with these expert tips that will ensure healthy growth and abundant harvests."
      date="March 15, 2024"
      readTime="5 min read"
      onClick={() => console.log('Blog clicked')}
    />
  );
}
