# Design Guidelines: Gardening Affiliate Marketing Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern e-commerce platforms like Shopify and nature-focused brands, combined with the clean aesthetics of Notion for the admin interface. The design emphasizes organic, nature-themed visuals with professional e-commerce functionality.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Primary Green: #4CAF50 (142 50% 49%) - Main brand color for CTAs, headers, active states
- Light Green Accent: #81C784 (134 42% 64%) - Secondary actions, hover states, highlights
- Dark Green Text: #1B4332 (158 48% 18%) - Headings, important text
- Medium Green Text: #2D6A4F (158 42% 30%) - Body text, paragraphs

**Background:**
- Gradient: `from-green-50 to-white` - Main page background creating soft, natural atmosphere
- Card backgrounds: White with soft shadows
- Section alternates: Pure white and green-50 tints

**Dark Mode Colors (if implemented):**
- Background: Dark green-gray gradient
- Cards: Dark surface with green accent borders
- Text: Light green and white variations

### B. Typography

**Font Families:**
- Headings: "Poppins" (Google Fonts) - Modern, friendly, professional
- Body Text: "Inter" (Google Fonts) - Highly readable, clean
- Both loaded via Google Fonts CDN

**Type Scale:**
- Hero Headings: text-4xl to text-6xl, font-bold
- Section Headings: text-2xl to text-3xl, font-semibold
- Card Titles: text-xl, font-medium
- Body Text: text-base
- Small Text/Captions: text-sm
- All with appropriate line-height for readability

### C. Layout System

**Spacing Primitives:**
- Use Tailwind units: **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Container: max-w-7xl (1200px) centered with px-6
- Section padding: py-16 (desktop), py-12 (mobile)
- Card padding: p-6 to p-8
- Component gaps: gap-4, gap-6, gap-8

**Grid Systems:**
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Category Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-5
- Blog Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Consistent gap-6 between grid items

### D. Component Library

**Cards:**
- Border radius: rounded-2xl
- Shadow: shadow-lg with hover:shadow-xl transition
- Background: bg-white
- Hover effect: scale-105 transform on hover (subtle)
- Padding: p-6 for content area

**Buttons:**
- Primary: Gradient green background with white text
  - `bg-gradient-to-r from-green-500 to-green-600`
  - Hover: glow effect with shadow-lg shadow-green-500/50
  - Padding: px-8 py-3, rounded-full
- Secondary: Outline variant with green border, green text
  - When on images: backdrop-blur-md bg-white/10 border-white/30
- Sizes: Large (hero), Medium (default), Small (inline actions)

**Navigation:**
- Fixed navbar with backdrop-blur-lg bg-white/90
- Logo left, menu center, auth/cart right
- Mobile: Hamburger menu with slide-in drawer
- Active state: Green underline or background highlight

**Product Cards:**
- Image: aspect-square with rounded-t-2xl
- Discount badge: Absolute positioned top-right, bg-red-500 rounded-full
- Price display: Original (line-through text-sm), Discounted (text-xl font-bold)
- Rating: Star icons (filled/outline) using Lucide React
- CTA: "View Details" button at bottom

**Forms:**
- Input fields: rounded-lg border-2 border-gray-200 focus:border-green-500
- Labels: text-sm font-medium text-gray-700 mb-2
- Error states: border-red-500 with red text below
- Textarea: min-h-32 for message fields
- All inputs sanitized for security

**Image Treatment:**
- All images use Next.js Image component
- Lazy loading enabled
- Product images: aspect-square object-cover
- Hero images: Full-width with overlay gradient
- Blog thumbnails: aspect-video object-cover

### E. Page-Specific Layouts

**Home Page:**
- Hero Section: Full-width with nature background image or gradient, centered content
  - Large heading (text-5xl md:text-6xl)
  - Subtitle text-xl
  - Primary CTA button with glow effect
  - Height: min-h-[80vh]
- Featured Categories: Grid of 5 category cards with icons and hover effects
- Featured Products: Carousel/grid of product cards
- Best Deals: Horizontal scrolling carousel with discount highlights
- Newsletter: Green gradient background section with email signup form

**Shop Page:**
- Sidebar/Top filters: Category chips, price range slider, rating filter
- Search bar: Full-width with icon, sticky at top
- Product grid: Responsive with lazy-loaded product cards
- Sort dropdown: Price, Rating, Newest

**Product Detail Page:**
- Two-column layout (lg:grid-cols-2)
- Left: Image gallery with thumbnails
- Right: Product info, price, rating, add to basket/wishlist buttons
- Below: Tabs for description/reviews
- Related products carousel at bottom

**Blog Pages:**
- Listing: Grid of blog cards with featured image, title, excerpt, read time
- Detail: Single column max-w-3xl, article styling with headers, images, quotes
- Recommended products section below article

**Admin Dashboard:**
- Sidebar navigation (protected route)
- Main area: Form for product upload
- Image upload: Drag-drop area with preview
- All fields with proper labels and validation
- Success/error toast notifications

### F. Animations

**Page Transitions:**
- Framer Motion fade-up animations for sections
- Stagger children animations for grids
- Smooth scroll behavior

**Micro-interactions:**
- Button hover: scale, glow shadow
- Card hover: lift with shadow increase
- Image hover: subtle zoom (scale-105)
- Loading states: Skeleton screens with green shimmer
- Toast notifications: Slide-in from top-right

**Performance:**
- Minimize excessive animations
- Use `will-change` sparingly
- Reduce motion for accessibility preferences

### G. Images

**Hero Section:**
- Large background image of lush garden/plants with dark overlay gradient
- Overlay: `bg-gradient-to-r from-green-900/70 to-green-700/50`
- Image positioned center with `object-cover`

**Product Images:**
- High-quality product photos on white/transparent background
- Consistent aspect ratio (square)
- Multiple angles for detail page gallery

**Blog Images:**
- Featured images for each article (aspect-video)
- In-article images: Full-width with rounded corners
- Alt text for all images (SEO and accessibility)

**Category Icons:**
- Lucide React icons for each category
- Size: w-12 h-12 with green color
- Contained in circular backgrounds

### H. Responsive Behavior

**Breakpoints:**
- Mobile: Base (< 768px) - Single column, stacked navigation
- Tablet: md (768px+) - Two-column grids, visible menu
- Desktop: lg (1024px+) - Full multi-column layouts
- Wide: xl (1280px+) - Maximum 4-column grids

**Mobile Optimizations:**
- Touch-friendly button sizes (min 44px height)
- Simplified navigation in hamburger menu
- Larger tap targets for product cards
- Reduced spacing for mobile (py-8 vs py-16)

### I. Accessibility & Security

**Accessibility:**
- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states with green outline ring
- Alt text for all images
- Contrast ratio WCAG AA compliant

**Security Notes:**
- Input sanitization for all forms
- Protected admin routes (Supabase auth)
- HTTPS enforced
- XSS prevention measures
- Environment variables for sensitive data

This design creates a **trustworthy, nature-inspired e-commerce experience** that balances visual appeal with functionality, perfect for a gardening affiliate platform.