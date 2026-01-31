# Project Name: Hatch8 Studios - Digital Creative Agency
# Version: 1.0 (Swiss Minimalist Edition)

## 1. Project Overview
A high-performance portfolio and lead-generation site for a creative studio specializing in Graphic Design, Video Editing, and 3D Modeling.
**Key Goal:** Sell "Monthly Design Packages" and showcase high-fidelity media (3D/Video).

## 2. Design System: "The White Gallery"
* **Vibe:** Ultra-minimal, "Swiss Design" aesthetic.
* **Colors:**
    * Background: Pure White (`#FFFFFF`) or extremely light grey (`#F5F5F7`).
    * Text: Stark Black (`#111111`) for headings, Dark Grey (`#444444`) for body.
    * Accent: "Electric Lime" or "Hatch8 Orange" (Use a single punchy color for buttons).
* **Typography:** Large, bold sans-serif headings (Inter or Geist Sans). Tracking tight.
* **Visuals:** No glassmorphism. Use sharp corners or slight rounding (`rounded-md`). High contrast borders.
* **Layout:** "Masonry Grid" for the portfolio to handle vertical (mobile) and horizontal (desktop) content gracefully.

## 3. Tech Stack (Strict)
* **Framework:** Next.js 15 (App Router).
* **Styling:** Tailwind CSS + Framer Motion.
* **Database:** MongoDB Atlas (Mongoose).
* **Notifications:** Telegram Webhook (Server-side).
* **Media:** `next/video` or standard HTML5 `<video>` tags for the 3D/Video showreels.

## 4. Core Features & Pages

### A. Public Frontend
1.  **Navbar (Sticky):**
    * Logo (Left): "Hatch8".
    * Links (Right): Work, Services, Pricing, Contact.
    * Mobile: Simple text-based overlay menu.
2.  **Hero Section:**
    * Big Typography: "We craft digital reality."
    * Background: A silent, autoplaying loop of his best 3D/Video work (muted, grayscale until hovered).
3.  **Services & Pricing (Crucial):**
    * **Feature:** 3-Column Pricing Table for "Monthly Packages" (e.g., Starter, Pro, Enterprise).
    * Each card must have a "Subscribe" or "Inquire" button that pre-fills the Contact Form.
4.  **The "Work" Grid (Portfolio):**
    * A Masonry layout (Pinterest style).
    * Support for **Video Thumbnails** (GIF-like autoplay on hover) to show off editing skills.
5.  **Project Inquiry Form (Lead Gen):**
    * Clean, step-by-step fields.
    * **Required Fields:** Name, Brand Name, Email, "Which Package?" (Dropdown), Project Details.

### B. Admin Dashboard (Private)
* **Login:** Simple secure route.
* **Leads Table:** View inquiries.
* **Filter:** Sort by "Package Type" (High value vs Low value).

## 5. Technical Implementation Details
* **Responsive:** "Dual Mode" strictly enforced.
    * *Mobile:* Single column, big touch targets, bottom sheet menus.
    * *Desktop:* Multi-column grids, hover effects, mouse-follow cursors.
* **SEO:** Metadata preset for "Hatch8 Studios - 3D & Video Agency".
