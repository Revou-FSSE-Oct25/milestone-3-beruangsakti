# RevoShop - E-Commerce Platform

A modern, full-featured e-commerce application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features product browsing, detailed product pages, shopping cart, user authentication, and a complete admin panel.

## 📋 Overview

RevoShop is a responsive e-commerce platform that fetches products from the FakeStoreAPI and provides a seamless shopping experience. Built with cutting-edge web technologies, it demonstrates modern web development practices including server-side rendering, static site generation, client-side data fetching, and role-based access control.

## ✨ Features Implemented

### Core Functionality
- **Product Listing Page** - Browse all products in a responsive grid layout
- **Product Detail Pages** - View detailed product information with dynamic routing
- **Shopping Cart** - Add, remove, and manage cart items with real-time updates
- **Cart Badge** - Live cart item count in the navigation header
- **Checkout Page** - Complete checkout flow with form validation
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Authentication & Authorization
- **User Authentication** - Login/logout functionality with demo users
- **Role-Based Access Control** - Admin and regular user roles
- **Protected Routes** - Middleware-based route protection for admin and checkout
- **User Dropdown Menu** - Profile dropdown with admin dashboard link (admin only)

### Admin Panel
- **Admin Dashboard** - Overview of products and quick actions
- **Product Management** - Create, edit, and delete products
- **Admin Navigation** - Dedicated navigation for admin section

### Additional Pages
- **About Page** - Information about the store
- **Contact Page** - Contact form and store information

### Technical Features
- **Three Data Fetching Strategies**:
  - SSG (Static Site Generation) - Cart page
  - SSR (Server-Side Rendering) - Product detail pages
  - CSR (Client-Side Rendering) - Home page with useEffect + fetch
- **Dynamic Routing** - `/products/[id]` for individual products
- **State Management** - React Context API for cart, auth, and toast state
- **API Routes** - Image proxy and admin product management endpoints
- **Error Handling** - Loading states and error messages throughout
- **Type Safety** - Full TypeScript implementation with proper types
- **Modern UI** - Clean, accessible interface with Tailwind CSS
- **Toast Notifications** - User feedback for actions

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router |
| **React** | 19.2.3 | UI library with Server Components |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS framework |
| **FakeStoreAPI** | - | Product data source |

## 📁 Project Structure

```
revoshop/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page (product listing)
│   ├── globals.css             # Global styles
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with navigation
│   │   ├── page.tsx            # Admin dashboard
│   │   └── products/
│   │       ├── page.tsx        # Product list (admin)
│   │       ├── new/
│   │       │   └── page.tsx    # New product form
│   │       └── [id]/
│   │           └── page.tsx    # Edit product form
│   ├── api/
│   │   ├── admin/products/     # Admin product API
│   │   │   ├── route.ts        # GET all, POST new
│   │   │   └── [id]/route.ts   # GET, PUT, DELETE by ID
│   │   └── image-proxy/
│   │       └── route.ts        # Image proxy for CORB bypass
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   ├── checkout/
│   │   └── page.tsx            # Checkout page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── products/
│       └── [id]/
│           ├── page.tsx        # Product detail page (SSR)
│           └── AddToCartButton.tsx
├── components/
│   └── ui/
│       ├── AdminNav.tsx        # Admin navigation
│       ├── Footer.tsx          # Footer component
│       ├── Header.tsx          # Navigation header
│       ├── LoginForm.tsx       # Login form component
│       ├── ProductCard.tsx     # Product display card
│       ├── ProductForm.tsx     # Product form (admin)
│       ├── Toast.tsx           # Toast notifications
│       └── UserDropdown.tsx    # User dropdown menu
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── api.ts                  # API utility functions
│   ├── auth-context.tsx        # Authentication state
│   ├── cart-context.tsx        # Cart state management
│   ├── products-data.ts        # Product data utilities
│   ├── products-store.ts       # Product state management
│   └── toast-context.tsx       # Toast notifications state
├── middleware.ts               # Route protection
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Revou-FSSE-Oct25/milestone-3-beruangsakti.git
cd milestone-3-beruangsakti/revoshop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 👤 Demo Users

| Username | Password | Role | Access |
|----------|----------|------|--------|
| `user` | `user123` | User | Browse, cart, checkout |
| `admin` | `admin123` | Admin | All features + admin panel |

## 📸 Screenshots / Demo

### Home Page
- Product grid with items from FakeStoreAPI
- Responsive layout (1-4 columns based on screen size)
- Loading spinner and error handling

### Product Detail Page
- Large product image
- Full product description
- Price display
- "Add to Cart" functionality
- Back navigation

### Cart Page
- List of added items with quantities
- Item removal
- Cart total calculation
- Clear cart option
- Checkout button

### Admin Panel (Admin Only)
- Dashboard with product overview
- Create new products
- Edit existing products
- Delete products

### User Dropdown
- Shows "Hi, {firstname}" when logged in
- Dashboard link (admin only)
- Logout option
- Click-outside and Escape key to close

## 🎯 Key Implementation Details

### Data Fetching Strategies

**1. Client-Side Rendering (CSR) - Home Page**
```typescript
// app/page.tsx
useEffect(() => {
  async function fetchProducts() {
    const data = await getAllProducts();
    setProducts(data);
  }
  fetchProducts();
}, []);
```

**2. Server-Side Rendering (SSR) - Product Detail**
```typescript
// app/products/[id]/page.tsx
export default async function ProductDetailPage({ params }) {
  const product = await getProductById(params.id);
  return <ProductDetail product={product} />;
}
```

**3. Static Site Generation (SSG) - Cart Page**
```typescript
// app/cart/page.tsx
// Pre-rendered as static content at build time
```

### State Management

Using React Context API for:
- **Cart State** - Add, remove, clear cart functions; cart total and count calculations
- **Auth State** - User authentication, login/logout, role checking
- **Toast State** - Success and error notifications

### Route Protection

Middleware-based protection for sensitive routes:
```typescript
// middleware.ts
- /checkout/* - Requires authentication
- /admin/* - Requires admin role
```

### Dynamic Routing

Product detail pages use Next.js dynamic routing:
```typescript
app/products/[id]/page.tsx
```

## 🔗 External APIs

**FakeStoreAPI**
- Base URL: `https://fakestoreapi.com`
- Endpoints used:
  - `GET /products` - Get all products
  - `GET /products/{id}` - Get single product

## 🌐 Deployment

This project is deployed on Vercel.

**Live Demo:** https://revoshop-three.vercel.app

## 📝 Learning Outcomes

This project demonstrates:
- ✅ Next.js App Router with file-based routing
- ✅ Dynamic routing with route parameters
- ✅ Server and Client Components
- ✅ Three data fetching strategies (SSG, SSR, CSR)
- ✅ State management with Context API
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Error handling and loading states
- ✅ Responsive design principles
- ✅ Authentication and authorization
- ✅ Role-based access control
- ✅ API routes and middleware
- ✅ Admin panel implementation

## 🤝 Contributing

This is a student project for educational purposes.

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Beruang Sakti**
- GitHub: [@Revou-FSSE-Oct25](https://github.com/Revou-FSSE-Oct25)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [FakeStoreAPI](https://fakestoreapi.com/) - Product data API
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [RevoU](https://revou.co/) - Education provider

---

**Built with ❤️ using Next.js 16, React 19, and TypeScript**
