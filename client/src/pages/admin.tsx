import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Edit } from "lucide-react";

// todo: remove mock functionality
const mockProducts = [
  { id: "1", name: "Professional Gardening Tool Set", category: "Tools", price: 49.99 },
  { id: "2", name: "Organic Vegetable Seed Collection", category: "Seeds", price: 24.99 },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    rating: "5",
    affiliateLink: "",
    image: null as File | null,
  });

  const categories = ["Tools", "Seeds", "Fertilizers", "Pots & Planters", "Indoor Plants"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
      console.log("Image selected:", e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // todo: Upload image to Supabase Storage
    // todo: Save product to Supabase database
    
    console.log("Product form data:", formData);
    
    toast({
      title: isEditing ? "Product updated!" : "Product added!",
      description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully.`,
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      description: "",
      rating: "5",
      affiliateLink: "",
      image: null,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (product: any) => {
    setIsEditing(true);
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      discountPrice: "",
      description: "",
      rating: "5",
      affiliateLink: "",
      image: null,
    });
    console.log("Editing product:", product.name);
  };

  const handleDelete = (id: string, name: string) => {
    // todo: Delete from Supabase
    setProducts(products.filter(p => p.id !== id));
    console.log("Deleting product:", name);
    toast({
      title: "Product deleted",
      description: `${name} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-heading font-bold mb-8" data-testid="text-admin-title">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6" data-testid="text-form-title">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-product-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        data-testid="input-price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        step="0.01"
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                        data-testid="input-discount-price"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      data-testid="input-description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Select 
                      value={formData.rating} 
                      onValueChange={(value) => setFormData({ ...formData, rating: value })}
                    >
                      <SelectTrigger data-testid="select-rating">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="affiliateLink">Amazon Affiliate Link</Label>
                    <Input
                      id="affiliateLink"
                      type="url"
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                      required
                      data-testid="input-affiliate-link"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <div className="mt-2">
                      <label 
                        htmlFor="image" 
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover-elevate transition-all"
                        data-testid="button-upload-image"
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {formData.image ? formData.image.name : "Click to upload image"}
                          </p>
                        </div>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" data-testid="button-submit-product">
                    {isEditing ? "Update Product" : "Add Product"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Product List */}
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-heading font-bold mb-4" data-testid="text-products-list-title">
                  Products
                </h2>
                <div className="space-y-3">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className="p-3 bg-muted rounded-lg"
                      data-testid={`product-item-${product.id}`}
                    >
                      <h3 className="font-semibold text-sm mb-1" data-testid={`text-product-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {product.category} - ${product.price}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(product)}
                          data-testid={`button-edit-${product.id}`}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(product.id, product.name)}
                          data-testid={`button-delete-${product.id}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
