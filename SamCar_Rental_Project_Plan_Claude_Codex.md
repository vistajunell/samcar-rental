# SamCar Rental Lucena PH — Project Plan for Claude/Codex

## 1. Project Goal

Build a modern, fast, mobile-friendly car rental booking website for **SamCar Rental Lucena PH**.

The website will start with a strong landing page, then expand into car browsing, availability checking, authentication, admin management, database/API features, and finally automated PayMongo payment integration.

Main experience:

```text
Customer visits homepage
→ checks available cars
→ selects rental dates and seat capacity
→ views available cars
→ opens car detail page
→ books the car
→ pays online later through PayMongo / GCash QR
```

---

## 2. Design Theme

Use the uploaded `theme-sample.jpg` as the visual reference.

### Brand Feel

```text
Modern
Bold
Premium
Sporty
Clean
Automotive-focused
Fast and trustworthy
```

### Main Colors

```text
Brand Red: #F41918
Deep Red: #C71926
Black: #000000
Dark Gray: #333333
Medium Gray: #646464
White: #FFFFFF
```

### Theme Modes

The website must support:

```text
Dark Mode
Light Mode
```

### Dark Mode Direction

```text
Background: black / near-black
Cards: dark gray / black
Accent: red gradients and red buttons
Text: white and soft gray
Feel: premium automotive showroom
```

### Light Mode Direction

```text
Background: white / soft gray
Cards: white
Accent: red buttons and soft red highlights
Text: black and gray
Feel: clean, bright, and professional
```

---

## 3. Responsive Layout Rules

The website must work well on:

```text
Desktop
Laptop
Tablet
Mobile
```

Important layout rules:

```text
Avoid large empty margins on the left and right side.
Use full-width sections with controlled max-width content.
Do not compress the navigation links only in the center.
The navigation should fill the header properly.
Keep spacing balanced on desktop and mobile.
Hero section must stack properly on mobile.
Car cards must not overflow badly on smaller screens.
Availability search box must be usable on mobile.
```

Recommended container behavior:

```text
Section width: 100%
Content max-width: around 1200px to 1440px
Desktop padding: 24px to 48px
Tablet padding: 20px to 32px
Mobile padding: 16px to 20px
```

Avoid this:

```text
Huge blank left/right space
Very narrow centered navigation
Cropped mobile navigation
Hero content too compressed
Cards with fixed desktop-only width
```

---

## 4. Recommended Tech Stack

Use this stack for an optimized, fast, and efficient website.

### Frontend

```text
Next.js
TypeScript
Tailwind CSS
Framer Motion
Lucide React Icons
```

### Backend / Full-stack

```text
Next.js API Routes or Route Handlers
Server Actions when useful
```

### Database

Recommended:

```text
PostgreSQL
Prisma ORM
```

Good hosted database options later:

```text
Supabase PostgreSQL
Neon PostgreSQL
Railway PostgreSQL
```

### Authentication

Recommended:

```text
NextAuth / Auth.js
```

For Phase 1, only add clickable auth UI. Do not fully connect auth yet.

### Payment

Final phase:

```text
PayMongo Checkout / QR Ph
Webhook endpoint for payment confirmation
```

### Hosting

```text
Vercel for frontend and Next.js hosting
GitHub for version control
```

### Why this stack

```text
Next.js = fast routing, optimized images, good SEO, and easy deployment to Vercel
TypeScript = safer code and easier long-term maintenance
Tailwind CSS = fast responsive design and consistent styling
PostgreSQL + Prisma = reliable database structure for bookings and cars
Vercel = simple deployment and preview links
GitHub = version control and backup
```

---

## 5. Website Navigation Header

### Desktop Navigation

The header must use the full available width properly.

```text
Left side:
- SamCar Rental logo / brand name

Center or center-right:
- Home
- Browse Cars
- How It Works
- Rates
- Availability
- About Us
- Contact

Right side:
- Login clickable link/button
- Book Now button
- Dark/Light mode toggle
```

### Mobile Navigation

```text
Left side:
- Logo / brand name

Right side:
- Theme toggle
- Menu button

Mobile menu links:
- Home
- Browse Cars
- How It Works
- Rates
- Availability
- About Us
- Contact
- Login
- Book Now
```

### Phase 1 Authentication UI

For Phase 1:

```text
Login button is clickable.
Register button is clickable if shown.
They can open a placeholder page or modal.
No real authentication function yet.
No database login yet.
```

---

## 6. Home Page Full Section Plan

## 6.1 Header / Navigation

Purpose:

```text
Give users quick access to all main pages and booking actions.
```

Content:

```text
Logo / Brand Name: SamCar Rental Lucena PH
Navigation links
Login clickable placeholder
Book Now CTA
Dark/Light mode toggle
```

Rules:

```text
Sticky header on scroll
Full-width header layout
No compressed centered navigation
Mobile hamburger menu
Smooth open/close animation
```

---

## 6.2 Hero Section

Purpose:

```text
Introduce SamCar Rental, show available cars, and allow users to quickly check availability.
```

### Hero Layout

```text
Left side: business introduction
Center: floating availability search box
Right side: car showcase slider
```

### Left Side Content

```text
Small tagline:
Affordable and Reliable Car Rental in Lucena

Main heading:
Rent Your Ideal Car with SamCar Rental Lucena PH

Body text:
Browse clean, well-maintained, and ready-to-drive rental cars for your travel needs in Lucena and nearby areas.

Buttons:
- Browse Cars
- Book Now
```

### Center Floating Availability Box

Fields:

```text
Pick-up Date
Return Date
Seating Capacity
- 2 Seater
- 4 Seater
- 5 Seater
- 7 Seater
- 10+ Seater

Optional later:
- Transmission
- Price range
```

Button:

```text
Check Availability
```

Behavior:

```text
When clicked, redirect user to the availability results page.
The results page should show only cars available for the selected date range and seat capacity.
```

Example:

```text
Pick-up Date: May 2
Return Date: May 5
Seats: 4 Seater

Click Check Availability
→ Go to /availability
→ Show cars available for those dates
```

### Right Side Car Showcase Slider

Design:

```text
Rounded card box
Car image inside the card
The head/front of the car slightly overflows outside the card
Left/right slide arrows
Swipe support on mobile
Smooth animation
```

Each car slide shows:

```text
Car image
Car name
Price per day
Seats
Transmission
Availability label
View Details button
```

---

## 6.3 Featured Cars Section

Purpose:

```text
Show popular or recommended cars immediately after the hero.
```

Content:

```text
Section title: Featured Cars
Short description
3 to 6 car cards
View All Cars button
```

Each car card:

```text
Image
Car name
Price per day
Seats
Transmission
Fuel type
Availability label
View Details button
```

---

## 6.4 How It Works Section

Purpose:

```text
Explain the booking process simply.
```

Steps:

```text
1. Browse Cars
Choose from available rental cars.

2. Select Your Dates
Pick your rental start and return date.

3. Check Availability
See which vehicles are available for your schedule.

4. Book and Confirm
Submit your booking details.

5. Drive with Confidence
Receive confirmation and enjoy your trip.
```

Later, after payment integration:

```text
Step 4 can become: Book and Pay Online
```

---

## 6.5 Why Choose Us Section

Purpose:

```text
Build customer trust.
```

Benefit cards:

```text
Affordable daily rates
Clean and maintained vehicles
Easy online booking
Flexible date selection
Safe and reliable units
Friendly customer support
Convenient payment options
Lucena-based local service
```

---

## 6.6 Availability Preview Section

Purpose:

```text
Give users another chance to search availability after scrolling.
```

Fields:

```text
Pick-up date
Return date
Seating capacity
Search Available Cars button
```

Behavior:

```text
Same behavior as hero availability box.
Redirect to availability results page.
```

---

## 6.7 Car Categories Section

Purpose:

```text
Help users browse by vehicle type.
```

Categories:

```text
Sedan
SUV
Van
Compact Car
Family Car
Premium Car
```

Each category card:

```text
Category image or icon
Category name
Short description
Browse button
```

This can be optional for MVP.

---

## 6.8 Testimonials Section

Purpose:

```text
Add social proof and customer trust.
```

Content:

```text
Section title: What Our Customers Say
3 to 5 review cards
Customer name
Review text
Star rating
```

If no real reviews yet:

```text
Hide this section first or use it later.
```

---

## 6.9 About SamCar Rental Section

Purpose:

```text
Introduce the business and service area.
```

Content:

```text
Short business background
Lucena, Philippines service area
Mission/value statement
Optional business/owner photo
```

Sample text:

```text
SamCar Rental Lucena PH provides reliable and affordable car rental services for individuals, families, and travelers in Lucena and nearby areas. Our goal is to offer clean, well-maintained vehicles with a simple and convenient booking experience.
```

---

## 6.10 Final Call-to-Action Section

Purpose:

```text
Push users toward booking.
```

Content:

```text
Heading:
Ready to Book Your Ride?

Short text:
Browse our available cars and reserve your preferred vehicle today.

Buttons:
- Browse Cars
- Book Now
```

---

## 6.11 Contact Section

Purpose:

```text
Make it easy for customers to contact the business.
```

Content:

```text
Phone number
Facebook / Messenger
Email address
Service area / location
Contact form later
Google Map embed later
```

Important for Philippine customers:

```text
Add Messenger button.
Add phone number clearly.
```

---

## 6.12 Footer

Footer content:

```text
Brand area:
SamCar Rental Lucena PH
Short description

Quick links:
Home
Browse Cars
How It Works
Rates
Availability
About Us
Contact

Policies:
Privacy Policy
Terms and Conditions
Refund / Cancellation Policy

Contact:
Phone
Email
Location
Facebook / Messenger

Copyright:
© SamCar Rental Lucena PH. All rights reserved.
```

---

## 7. Page Roadmap

### Phase 1 Pages

```text
/
/cars
/cars/[slug]
/availability
/login placeholder
/register placeholder
```

### Later Pages

```text
/booking/[id]
/payment/success
/payment/failed
/admin
/admin/cars
/admin/bookings
/admin/payments
/admin/calendar
```

---

## 8. Availability Rule

Booking rule:

```text
If a customer books May 2 to May 5:
May 2, May 3, May 4, and May 5 are booked.
May 6 is blocked as maintenance / grace period.
May 7 is available again.
```

Calendar labels:

```text
Available = clickable
Booked = disabled
Maintenance / Grace = disabled
Past dates = disabled
```

Conflict rule:

```text
A new booking is invalid if it overlaps with any confirmed booking range including the 1-day grace period after the booking end date.
```

---

## 9. Project Phases

## Phase 1 — Landing Page First

Focus:

```text
Landing page design
Responsive header
Dark/light mode
Hero section
Availability search UI
Car slider UI
Featured cars section
How It Works section
Why Choose Us section
Contact section
Footer
Authentication buttons only as placeholders
```

Important:

```text
No real database yet
No real login yet
No payment yet
Use sample/static car data
Use sample images first
```

Deliverables:

```text
Mobile-friendly landing page
Desktop-friendly landing page
Responsive navigation
No huge margin gaps
Clickable Browse Cars / Book Now / Login buttons
Theme toggle working
```

---

## Phase 2 — Car Browsing and Car Details

Focus:

```text
Browse Cars page
Car details page
Static availability calendar UI
Car card components
Car filters UI
360 car image rotation placeholder or basic implementation
```

Deliverables:

```text
/cars page
/cars/[slug] page
Reusable car card component
Reusable calendar UI component
```

---

## Phase 3 — Authentication, Database, and API

Focus:

```text
Real authentication
Database creation
Prisma schema
Admin user setup
API or server actions for cars and bookings
```

Database tables:

```text
users
admin_users
cars
car_images
car_360_images
bookings
blocked_dates
payments
```

Deliverables:

```text
Login/register connected
Admin access prepared
Cars stored in database
Bookings stored in database
Availability validation from backend
```

---

## Phase 4 — Booking System

Focus:

```text
Customer booking form
Backend availability validation
Pending booking creation
Booking expiration
Admin booking viewer
Manual booking approval/cancellation
```

Booking statuses:

```text
pending_payment
confirmed
cancelled
expired
completed
```

Deliverables:

```text
Customer can create a pending booking
Admin can view bookings
Calendar blocks confirmed bookings
Grace day is applied after every confirmed booking
```

---

## Phase 5 — Admin Dashboard

Focus:

```text
Admin dashboard
Car management
Booking management
Manual blocked dates
Payment status viewer placeholder
```

Admin features:

```text
Add/edit/delete cars
Upload car photos
Manage prices
Manage availability
View bookings
Cancel bookings
Mark completed
Manually block dates
```

---

## Phase 6 — Automated Payment System

Focus:

```text
PayMongo integration
GCash / QR Ph checkout
Webhook endpoint
Automatic payment confirmation
Automatic booking confirmation after paid
```

Payment flow:

```text
Customer submits booking
System creates pending booking
System creates PayMongo checkout/payment
Customer pays
PayMongo sends webhook
Backend verifies webhook
Booking becomes confirmed
Calendar blocks booked dates + grace day
```

Important:

```text
Never confirm booking before payment is verified.
Webhook must be idempotent.
Duplicate webhook events must not duplicate payment or booking actions.
Always verify amount, payment ID, and booking ID.
```

---

## Phase 7 — Optimization and Polish

Focus:

```text
Image optimization
SEO metadata
Open Graph images
Loading skeletons
Analytics
Error handling
Mobile polish
Accessibility
Performance checks
```

Performance goals:

```text
Fast first load
Optimized car images
Lazy load below-the-fold content
Use Next/Image for images
Avoid huge image files
Avoid unnecessary animations on mobile
Keep JavaScript bundle small
```

---

## 10. Installation and Setup Steps

## 10.1 Requirements

Install these first:

```text
Node.js LTS
Visual Studio Code
Git
GitHub account
Vercel account
```

Optional but recommended:

```text
GitHub Desktop
Vercel CLI
PostgreSQL later
```

---

## 10.2 Create Project in Visual Studio Code

Open PowerShell or VS Code terminal.

Go to your development folder:

```bash
cd D:\Development\Website
```

Create the Next.js project:

```bash
npx create-next-app@latest samcar-rental
```

Recommended choices:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: Yes
App Router: Yes
Turbopack: Yes if offered
Import alias: Yes
```

Open the project:

```bash
cd samcar-rental
code .
```

Run development server:

```bash
npm run dev
```

Open in browser:

```text
http://localhost:3000
```

---

## 10.3 Install Useful Packages

Install icons and animation library:

```bash
npm install lucide-react framer-motion
```

Install class helper packages:

```bash
npm install clsx tailwind-merge
```

Install date/calendar packages later:

```bash
npm install react-day-picker date-fns
```

Install Prisma later in database phase:

```bash
npm install prisma @prisma/client
npx prisma init
```

Install authentication later:

```bash
npm install next-auth
```

---

## 10.4 Suggested Folder Structure

```text
samcar-rental/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ globals.css
│  │  ├─ cars/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ availability/page.tsx
│  │  ├─ login/page.tsx
│  │  └─ register/page.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx
│  │  │  └─ Footer.tsx
│  │  ├─ home/
│  │  │  ├─ HeroSection.tsx
│  │  │  ├─ FeaturedCars.tsx
│  │  │  ├─ HowItWorks.tsx
│  │  │  ├─ WhyChooseUs.tsx
│  │  │  ├─ AvailabilityPreview.tsx
│  │  │  └─ ContactSection.tsx
│  │  ├─ cars/
│  │  │  ├─ CarCard.tsx
│  │  │  └─ CarSlider.tsx
│  │  └─ ui/
│  ├─ data/
│  │  └─ cars.ts
│  ├─ lib/
│  │  └─ utils.ts
│  └─ types/
│     └─ car.ts
├─ public/
│  ├─ images/
│  │  ├─ logo/
│  │  └─ cars/
├─ package.json
└─ README.md
```

---

## 11. GitHub Version Control Setup

## 11.1 Configure Git Identity

Run once:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Check config:

```bash
git config --global --list
```

---

## 11.2 Initialize Git

Inside the project folder:

```bash
git init
git add .
git commit -m "Initial SamCar Rental landing page setup"
```

Rename branch to main:

```bash
git branch -M main
```

---

## 11.3 Create GitHub Repository

Option A: GitHub website

```text
1. Go to GitHub
2. Click New Repository
3. Repository name: samcar-rental
4. Set Public or Private
5. Do not add README if project already has one
6. Create repository
```

Then connect local project:

```bash
git remote add origin https://github.com/YOUR_USERNAME/samcar-rental.git
git push -u origin main
```

Option B: GitHub CLI

```bash
gh repo create samcar-rental --private --source=. --remote=origin --push
```

---

## 11.4 Daily Git Workflow

After changes:

```bash
git status
git add .
git commit -m "Update homepage layout"
git push
```

---

## 12. Vercel Deployment for Live Sample

## Option A: Deploy through Vercel Website

```text
1. Go to Vercel
2. Login using GitHub
3. Click Add New Project
4. Import samcar-rental repository
5. Framework should auto-detect Next.js
6. Click Deploy
7. Vercel will generate a live sample URL
```

After this:

```text
Every push to GitHub main branch can trigger a new Vercel deployment.
```

## Option B: Deploy using Vercel CLI

Install Vercel CLI:

```bash
npm i -g vercel
```

Deploy:

```bash
vercel
```

Production deploy:

```bash
vercel --prod
```

---

## 13. Claude/Codex Working Instructions

Use Claude or Codex inside Visual Studio Code as the development assistant.

### Rules for Claude/Codex

```text
Work phase by phase.
Do not build payment first.
Do not add real authentication in Phase 1.
Focus on landing page first.
Keep layout mobile and desktop friendly.
Avoid big left and right margin gaps.
Navigation must use full header width and not be compressed in the middle.
Use dark mode and light mode.
Use theme-sample.jpg as visual direction.
Use sample/static car data first.
Keep components reusable.
Keep code clean and easy to extend.
```

---

## 14. Phase 1 Claude/Codex Prompt

Use this when starting Phase 1:

```text
You are a senior Next.js frontend developer. Build Phase 1 of the SamCar Rental Lucena PH website.

Project goal:
Create a modern responsive landing page for a car rental business in Lucena, Philippines.

Use this design direction:
- Inspired by theme-sample.jpg
- Premium automotive style
- Red, black, white, and gray color palette
- Dark mode and light mode support
- Clean rounded cards
- Red gradient accents
- Bold headings

Important responsive requirements:
- Must fit mobile and desktop.
- Avoid huge margin gaps on the left and right side.
- Header navigation must fill the available header width properly.
- Do not compress all navigation links only in the middle.
- Mobile navigation must use a hamburger menu and must not be cropped.
- Hero section must stack cleanly on mobile.

Build only Phase 1:
- Landing page
- Header/navigation
- Dark/light theme toggle
- Hero section
- Floating availability search box
- Right-side car showcase slider
- Featured Cars section
- How It Works section
- Why Choose Us section
- Contact section
- Footer
- Login/Register clickable placeholder only

Do not build yet:
- Real authentication
- Database
- API
- PayMongo payment
- Admin dashboard

Hero section details:
Left side:
- Small tagline
- Main heading
- Short introduction
- Browse Cars button
- Book Now button

Center:
- Floating check availability box
- Pick-up date
- Return date
- Seat capacity dropdown
- Check Availability button

Right side:
- Rounded card box car slider
- Car image should slightly overflow outside the card
- Left/right arrows
- Swipe-friendly on mobile if possible

Use sample/static car data for now.
Create clean reusable components.
Make the code production-ready and easy to continue in later phases.
```

---

## 15. Later Phase Notes

### Authentication Phase

```text
Add real login/register.
Admin login is separate from customer login if needed.
Protect admin dashboard routes.
```

### Database Phase

```text
Create Prisma schema.
Create cars, bookings, payments, blocked_dates, users/admin_users tables.
Move static car data into database.
```

### Booking Phase

```text
Add real availability checking.
Add backend conflict validation.
Add 1-day grace period after every confirmed booking.
```

### Payment Phase

```text
Add PayMongo checkout.
Add QR Ph / GCash payment.
Add webhook.
Confirm booking only after verified payment.
```

---

## 16. Important Final Notes

```text
Build the homepage first.
Make it visually strong.
Make it fast.
Make it responsive.
Do not overbuild early.
Keep PayMongo automation for the final phase.
Use GitHub from the start.
Deploy early to Vercel for testing on real mobile devices.
```

---

## 17. References

These official references are useful while building:

```text
Next.js installation:
https://nextjs.org/docs/app/getting-started/installation

Tailwind CSS with Next.js:
https://tailwindcss.com/docs/guides/nextjs

Vercel with Next.js:
https://vercel.com/docs/frameworks/full-stack/nextjs

Vercel GitHub deployment:
https://vercel.com/docs/git/vercel-for-github

GitHub existing local project to GitHub:
https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
```
