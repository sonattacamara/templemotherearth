# Temple Mother Earth — Phase 1 Launch Review & Phase 2 Plan

*Last updated: February 12, 2026*

---

## ✅ PHASE 1 — LAUNCH REVIEW (Complete)

### 1. Homepage (/)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero section ("Welcome To / Temple Mother Earth") | ✅ Complete | Full-screen hero with logo, tagline, 3 CTAs |
| Three Hero CTAs (Explore, Discover Your Path, I'm Ready) | ✅ Complete | Proper deep-linking & routing |
| Origin Story excerpt | ✅ Complete | Links to /about |
| Sacred Experiences (4 offering cards) | ✅ Complete | Ceremonies, Immersions, Traveling, Private |
| "What You Will Experience" section | ✅ Complete | 4 transformation cards |
| "Your Sacred Community Awaits" pathway map | ✅ Complete | Welcome → Belong → Train → Prepare → Embody |
| "Does This Sound Like You?" section | ✅ Complete | 8 trauma-informed bullet points with emojis |
| Upcoming Ceremonies section | ✅ Complete | CTA link to Eventbrite (iframe replaced due to Eventbrite blocking) |
| Instagram Widget (Elfsight) | ✅ Complete | Elfsight embed in index.html |
| Google Reviews (Community Voices) | ⚠️ Partial | Widget built & backend proxy working, but **API key has HTTP referrer restrictions** — needs unrestricted key from Google Cloud Console |
| Temple Transmissions email signup | ✅ Complete | GHL webhook integration |
| Contact section with Telegram circles | ✅ Complete | Public, Men's, Wombmen's, Forest Team links |
| Floating Donation button (PayPal) | ✅ Complete | Popup with PayPal tokenized link |
| 4-column footer | ✅ Complete | Experiences, Get Involved, Connect, Brand |
| Amazon Wishlist link | ✅ Complete | In footer support section |
| Google Review link | ✅ Complete | Direct review submission link |
| Share Photos & Videos link | ✅ Complete | Google Photos album link |
| Journey stage markers & connectors | ✅ Complete | Compass icons with gradient lines |

### 2. About Page (/about)
| Feature | Status |
|---------|--------|
| Hero with background image | ✅ Complete |
| Origin story (full) | ✅ Complete |
| Mission & Vision (4 sections) | ✅ Complete |
| 6 Core Values | ✅ Complete |
| The Four Agreements | ✅ Complete |
| Founders: Dr. Sonatta Camara, PhD & King James | ✅ Complete |
| Facilitator bios: Debra, Spencer, Samira, Dr. George, Jala | ✅ Complete |
| Statement of Beliefs (RFRA) | ✅ Complete |
| CTA footer | ✅ Complete |

### 3. Membership Page (/membership)
| Feature | Status |
|---------|--------|
| Hero with philosophy | ✅ Complete |
| 4 philosophy cards (Safety, Integration, Intentional, Community) | ✅ Complete |
| Sequential tier pathway (Welcome → Embody) | ✅ Complete |
| Welcome Circle (Free) → native auth signup | ✅ Complete |
| Community Rhythm ($50/mo) → Stripe checkout | ✅ Complete |
| Environment Collective ($150/mo) → Stripe checkout | ✅ Complete |
| Preparation Path ($275/mo) → Stripe checkout | ✅ Complete |
| Temple Immersion Path ($500/mo) → Stripe checkout | ✅ Complete |
| FAQ section | ✅ Complete |
| CTA footer | ✅ Complete |

### 4. Sacred Intake Form (/ceremony-intake)
| Feature | Status |
|---------|--------|
| Step 1: Personal Information (name, email, phone, DOB with 18+ validation) | ✅ Complete |
| Step 2: Emergency Contact (with relationship dropdown) | ✅ Complete |
| Step 3: Ceremony Selection & Intentions | ✅ Complete |
| Step 4: Health Screening (medications, conditions, mental health, substance use, allergies, Kambo-specific) | ✅ Complete |
| Contraindication flagging (SSRIs, MAOIs, bipolar, pregnancy, etc.) | ✅ Complete |
| "Schedule Consultation" redirect for flagged participants | ✅ Complete |
| Step 5: Waivers (RFRA, liability, confidentiality, media, emergency auth) | ✅ Complete |
| Step 6: Thank You page with "Enter the Ceremony" Eventbrite CTA | ✅ Complete |
| GHL webhook integration | ✅ Complete |
| Zod validation per step | ✅ Complete |
| Radio button styling (clear default, red when selected) | ✅ Complete |

### 5. Member Portal (/portal)
| Feature | Status |
|---------|--------|
| Auth gate (Create Space / Welcome Back) | ✅ Complete |
| TOME logo branding | ✅ Complete |
| Integration portal iframe (integration.templemotherearth.org) | ✅ Complete |
| Sign out functionality | ✅ Complete |
| Open in new window link | ✅ Complete |

### 6. Member Auth (/member/auth)
| Feature | Status |
|---------|--------|
| Separate auth page for free Welcome Circle signups | ✅ Complete |

### 7. Member Education (/member/education)
| Feature | Status |
|---------|--------|
| Auth-gated education page | ✅ Complete |
| Kambo learning module placeholder | ✅ Complete |

### 8. Offering Pages
| Page | Status |
|------|--------|
| /retreats-inquiry (International Immersions) | ✅ Complete |
| /traveling-ceremonies | ✅ Complete |
| /private-ceremonies | ✅ Complete |

### 9. Get Involved Pages
| Page | Status |
|------|--------|
| /volunteer | ✅ Complete |
| /join-facilitator | ✅ Complete |
| /sponsor | ✅ Complete |
| /preparation | ✅ Complete |
| /conduct | ✅ Complete |

### 10. Navigation
| Feature | Status |
|---------|--------|
| Fixed top nav with logo | ✅ Complete |
| Desktop: About, Experiences, Membership, Community links | ✅ Complete |
| Member Login button (orange) | ✅ Complete |
| Begin Your Journey button (red, matches Donation) | ✅ Complete |
| Enter the Portal button | ✅ Complete |
| Mobile hamburger menu | ✅ Complete |

### 11. Backend & Integrations
| Integration | Status | Notes |
|-------------|--------|-------|
| Lovable Cloud (Auth + Database) | ✅ Complete | profiles, page_views, form_submissions tables with RLS |
| Stripe (Live keys) | ✅ Complete | 4 paid tier checkouts via edge function |
| GoHighLevel (GHL) | ✅ Complete | Sacred Intake + Temple Transmissions webhooks |
| Eventbrite | ✅ Complete | External link CTA (iframe blocked by Eventbrite) |
| PayPal Donations | ✅ Complete | Tokenized popup |
| Google Reviews API | ⚠️ Needs Fix | API key needs HTTP referrer restriction removed in Google Cloud Console |
| Instagram (Elfsight) | ✅ Complete | Widget embed |
| Telegram | ✅ Complete | 4 community circle links |

### 12. SEO & Technical
| Feature | Status |
|---------|--------|
| Title tag (under 60 chars) | ✅ Complete |
| Meta description (under 160 chars) | ✅ Complete |
| Open Graph tags | ✅ Complete |
| Twitter Card tags | ✅ Complete |
| JSON-LD (ReligiousOrganization) | ✅ Complete |
| Canonical URL | ✅ Complete |
| Favicon (PNG) | ✅ Complete |
| Semantic HTML | ✅ Complete |
| Responsive design | ✅ Complete |
| Lazy loading images | ✅ Complete |

### 13. Analytics (/analytics)
| Feature | Status |
|---------|--------|
| Page view tracking (useAnalytics hook) | ✅ Complete |
| Form submission tracking | ✅ Complete |
| Admin dashboard at /analytics | ✅ Complete |

---

## ⚠️ KNOWN ISSUES AT LAUNCH

1. **Google Reviews Widget**: The `GOOGLE_PLACES_API_KEY` has HTTP referrer restrictions, which blocks server-side calls. **Fix**: Go to Google Cloud Console → Credentials → Edit the API key → Change "Application restrictions" from "HTTP referrers" to "None" or "IP addresses". Wait 5 minutes, then update the secret in project settings.

2. **Eventbrite Embed**: Eventbrite blocks iframe embedding of organizer pages. Replaced with a branded CTA card linking directly to the Eventbrite events page. This is the best solution without an Eventbrite API integration.

3. **Canonical URL**: Currently set to `templemotherearth.lovable.app`. When a custom domain is connected, update `index.html` to reflect the production domain.

---

## 🔮 PHASE 2 — POST-LAUNCH ROADMAP

### Priority 1 — Core Functionality

| # | Feature | Description | Difficulty |
|---|---------|-------------|------------|
| 1 | **Google Reviews Fix** | Update API key restrictions and verify widget loads | Easy |
| 2 | **Custom Domain** | Connect templemotherearth.org (or chosen domain) and update canonical URLs, OG tags | Easy |
| 3 | **Member Portal (Native Build)** | Replace iframe with native portal — tier-gated content, resource library, practice tracker | Hard |
| 4 | **Subscription Status Display** | Show active Stripe tier in portal, gate content by membership level | Medium |
| 5 | **Weekly Rhythm Section** | Show Temple's weekly schedule of classes/circles on homepage | Medium |

### Priority 2 — Deep Offering Pages

| # | Feature | Description | Difficulty |
|---|---------|-------------|------------|
| 6 | **Kambo Deep Page** (`/offerings/kambo`) | Comprehensive page — history, preparation, what to expect, contraindications, facilitator profiles, FAQ | Medium |
| 7 | **Hapé Deep Page** (`/offerings/hape`) | Dedicated ceremony page with preparation protocols | Medium |
| 8 | **Cacao Deep Page** (`/offerings/cacao`) | Heart-opening ceremony overview, gentler entry point | Medium |
| 9 | **Sacred Vine Deep Page** (`/offerings/sacred-vine`) | Extended preparation, diet, medications, integration | Medium |

### Priority 3 — Community & Engagement

| # | Feature | Description | Difficulty |
|---|---------|-------------|------------|
| 10 | **Testimonials / Stories Section** | Member-submitted stories beyond Google Reviews | Medium |
| 11 | **Blog / Temple Journal** | Content platform for articles, reflections, teachings | Hard |
| 12 | **Automated Welcome Email** | Send welcome email when someone joins Welcome Circle | Medium |
| 13 | **"View All Offerings" Tile** | Homepage button linking to a dedicated offerings index page | Easy |

### Priority 4 — Technical Enhancements

| # | Feature | Description | Difficulty |
|---|---------|-------------|------------|
| 14 | **Webhook Confirmation for Stripe** | Stripe webhook to update `profiles.membership_tier` automatically on subscription changes | Medium |
| 15 | **Mobile PWA** | Make the site installable as a phone app | Medium |
| 16 | **OG Image** | Create a proper branded social share image (1200x630) | Easy |
| 17 | **Temple Store** | E-commerce integration (Square POS or Shopify) for merchandise, herbs, etc. | Hard |

---

## 📋 WHAT I NEED FROM YOU FOR PHASE 2

### Content Needed (You Provide)

| # | Item | For Feature | Format |
|---|------|-------------|--------|
| 1 | **Kambo ceremony content** | Kambo Deep Page | Written text: history, benefits, what to expect, preparation guidelines, contraindications, FAQ (Q&A pairs) |
| 2 | **Kambo ceremony photos** | Kambo Deep Page | 3-5 high-quality images (ceremony setting, facilitator in action, sacred space) |
| 3 | **Hapé ceremony content** | Hapé Deep Page | Written text: history, types of Hapé, purposes, preparation, FAQ |
| 4 | **Hapé ceremony photos** | Hapé Deep Page | 2-3 high-quality images |
| 5 | **Cacao ceremony content** | Cacao Deep Page | Written text: overview, heart-opening focus, music/movement aspects, FAQ |
| 6 | **Cacao ceremony photos** | Cacao Deep Page | 2-3 high-quality images |
| 7 | **Sacred Vine ceremony content** | Sacred Vine Deep Page | Written text: preparation diet, medication guidance, ceremony experience, integration support, FAQ |
| 8 | **Sacred Vine ceremony photos** | Sacred Vine Deep Page | 2-3 high-quality images |
| 9 | **Weekly schedule** | Weekly Rhythm Section | What happens each day of the week (e.g., Mon-Fri Qi Gong, Wednesday community circle, etc.) |
| 10 | **Member testimonials** | Testimonials Section | 5-10 written testimonials or video links from community members (with permission) |
| 11 | **Blog/journal articles** | Temple Journal | Initial 3-5 articles, reflections, or teachings |
| 12 | **Welcome email copy** | Automated Welcome Email | Text for the email sent to new Welcome Circle members |
| 13 | **Member portal content per tier** | Native Portal Build | Videos, PDFs, guided practices, journaling prompts — organized by tier |
| 14 | **OG/social share image** | Social Media | Branded 1200x630 image for social sharing (or I can generate one) |
| 15 | **Custom domain name** | Domain Connection | Confirm the domain to connect (templemotherearth.org?) |

### Technical Actions Needed (You Do)

| # | Action | Why |
|---|--------|-----|
| 1 | **Fix Google API key restrictions** | Go to Google Cloud Console → Credentials → Edit API key → Change restrictions from "HTTP referrers" to "None". Wait 5 min, then update the secret. |
| 2 | **Verify Stripe products** | Log into Stripe dashboard and confirm the 4 product/price IDs match what's in the code |
| 3 | **Test a real checkout flow** | Complete a test membership purchase to verify the full Stripe flow |
| 4 | **Verify GHL webhook** | Confirm Sacred Intake submissions are arriving in GoHighLevel CRM |
| 5 | **Connect custom domain** | In project settings → Domains, add your production domain |

---

## 🏗️ RECOMMENDED PHASE 2 SEQUENCE

1. **Immediate (Week 1)**: Fix Google Reviews API key, connect custom domain, update canonical URLs
2. **Week 2-3**: Build Kambo deep page (highest content priority)
3. **Week 3-4**: Stripe webhook for automatic tier updates, subscription status in portal
4. **Month 2**: Hapé + Cacao deep pages, Weekly Rhythm section, OG image
5. **Month 2-3**: Native member portal build (biggest feature), testimonials section
6. **Month 3+**: Blog/Temple Journal, Sacred Vine page, automated emails, PWA, store

---

*This document should be reviewed for accuracy and completeness. Let me know if any features were missed or if details need correction.*
