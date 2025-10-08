import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const productId = params?.id;
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        // Fetch related products by category
        if (data?.category) {
          const relRes = await fetch(`/api/products`);
          const relData = await relRes.json();
          setRelatedProducts(relData.filter((p: any) => p.category === data.category && p.id !== data.id));
        }
      } catch (err) {
        setProduct(null);
      }
      setLoading(false);
    }
    if (productId) fetchProduct();
  }, [productId]);

  const discount = product?.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToBasket = () => {
    if (!product) return;
    toast({
      title: "Added to basket!",
      description: `${product.name} has been added to your basket.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product-main"
                />
              </div>
            </div>
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-3" data-testid="badge-category">{product.category}</Badge>
                <h1 className="text-4xl font-heading font-bold mb-4" data-testid="text-product-name">
                  {product.name}
                </h1>
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground" data-testid="text-rating">
                    {product.rating} out of 5
                  </span>
                </div>
                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  {product.discountPrice ? (
                    <>
                      <span className="text-4xl font-bold text-primary" data-testid="text-price-discounted">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-xl text-muted-foreground line-through" data-testid="text-price-original">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="destructive" data-testid="badge-discount">
                        Save {discount}%
                      </Badge>
                    </>
                  ) : (
                    <span className="text-4xl font-bold" data-testid="text-price">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-description">
                  {product.description}
                </p>
              </div>
              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full" data-testid="button-buy-amazon">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Buy on Amazon
                  </Button>
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToBasket}
                    data-testid="button-add-basket"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Basket
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToWishlist}
                    data-testid="button-add-wishlist"
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current text-destructive' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Related Products */}
          <section>
            <h2 className="text-3xl font-heading font-bold mb-8" data-testid="text-related-title">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  {...relatedProduct}
                  onViewDetails={() => {
                    setLocation(`/product/${relatedProduct.id}`);
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
