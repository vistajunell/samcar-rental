# CLAUDE.md — SamCar Rental Lucena PH

## Project Overview

Build a modern, fast, responsive car rental booking website for **SamCar Rental Lucena PH**.

The website starts with a landing page first, then expands into authentication, database/API, car browsing, booking availability, admin dashboard, and final PayMongo automated payment integration.

The business is a car rental service based in Lucena, Philippines.

## Main Goals

- Create a premium automotive-style website.
- Support desktop and mobile layouts.
- Avoid large margin gaps on left and right sides.
- Make navigation fill the header properly instead of being compressed in the middle.
- Start with the landing page as Phase 1.
- Add authentication placeholders in Phase 1, but no real auth function yet.
- Add database, API, authentication, booking, admin, and PayMongo in later phases.
- Optimize for fast loading and smooth user experience.

## Visual Theme

Use the provided `theme-sample.jpg` as the design reference.

Theme style:

- bold
- premium
- sporty
- automotive
- clean
- modern

Color palette:

```text
Brand Red: #F41918
Deep Red: #C71926
Black: #000000
Dark Gray: #333333
Medium Gray: #646464
White: #FFFFFF
```

The site must support:

- dark mode
- light mode

Dark mode direction:

```text
Black/dark background
Red gradients
White headings
Gray body text
Dark rounded cards
Red CTA buttons
```

Light mode direction:

```text
White/off-white background
Soft red accents
Black headings
Gray body text
White rounded cards
Red CTA buttons
```

## Recommended Stack

Use this stack unless instructed otherwise:

```text
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui where useful
lucide-react icons
Framer Motion for subtle animations
React DayPicker or FullCalendar later
Prisma later
PostgreSQL later
NextAuth/Auth.js or custom auth later
PayMongo later
GitHub for version control
Vercel for deployment
```

## Responsive Design Rules

Always build mobile and desktop versions.

Important rules:

- No huge left/right margin gaps.
- Use full-width sections with a controlled content container.
- Avoid narrow centered layouts for the whole page.
- Header navigation must use the available header width.
- On desktop, logo should be left, navigation should spread naturally, and CTA/auth actions should be on the right.
- On mobile, use hamburger menu or drawer.
- Avoid horizontal scrolling on mobile.
- Cards should stack correctly on mobile.
- Hero should not look cramped or oversized.

Recommended container style:

```tsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  ...content
</div>
```

## Phase Plan

### Phase 1 — Landing Page Focus

Build the public landing page only.

Include:

- header/navigation
- dark/light mode design
- hero section
- available car showcase slider
- floating availability search box
- featured cars section
- how it works section
- why choose us section
- contact section
- footer
- clickable authentication/login placeholder

Authentication should be visible and clickable only. It should not be fully functional yet.

Use dummy car data.

Do not build the real database yet.

Do not integrate PayMongo yet.

### Phase 2 — Authentication, Database, and API Foundation

Add:

- login/register pages
- admin login
- protected admin route foundation
- Prisma
- PostgreSQL
- API routes if needed
- schema for cars, bookings, payments, blocked dates, and users

### Phase 3 — Car Browsing and Car Details

Add:

- browse cars page
- car filtering
- car details page
- car gallery
- car specs
- 360 image rotation preview
- calendar availability display

### Phase 4 — Booking and Availability Logic

Add:

- start date/end date booking form
- backend availability check
- booking conflict rule
- grace/maintenance day rule
- pending booking expiration
- booking status system

Grace day example:

```text
Booked: May 2 to May 5
Maintenance/grace day: May 6
Next available: May 7
```

### Phase 5 — Admin Dashboard

Add:

- car management
- booking management
- manual blocked dates
- payment tracking page
- booking cancel/complete actions

### Phase 6 — PayMongo Automated Payment

Add last:

- PayMongo checkout/payment intent
- QR Ph/GCash payment
- webhook endpoint
- webhook verification
- idempotent payment confirmation
- automatic booking confirmation after successful payment

## Header Requirements

Desktop navigation should include:

```text
Logo / SamCar Rental Lucena PH
Home
Browse Cars
How It Works
Rates
Availability
About Us
Contact
Book Now
Login/Auth placeholder
```

Header behavior:

- sticky or fixed is okay
- must fit desktop width properly
- must not compress all nav items in the center
- CTA should be clear
- mobile should use hamburger menu

## Home Page Hero Requirements

Hero should have 3 main areas:

```text
Left: intro text and buttons
Center: floating availability search
Right: car showcase slider
```

### Left Side

Content:

```text
Tagline: Affordable and Reliable Car Rental in Lucena
Heading: Rent Your Ideal Car with SamCar Rental Lucena PH
Body: Browse clean, well-maintained, and ready-to-drive rental cars for your travel needs in Lucena and nearby areas.
Buttons: Browse Cars, Book Now
```

### Center Floating Availability Box

Fields:

```text
Pick-up Date
Return Date
Seating Capacity: 2, 4, 5, 7, 10+
Optional Transmission
Check Availability button
```

Phase 1 behavior:

- clickable
- can redirect to placeholder `/availability`
- no real backend yet

### Right Car Slider

Requirements:

- rounded card box
- car image/head can slightly overflow outside card
- left and right controls
- swipe-friendly on mobile
- show car name, price/day, seats, transmission, and availability status

## Sections After Hero

Recommended Phase 1 homepage order:

1. Header
2. Hero section
3. Featured Cars
4. How It Works
5. Why Choose Us
6. Contact
7. Footer

Optional later sections:

- testimonials
- car categories
- availability preview
- about section

## Booking Logic Rules for Later Phases

When implemented:

- always validate availability on backend
- frontend calendar is only for user experience
- confirmed bookings block their full date range
- add 1 maintenance/grace day after each confirmed booking
- pending bookings expire after 15–30 minutes
- payment confirmation must be idempotent
- never confirm booking twice if PayMongo webhook repeats

## Performance Rules

- Use Next/Image for images.
- Keep car images optimized and compressed.
- Lazy load non-critical sections.
- Avoid heavy 3D model in Phase 1.
- Use 360 image rotation later instead of heavy 3D first.
- Avoid unnecessary libraries.
- Keep animations subtle.
- Use static dummy data first for landing page.
- Split components cleanly.

## Expected Output From Claude/Codex

For every implementation task, provide:

1. What will be built
2. Files to create/modify
3. Exact code or patch
4. Testing steps
5. Notes for next phase

## Do Not Do Yet in Phase 1

Do not add:

- real authentication logic
- database connection
- PayMongo integration
- booking payment logic
- admin dashboard functionality
- complex 3D models

Only create placeholders/clickable links for future features.

## Phase 1 Acceptance Checklist

Before finishing Phase 1, confirm:

- homepage loads correctly
- desktop layout looks premium
- mobile layout works cleanly
- no horizontal scroll
- no huge side margin gaps
- navigation fills header width naturally
- car slider layout works
- availability box is visible and responsive
- dark/light visual direction is applied
- auth/login button is present but placeholder only
