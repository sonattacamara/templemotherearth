# Temple Mother Earth — Site Flow & Architecture

## Overview

Temple Mother Earth's website is the **single source of truth** replacing the legacy Linktree. All community engagement, membership, ceremony registration, and education flow through this site.

---

## 🗺️ Site Map

```
/                       → Homepage (Hero's Journey narrative)
/about                  → About the Temple & Founders
/membership             → Membership Tiers (Seeker, Devotee, Guardian, Steward)
/ceremony-intake        → Sacred Intake Form (6-step screening → GHL webhook)
/portal                 → Member Portal (auth-gated, embeds integration platform)
/member/auth            → Login / Sign Up
/member/education       → Education Library (Kambo module, auth-gated)
/retreats-inquiry       → International Immersion inquiry form
/traveling-ceremonies   → Traveling Ceremonies info & inquiry
/private-ceremonies     → 1-on-1 Private Sessions info & inquiry
/volunteer              → Volunteer application
/join-facilitator       → Facilitator application
/sponsor                → Sponsorship information
/preparation            → Pre-ceremony preparation guidelines
/conduct                → Code of Conduct
```

---

## 🔄 Core User Flows

### Flow 1: New Visitor → Ceremony Participant
```
Homepage → "Begin Your Journey" CTA
  → Sacred Intake Form (/ceremony-intake)
    → 6-step screening (personal info, emergency contact, intentions, medical, medications, legal waivers)
    → Form data sent to GHL webhook for CRM processing
    → Confirmation page → "Enter the Ceremony" → Eventbrite booking
```

### Flow 2: Visitor → Member
```
Homepage → "Explore Membership Tiers" CTA
  → Membership Page (/membership) — review all 4 tiers
    → "Choose [Tier]" CTA → /portal (with ?tier= param)
      → Sign Up / Login (/member/auth)
      → Member Portal with Integration & Wellness platform access
```

### Flow 3: Member → Education
```
Member Portal → Education link
  → /member/education (auth-gated)
    → Kambo Learning Module (videos, text content)
    → Future: Hapé, Sacred Vine, Cacao modules
```

### Flow 4: Inquiry Paths
```
Homepage Offering Cards →
  - "Explore Retreats" → /retreats-inquiry
  - "Bring Us to You" → /traveling-ceremonies  
  - "Book a Private Session" → /private-ceremonies
```

### Flow 5: Community Engagement
```
Homepage Footer →
  - Volunteer → /volunteer
  - Facilitator Application → /join-facilitator
  - Sponsor → /sponsor
  - Donation → PayPal tokenized link (popup)
  - Amazon Wishlist → external link
  - Google Review → external link
```

---

## 💰 Membership Tiers

| Tier | Price | Key Benefit |
|------|-------|-------------|
| **Seeker** | Free | Community access, newsletter, Integration & Wellness platform |
| **Devotee** ⭐ | $49/mo | Priority ceremony registration, integration circles, members-only content |
| **Guardian** | $249/mo | 1 ceremony/quarter included, 1-on-1 consultations, private circles |
| **Steward** | $449/mo | 1 local immersion weekend/quarter, advisory role, exclusive gatherings |

All tiers include access to: https://integration.templemotherearth.org/

---

## 🔌 External Integrations

| Service | Purpose | Connection |
|---------|---------|------------|
| **GoHighLevel (GHL)** | CRM, lead management | Webhook on Sacred Intake form |
| **Eventbrite** | Ceremony bookings | External links (organizer 29347213477) |
| **PayPal** | Donations / Tithes | Tokenized donate link |
| **Stripe** | Membership payments (planned) | API integration pending |
| **Telegram** | Community circles | External chat links |
| **Square** | POS (in-person) | Store integration TBD |

---

## 🛡️ Authentication & Data

- **Auth**: Lovable Cloud native auth (email/password)
- **Database**: `profiles` table with `user_id`, `email`, `full_name`, `membership_tier`
- **RLS**: Users can only read/update their own profile
- **Form Data**: Sacred Intake → GHL webhook only (not stored in site DB)
- **Education Content**: Static content, client-side auth gate (Phase 1)

---

## 📋 Phase 2 — Deep Pages Roadmap

### Individual Offering Pages (Planned)

Each offering will get a dedicated deep page with rich content:

#### `/offerings/kambo` — Kambo Ceremony Page
- **Hero**: Full-width imagery of Kambo ceremony setting
- **What is Kambo**: Educational overview of the sacred frog medicine
- **Benefits**: Physical detox, emotional clearing, spiritual awakening
- **The Ceremony Experience**: Step-by-step walkthrough (preparation → ceremony → integration)
- **Safety & Screening**: Medical contraindications, why the intake form matters
- **Facilitator Profiles**: Who leads Kambo ceremonies
- **Testimonials**: Community member stories
- **FAQ**: Common questions specific to Kambo
- **CTA**: "Enter the Ceremony" → Sacred Intake Form

#### `/offerings/hape` — Hapé Ceremony Page
- Similar structure to Kambo with Hapé-specific content
- History and lineage of sacred tobacco snuff
- Different types of Hapé and their purposes

#### `/offerings/sacred-vine` — Ayahuasca / Sacred Vine Page
- Deep educational content on the sacred vine
- Preparation guidelines (diet, medications, mindset)
- Extended integration support information

#### `/offerings/cacao` — Cacao Ceremony Page
- Heart-opening ceremony overview
- Gentler entry point for newcomers
- Music, movement, and meditation aspects

### Other Phase 2 Features
- **Individual FAQ sections** per offering
- **Testimonials / Stories** section with member submissions
- **Weekly Rhythm** section on homepage (currently deferred)
- **"View All Offerings"** tile button on homepage
- **Temple Store** (e-commerce integration — Square POS or Shopify)
- **Instagram Feed** (Elfsight widget embed)
- **Google Reviews** widget (Google Places API)
- **Stripe checkout** for membership payments and ceremony bookings

---

## 🏗️ Creating a Deep Page (Template)

Each deep offering page should follow this structure:

```tsx
// src/pages/offerings/Kambo.tsx
<Navigation />
<HeroSection />           // Full-width image + title + subtitle
<WhatIsSection />          // Educational overview
<BenefitsGrid />           // 3-4 benefit cards with icons
<CeremonyExperience />     // Step-by-step timeline
<SafetySection />          // Contraindications, screening importance
<FacilitatorProfiles />    // Relevant facilitator cards
<TestimonialsCarousel />   // Community stories
<FAQAccordion />           // Offering-specific Q&A
<CTASection />             // "Enter the Ceremony" → /ceremony-intake
<Footer />
```

Add the route in `App.tsx`:
```tsx
<Route path="/offerings/kambo" element={<Kambo />} />
```

---

*Last updated: February 2026*
