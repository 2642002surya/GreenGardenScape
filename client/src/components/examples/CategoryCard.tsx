import CategoryCard from '../CategoryCard';
import { Shovel } from 'lucide-react';

export default function CategoryCardExample() {
  return (
    <CategoryCard 
      icon={Shovel} 
      title="Gardening Tools" 
      onClick={() => console.log('Category clicked')}
    />
  );
}
