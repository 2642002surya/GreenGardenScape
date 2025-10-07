import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, LogOut, User } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality - sample data
import toolsImage from "@assets/generated_images/Gardening_tools_product_image_51be800b.png";
import seedsImage from "@assets/generated_images/Seeds_category_product_image_18b61131.png";

export default function AccountPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // todo: remove mock functionality
  const wishlistItems = [
    { id: "1", name: "Professional Gardening Tool Set", price: 39.99, image: toolsImage },
    { id: "2", name: "Organic Vegetable Seed Collection", price: 19.99, image: seedsImage },
  ];

  // todo: remove mock functionality
  const basketItems = [
    { id: "1", name: "Professional Gardening Tool Set", price: 39.99, quantity: 1, image: toolsImage },
  ];

  const handleLogout = () => {
    console.log("Logging out");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-heading font-bold" data-testid="text-account-title">
              My Account
            </h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile" data-testid="tab-profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="wishlist" data-testid="tab-wishlist">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="basket" data-testid="tab-basket">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Basket
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-4" data-testid="text-profile-title">
                      Profile Information
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium" data-testid="text-user-name">John Gardener</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium" data-testid="text-user-email">john@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-6" data-testid="text-wishlist-title">
                  My Wishlist
                </h2>
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-card border rounded-lg" data-testid={`wishlist-item-${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold" data-testid={`text-wishlist-name-${item.id}`}>{item.name}</h3>
                        <p className="text-primary font-bold" data-testid={`text-wishlist-price-${item.id}`}>${item.price}</p>
                      </div>
                      <Button variant="outline" data-testid={`button-remove-wishlist-${item.id}`}>Remove</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="basket">
              <Card className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-6" data-testid="text-basket-title">
                  My Basket
                </h2>
                <div className="space-y-4">
                  {basketItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-card border rounded-lg" data-testid={`basket-item-${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold" data-testid={`text-basket-name-${item.id}`}>{item.name}</h3>
                        <p className="text-muted-foreground text-sm" data-testid={`text-basket-quantity-${item.id}`}>Quantity: {item.quantity}</p>
                        <p className="text-primary font-bold" data-testid={`text-basket-price-${item.id}`}>${item.price}</p>
                      </div>
                      <Button variant="outline" data-testid={`button-remove-basket-${item.id}`}>Remove</Button>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full" data-testid="button-checkout">
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
