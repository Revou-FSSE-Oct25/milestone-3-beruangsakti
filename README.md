# RevoShop - E-Commerce Platform

A modern, full-featured e-commerce application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features product browsing, detailed product pages, and a fully functional shopping cart.

## 📋 Overview

RevoShop is a responsive e-commerce platform that fetches products from the FakeStoreAPI and provides a seamless shopping experience. Built with cutting-edge web technologies, it demonstrates modern web development practices including server-side rendering, static site generation, and client-side data fetching.

## ✨ Features Implemented

### Core Functionality
- **Product Listing Page** - Browse all products in a responsive grid layout
- **Product Detail Pages** - View detailed product information with dynamic routing
- **Shopping Cart** - Add, remove, and manage cart items with real-time updates
- **Cart Badge** - Live cart item count in the navigation header
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Three Data Fetching Strategies**:
  - SSG (Static Site Generation) - Cart page
  - SSR (Server-Side Rendering) - Product detail pages
  - CSR (Client-Side Rendering) - Home page with useEffect + fetch
- **Dynamic Routing** - `/products/[id]` for individual products
- **State Management** - React Context API for global cart state
- **Error Handling** - Loading states and error messages throughout
- **Type Safety** - Full TypeScript implementation with proper types
- **Modern UI** - Clean, accessible interface with Tailwind CSS

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
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   └── products/
│       └── [id]/
│           ├── page.tsx        # Product detail page (SSR)
│           └── AddToCartButton.tsx
├── components/
│   └── ui/
│       ├── Header.tsx          # Navigation header
│       ├── Footer.tsx          # Footer component
│       └── ProductCard.tsx     # Product display card
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── api.ts                  # API utility functions
│   └── cart-context.tsx        # Cart state management
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

## 📸 Screenshots / Demo

### Home Page
- Product grid with 20 items from FakeStoreAPI
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
- Checkout button (demo)

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

Cart state is managed using React Context API:
- Global cart state accessible throughout the app
- Add, remove, and clear cart functions
- Cart total and count calculations
- Persistent during session

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
