# Next.js CSS Modules Bug Reproduction

This repository demonstrates a bug in Next.js where dynamically imported SSR components cause all CSS modules to be loaded on every page, regardless of which components are actually used.

## 🐛 Issue

**Related GitHub Issue:** [#86777 - Dynamic import of SSR components is causing the CSS of all components being loaded](https://github.com/vercel/next.js/issues/86777)

### The Problem

When using `dynamic()` imports with server-side rendered components that use CSS Modules, Next.js loads the CSS for **all** dynamically importable components on every page, even if only one component is actually used on that page.

This defeats the purpose of code splitting and significantly increases page load times in production.

### Expected Behavior

Only the CSS modules for components actually used on a page should be loaded.

### Current Behavior

- **Development Mode**: Some CSS is correctly split, but unnecessary CSS modules are still loaded
- **Production Build**: All CSS modules for all dynamically importable components are bundled together and loaded on every page

## 📁 Project Structure

```
components/
├── Button.tsx + Button.module.css
├── Card.tsx + Card.module.css
├── Link.tsx + Link.module.css
├── List.tsx + List.module.css
└── DynamicComponent.tsx (dynamic import wrapper)

app/
├── products/[id]/page.tsx (uses only Button via dynamic import)
└── blog/[slug]/page.tsx (uses only Link via static import)
```

## 🔍 How to Reproduce

### Prerequisites

```bash
npm install
```

### Option 1: Development Mode

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000/products/1](http://localhost:3000/products/1)
   - **Issue**: CSS for Button, Card, Link, and List are all loaded
   - **Expected**: Only Button CSS should be loaded

3. Open [http://localhost:3000/blog/1](http://localhost:3000/blog/1)
   - **Result**: Only Link CSS is loaded (correct behavior with static import)

### Option 2: Production Build

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

3. Open both routes and inspect the CSS files loaded
   - **Issue**: All CSS modules are bundled together in both pages

## 🔬 Investigation Details

### Components

- **Button**: Used in `app/products/[id]/page.tsx` via `DynamicComponent`
- **Card**: NOT used anywhere
- **Link**: Used in `app/blog/[slug]/page.tsx` via static import
- **List**: NOT used anywhere

### Dynamic Import Implementation

The `DynamicComponent.tsx` file uses Next.js's `dynamic()` function to load components:

```tsx
const componentMap: Record<string, () => Promise<any>> = {
  card: () => import('@/components/Card'),
  button: () => import('@/components/Button'),
  link: () => import('@/components/Link'),
  list: () => import('@/components/List'),
};

const Component = dynamic(componentMap[type], {
  loading: () => <div>Loading {type}...</div>,
});
```

### What We've Tried

- ✗ Using switch statements instead of object mapping
- ✗ Separating client and server registries
- ✗ Direct imports with conditional rendering
- ✗ Different dynamic import configurations

**All approaches result in the same CSS bundling behavior.**

## 🎯 Use Case

This pattern is common in CMS-driven applications where:

- Page structure is defined dynamically
- Components are loaded based on CMS configuration
- Each page should only load the CSS/JS for components it actually uses

## 🛠️ Tech Stack

- **Next.js**: 16.0.6 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 3.4.18
- **CSS Modules**: Native Next.js support
- **Bundler**: Turbopack

## 📊 Environment

- **OS**: Windows 11 Pro
- **Node**: 22.14.0
- **npm**: 10.9.2

## 🔗 Related Discussions

- [Reddit: Problem with app router no-one is talking about - Dynamic Loading](https://www.reddit.com/r/nextjs/comments/1omk5vp/problem_with_app_router_noone_is_talking_about/)

## 📝 License

MIT
