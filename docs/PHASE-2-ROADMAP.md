# Temple Mother Earth — Phase 2 Roadmap

## ✅ Phase 1 Completion Status (Launch-Ready)

### Completed Features
| Feature | Status | Notes |
|---------|--------|-------|
| Homepage (Hero's Journey structure) | ✅ Done | 6-stage narrative: Call → Awakening → Path → Transformation → Circle → Invitation |
| Three Hero CTAs | ✅ Done | "See All Experiences", "Begin the Journey", "I'm Ready" |
| Origin Story (Homepage + About) | ✅ Done | COVID founding story on both pages |
| About Page (Full) | ✅ Done | Mission, Vision, Values, Five Agreements, Founders, Facilitators |
| Membership Page (5-tier pathway) | ✅ Done | Welcome (Free) → Belong → Train → Prepare → Embody |
| Stripe Checkout Integration | ✅ Done | Edge functions: create-checkout, check-subscription, customer-portal |
| Sacred Intake Form (6-step) | ✅ Done | `/ceremony-intake` — mandatory for ceremony participants |
| Navigation + Get Involved Dropdown | ✅ Done | Desktop dropdown + mobile section for Volunteer, Facilitator, Sponsor, Prep, Conduct |
| 4-Column Footer (all pages) | ✅ Done | Brand, Experiences, Get Involved, Connect + RFRA disclaimer |
| RFRA Legal Compliance | ✅ Done | Footer disclaimer on all pages |
| "Does This Sound Like You?" Section | ✅ Done | 8 trauma-informed bullet points with emoji grid |
| Pathway Map (no pricing) | ✅ Done | Icons clear by default, red on hover |
| Eventbrite Embed | ✅ Done | Embedded on homepage with fallback link |
| Instagram Widget (Elfsight) | ✅ Done | Live on homepage |
| Google Reviews Link | ✅ Done | Link to leave/read reviews |
| Donation Button (PayPal) | ✅ Done | Floating button + popup modal |
| Contact Section + Form | ✅ Done | Email, address, Telegram circles, newsletter signup |
| Facilitator Photos Updated | ✅ Done | Spencer, Samira, Debra, Dr. George — new headshots |
| Volunteer Page | ✅ Done | `/volunteer` |
| Join as Facilitator Page | ✅ Done | `/join-facilitator` |
| Sponsor Page | ✅ Done | `/sponsor` |
| Ceremony Preparation Page | ✅ Done | `/preparation` |
| Code of Conduct Page | ✅ Done | `/conduct` |
| Retreats Inquiry Page | ✅ Done | `/retreats-inquiry` |
| Traveling Ceremonies Page | ✅ Done | `/traveling-ceremonies` |
| Private Ceremonies Page | ✅ Done | `/private-ceremonies` |
| Member Auth | ✅ Done | `/member-auth` — signup/login for Welcome Circle |
| Member Portal Page | ✅ Done | `/portal` |
| Member Education Page | ✅ Done | `/member/education` |
| Telegram Community Circles | ✅ Done | Public, Men's, Wombmen's, Forest Team links |

### Known Limitations at Launch
- **Eventbrite iframe** may be blocked by Eventbrite's security headers — fallback link provided
- **Google Reviews widget** is link-only (not embedded) — Places API widget is Phase 2
- **Temple Transmissions email form** is not yet wired to GoHighLevel — form exists but doesn't submit to CRM
- **Member Portal** is a placeholder — full portal build is Phase 2

---

## 🔮 Phase 2 Features (Post-Launch)

### Priority 1 — Core Functionality
| Feature | Description | What's Needed From You |
|---------|-------------|----------------------|
| **GoHighLevel Webhook Integration** | Wire the Temple Transmissions email signup form + contact form to your GHL CRM | Your GHL webhook URL for lead capture |
| **Google Reviews Widget** | Embed live Google reviews on the homepage using Places API | Google Places API key (you mentioned you have one) |
| **Member Portal (Full Build)** | Build out the actual member portal with tier-gated content, resource library, practice tracker | Content for each tier: videos, PDFs, guided practices, journal prompts |
| **Subscription Status in Auth** | Show active tier in the member portal, gate content by tier level | Already have Stripe integration — just needs frontend wiring |

### Priority 2 — Deep Offering Pages
| Feature | Description | What's Needed From You |
|---------|-------------|----------------------|
| **Kambo Deep Page** | Comprehensive page about Kambo ceremonies — history, preparation, what to expect, contraindications | Written content about your Kambo ceremonies, specific preparation protocols, any medical disclaimers |
| **Hapé Deep Page** | Dedicated page for Hapé ceremonies | Written content, ceremony descriptions, photos |
| **Cacao Deep Page** | Dedicated page for Cacao ceremonies | Written content, ceremony descriptions, photos |

### Priority 3 — Community & Engagement
| Feature | Description | What's Needed From You |
|---------|-------------|----------------------|
| **Testimonial Content** | Additional testimonials beyond Google Reviews | Written testimonials or video testimonials from community members |
| **Weekly Rhythm Section** | Show the Temple's weekly schedule of classes/circles | Your weekly schedule (what happens on each day) |
| **Blog / Temple Journal** | Content platform for articles, reflections, teachings | Ongoing written content |

### Priority 4 — Technical Enhancements
| Feature | Description | What's Needed From You |
|---------|-------------|----------------------|
| **SEO Optimization** | Meta tags, Open Graph, structured data for all pages | Nothing — I can implement this |
| **Analytics Dashboard** | Track page views, conversion funnel, membership signups | Nothing — I can implement this |
| **Mobile PWA** | Make the site installable as a phone app | Nothing — I can implement this |
| **Automated Welcome Email** | Send a welcome email when someone joins the Welcome Circle | Email copy/template you'd like to send |

---

## 📋 What I Need From You for Phase 2

### Immediate (to start Phase 2 work)
1. **GoHighLevel webhook URL** — for email/contact form integration
2. **Google Places API key** — for the reviews widget
3. **Kambo ceremony content** — written descriptions, preparation protocols, contraindications, photos

### When Ready
4. **Member portal content** — what resources, videos, teachings exist for each tier
5. **Weekly schedule** — what happens each day at the Temple
6. **Hapé & Cacao content** — ceremony descriptions and photos
7. **Additional testimonials** — written or video from community members
8. **Welcome email copy** — what new members should receive

### Photos Needed
9. **Any new ceremony/event photos** — for deep offering pages
10. **Community gathering photos** — for testimonials section and blog

---

## 🚀 Launch Checklist

Before publishing:
- [ ] Review all page content for accuracy
- [ ] Test Stripe checkout flow (click Begin on a paid tier)
- [ ] Test Welcome Circle free signup
- [ ] Verify all navigation links work
- [ ] Verify all external links (Eventbrite, Instagram, Telegram, PayPal, Google Reviews)
- [ ] Check mobile responsiveness on phone
- [ ] Review facilitator photos and bios for accuracy
- [ ] Confirm RFRA disclaimer language is correct
- [ ] Test contact form (currently opens email client)
