import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Basket,
  type InsertBasket,
  type Wishlist,
  type InsertWishlist
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Basket
  getBasketByUser(userId: string): Promise<Basket[]>;
  addToBasket(item: InsertBasket): Promise<Basket>;
  removeFromBasket(id: string): Promise<boolean>;
  
  // Wishlist
  getWishlistByUser(userId: string): Promise<Wishlist[]>;
  addToWishlist(item: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private basket: Map<string, Basket>;
  private wishlist: Map<string, Wishlist>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.basket = new Map();
    this.wishlist = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct,
      discountPrice: insertProduct.discountPrice || null,
      rating: insertProduct.rating || 5,
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Basket
  async getBasketByUser(userId: string): Promise<Basket[]> {
    return Array.from(this.basket.values()).filter(item => item.userId === userId);
  }

  async addToBasket(insertItem: InsertBasket): Promise<Basket> {
    const id = randomUUID();
    const item: Basket = { 
      ...insertItem,
      quantity: insertItem.quantity || 1,
      id,
      createdAt: new Date()
    };
    this.basket.set(id, item);
    return item;
  }

  async removeFromBasket(id: string): Promise<boolean> {
    return this.basket.delete(id);
  }

  // Wishlist
  async getWishlistByUser(userId: string): Promise<Wishlist[]> {
    return Array.from(this.wishlist.values()).filter(item => item.userId === userId);
  }

  async addToWishlist(insertItem: InsertWishlist): Promise<Wishlist> {
    const id = randomUUID();
    const item: Wishlist = { 
      ...insertItem, 
      id,
      createdAt: new Date()
    };
    this.wishlist.set(id, item);
    return item;
  }

  async removeFromWishlist(id: string): Promise<boolean> {
    return this.wishlist.delete(id);
  }
}

export const storage = new MemStorage();
