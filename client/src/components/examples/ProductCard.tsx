import ProductCard from '../ProductCard';
import toolsImage from '@assets/generated_images/Gardening_tools_product_image_51be800b.png';

export default function ProductCardExample() {
  return (
    <ProductCard
      id="1"
      image={toolsImage}
      name="Professional Gardening Tool Set"
      price={49.99}
      discountPrice={39.99}
      rating={5}
      category="Tools"
      onViewDetails={() => console.log('View details clicked')}
    />
  );
}
