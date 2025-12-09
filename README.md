# TypeForge

This is the Next.js frontend for TypeForge.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Animation**: GSAP, Framer Motion
- **Icons**: Lucide React

## Project Structure

- `app/`: Next.js pages and layouts.
- `components/`: Reusable UI components.
- `utils/`: Helper functions.
- `styles/`: Global styles.

## Backend Integration

All API calls should go through `utils/api.ts`. Do not use `fetch` directly in components.
