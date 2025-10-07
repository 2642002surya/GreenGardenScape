import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: string;
  onViewDetails?: () => void;
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  discountPrice,
  rating,
  category,
  onViewDetails
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-product-${id}`}>
      <div className="relative aspect-square">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground" data-testid={`badge-discount-${id}`}>
            -{discount}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 bg-white/90 hover:bg-white ${isWishlisted ? 'text-destructive' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          data-testid={`button-wishlist-${id}`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <Badge variant="outline" className="mb-2" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
          <h3 className="font-heading font-semibold text-lg line-clamp-2" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1" data-testid={`text-rating-${id}`}>
            ({rating})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          {discountPrice ? (
            <>
              <span className="text-2xl font-bold text-primary" data-testid={`text-price-discounted-${id}`}>
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-price-original-${id}`}>
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        <Button 
          className="w-full" 
          onClick={onViewDetails}
          data-testid={`button-view-details-${id}`}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );
}
