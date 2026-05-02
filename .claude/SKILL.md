---
name: samcar-rental-website-builder
summary: Use this skill when building, reviewing, or improving the SamCar Rental Lucena PH booking website. It guides Claude/Codex to create a fast, responsive, mobile-first car rental platform with landing page, car browsing, availability calendar, authentication, admin dashboard, database, and PayMongo payment phases.
---

# SamCar Rental Website Builder Skill

## When to Use This Skill

Use this skill whenever the user asks Claude/Codex to work on the **SamCar Rental Lucena PH** website, including:

- creating or improving the landing page
- creating responsive desktop and mobile layouts
- building the navigation/header
- designing the car browsing page
- building the car details page
- creating the availability calendar
- preparing authentication pages
- planning database/API work
- integrating booking logic
- integrating PayMongo later
- optimizing loading speed and user experience
- deploying to GitHub and Vercel

## Project Identity

Project name: **SamCar Rental Lucena PH**

Business type: car rental booking website for Lucena, Philippines.

Primary goal: create a modern, fast, mobile-friendly car rental booking platform where customers can browse cars, check date availability, book a car, and later pay through automated PayMongo QR/GCash payment.

## Visual Theme

Use the uploaded `theme-sample.jpg` as the design direction.

### Style

- modern
- bold
- premium
- sporty
- automotive-focused
- clean and easy to use

### Color Direction

Use both dark mode and light mode.

Primary colors:

```text
Brand Red: #F41918
Deep Red: #C71926
Black: #000000
Dark Gray: #333333
Medium Gray: #646464
White: #FFFFFF
```

Dark mode:

```text
Main background: #050505
Section background: #0A0A0A
Card background: #111111
Main text: #FFFFFF
Body text: #D1D1D1
Accent: #F41918
```

Light mode:

```text
Main background: #FFFFFF
Section background: #F7F7F7
Card background: #FFFFFF
Main text: #111111
Body text: #333333
Accent: #F41918
```

Use soft red gradients, rounded cards, clean shadows, and strong CTA buttons.

## Responsive Layout Rules

Always design for both mobile and desktop.

### Important Layout Rules

- Avoid large empty margin gaps on the left and right sides.
- Use full-width sections with controlled max-width content.
- Recommended content wrapper:

```css
max-width: 1280px;
margin-left: auto;
margin-right: auto;
padding-left: 1rem;
padding-right: 1rem;
```

- On desktop, the navigation should fill the header width naturally.
- Do not compress all nav items into a tiny centered group.
- Header layout should use:

```text
left: logo
center/right: navigation links spread properly
far right: Book Now / Auth button
```

- On mobile, use a hamburger menu with animated open/close behavior.
- Mobile layout must not overflow horizontally.
- Cards must stack cleanly on small screens.
- Hero section should be readable and not cramped on mobile.

## Recommended Tech Stack

Use this stack unless the user asks otherwise:

```text
Framework: Next.js with App Router
Language: TypeScript
Styling: Tailwind CSS
UI Components: shadcn/ui where useful
Icons: lucide-react
Animation: Framer Motion
Calendar: React DayPicker or FullCalendar
Database ORM: Prisma
Database: PostgreSQL
Authentication: NextAuth/Auth.js or custom auth later
Deployment: Vercel
Version Control: GitHub
Payment: PayMongo in final phase
```

## Project Phases

### Phase 1 — Landing Page First

Focus only on the public-facing landing page.

Include:

- responsive header/navigation
- dark mode and light mode support
- hero section
- featured car slider/card section
- floating availability search UI
- how it works section
- why choose us section
- contact section
- footer
- placeholder authentication buttons/links

Authentication should be clickable only in this phase. It should not have real backend function yet.

Expected output:

- working landing page
- responsive desktop/mobile layout
- clean navigation that fills the header properly
- no large left/right margin gap
- theme based on `theme-sample.jpg`
- dummy data for cars

### Phase 2 — Authentication, Database, and API Foundation

Add:

- authentication pages
- admin login page
- customer login/register placeholders or real auth depending on scope
- Prisma setup
- PostgreSQL schema
- API routes if needed
- cars table/model
- bookings table/model
- payments table/model
- blocked dates table/model
- admin users table/model

Expected output:

- database schema
- initial API structure
- authentication foundation
- protected admin routes

### Phase 3 — Car Browsing and Car Details

Add:

- browse cars page
- filters by date, seats, transmission, and price
- car details page
- car specs
- car gallery
- 360-degree image rotation support using multiple image frames
- availability calendar per car

Expected output:

- users can browse cars
- users can open individual car pages
- car details are mobile-friendly
- car preview works on mouse and touch

### Phase 4 — Booking and Availability Logic

Add:

- booking form
- start date and end date selection
- backend availability validation
- booking conflict prevention
- pending booking status
- booking expiration after 15–30 minutes
- grace/maintenance day blocking

Availability rule:

```text
If a car is booked from May 2 to May 5:
May 2–5 = booked
May 6 = maintenance / grace day
May 7 = available
```

Expected output:

- accurate availability checking
- backend validation, not frontend-only validation
- calendar blocks booked dates and grace days

### Phase 5 — Admin Dashboard

Add:

- admin dashboard
- car management
- booking management
- manual blocked dates
- payment status view
- booking cancellation
- booking completion status

Expected output:

- admin can manage cars
- admin can view and manage bookings
- admin can block dates manually

### Phase 6 — Automated PayMongo Payment

Add PayMongo only after the booking flow is stable.

Add:

- PayMongo checkout/payment creation
- QR Ph/GCash payment support
- webhook endpoint
- webhook signature verification
- payment status update
- idempotent webhook handling
- booking confirmation only after successful payment

Expected output:

- customer can pay online
- PayMongo webhook confirms payment
- booking becomes confirmed automatically
- no duplicate booking confirmation from repeated webhook calls

## Landing Page Requirements

### Header

Desktop header should contain:

```text
Logo / Brand Name
Home
Browse Cars
How It Works
Rates
Availability
About Us
Contact
Book Now button
Login/Auth clickable placeholder
```

Mobile header should contain:

```text
Logo / Brand Name
Menu button
Mobile drawer/dropdown menu
Book Now button
Login/Auth clickable placeholder
```

### Hero Section

Hero layout:

```text
Left side: SamCar Rental intro, short body text, Browse Cars button, Book Now button
Center: floating availability search box
Right side: available cars in rounded card slider
```

Right-side car slider:

- rounded card
- car image slightly overflows the card
- left/right slide controls
- swipe support on mobile
- show car name, price/day, seats, transmission, status

Floating availability box:

- pickup date
- return date
- seating capacity: 2, 4, 5, 7, 10+
- optional transmission filter
- Check Availability button

Clicking **Check Availability** should redirect to an availability results page later.

For Phase 1, it can redirect to a placeholder route or section.

## Booking Rules

Always enforce booking rules on the backend.

Rules:

- Do not trust frontend-only date checks.
- A car cannot be booked if the selected date overlaps existing confirmed bookings.
- Add 1 grace/maintenance day after each booking.
- Pending bookings expire after 15–30 minutes.
- Do not confirm booking until payment is successful.
- Webhook logic must be idempotent.

## Expected Coding Behavior

When generating code:

- use TypeScript
- use clean component structure
- keep components reusable
- avoid huge files
- use dummy data for Phase 1
- separate UI components from data logic
- write mobile-first Tailwind classes
- use accessible buttons and forms
- avoid horizontal overflow
- avoid excessive margins and padding
- keep images optimized with Next/Image
- lazy load heavy sections when possible
- avoid unnecessary dependencies

## Expected Output Format

When Claude/Codex works on this project, it should provide:

1. Summary of what it will build
2. Files to create or modify
3. Implementation steps
4. Full code patches or exact file contents when requested
5. Testing steps
6. Notes about limitations or next phase

## Testing Checklist

Before saying the task is complete, verify:

- page works on desktop
- page works on mobile
- header navigation does not compress in the middle
- no large left/right margin gaps
- no horizontal scroll on mobile
- hero section stacks cleanly on mobile
- buttons are clickable
- theme supports dark/light mode
- dummy car slider works
- forms do not break layout

## Skill Refinement Note

After first implementation, use Claude's skill-creator/settings refinement process to improve this skill based on actual output quality.

Refine the skill when:

- layout has too much margin
- mobile version breaks
- navigation compresses too much
- theme does not match the reference
- landing page becomes too generic
- output ignores project phases
- code is too heavy or inefficient
