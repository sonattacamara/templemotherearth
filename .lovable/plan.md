
## What the 90-day analytics actually say

**Volume**
- 2,433 visitors / 6,232 pageviews → 2.56 pages/visit, 56% bounce, ~8 min avg session
- 65% mobile · 87% US · ~75% of US sessions come from Direct + Google

**Funnel waste**
- `/` got 1,811 views, `/ceremony-intake` got 284 → only **15.7% of homepage visitors ever reach the intake**
- You confirmed last week: **29 hit /ceremony-intake, 0 submitted** → form-completion rate is the real bottleneck, not traffic

**Hidden gold**
- `psychedelics-study.harvard.edu` sent 20 visitors → high-authority backlink we are not amplifying
- Peak days (Mar 14 · Mar 17 · Mar 18 · Apr 4 · May 21-22) drove 40-70% above baseline. We have no recorded reason for any of them
- Instagram + Facebook combined: only 131 visits over 90 days → social is underperforming

**Top pages (signal: where attention actually lands)**
`/` · `/about` · `/ceremony-intake` · `/kambo` · `/membership` · `/sanctuary-week` · `/sacred-tea` · `/level5` · `/hape` · `/private-ceremonies`

---

## Plan: 4 tracks, ranked by ROI

### Track 1 · Fix /ceremony-intake completion (highest ROI, ships this week)

The biggest unlock is not more traffic — it is converting the 29/week already arriving.

- **Add a single-step "Start Application" first screen.** Current intake is multi-step; users abandon at step 1. Replace screen 1 with just `firstName + email + "What's calling you?" radio` → on submit, fire the GHL webhook immediately (lead captured), THEN reveal the rest. Even abandoners enter CRM.
- **Add inline progress + auto-save to localStorage.** If a user leaves mid-form, the next visit restores their position.
- **Track abandonment in `page_views`/`form_submissions`.** Add a `intake_started` event row so we can measure step-by-step drop-off, not just final submit.
- **Visible trust signals above the form**: "Held by [N] members since the Equinox · 21+ sacred ceremony church · your information stays in our temple."
- **Mobile keyboard fixes**: phone field → `inputmode="tel"`, email → `inputmode="email"`, autofocus next on Enter.

### Track 2 · Peak-day intelligence (ships this week)

You're flying blind on what causes spikes. We instrument it once and never wonder again.

- **Query `page_views` for Mar 14, Mar 17–18, Apr 4, May 21–22**: group by `referrer` and `path` to surface what drove each spike (Instagram post · Sona's podcast · email blast · viral DM).
- **Add a `utm_campaign` column** to `page_views` and append `?utm_*` to every Instagram/Email/Telegram link Sonatta posts going forward. This is the difference between guessing and knowing.
- **Build `/admin/analytics-peaks`**: a tiny admin page that lists the last 30 days, flags days >1.5× the trailing-7 average, and shows top referrers/paths for each spike. Sonatta sees the pattern at a glance and repeats whatever worked.

### Track 3 · SEO + AEO expansion (the only sustainable visitor-growth lever)

Google sends 824/90d — that scales linearly with indexed-and-ranking pages. We currently rank for ~12 terms.

- **Publish the 5 immersion blog posts** (Peru, Costa Rica Wide Open, Panama, Sayulita, Egypt) using the AI Journal pipeline. Each post: hook-driven NLP title, 1,200+ words, FAQPage schema, internal links to `/ceremony-intake`. Target one long-tail keyword per post (`sacred immersion peru reciprocity`, `costa rica nervous-system retreat`, etc.).
- **Build out 4 cornerstone landing pages we don't have**:
  - `/what-is-kambo` (search volume exists, our `/kambo` doesn't target it)
  - `/sacred-ceremony-washington-dc` (geo-intent, near-zero competition)
  - `/veterans-ptsd-ceremony` (Veterans program already exists but isn't SEO-optimized)
  - `/integration-after-ceremony` (high-intent post-ceremony traffic, integration portal already merged)
- **FAQPage schema rollout** to `/sacred-series`, `/contact`, every immersion (Kambo already done) → AI engines will start quoting us.
- **Run Semrush on `templemotherearth.org` vs. 3 competitor sanctuaries** to see exactly which keywords we are losing and write to those gaps.

### Track 4 · Referral amplification (free, immediate)

- **Email Harvard's psychedelics-study contact.** They linked you and sent 20 visits — there's a relationship to build. Ask for inclusion in their resources page.
- **Instagram → Site funnel:** replace the linktree-style bio with a single tracked link to `/welcome` (a dedicated landing that mirrors top IG content and routes to intake). 65 IG visits/90d is criminal given Sonatta's reach.
- **Add a sitewide "Continue Your Journey" floating CTA on every ceremony page** routing to `/ceremony-intake` (we already have CrossNavigation; this is one tier higher in visibility).
- **One-tap WhatsApp/Telegram CTA on mobile** for hesitant intake-page visitors who want to talk first.

---

## Expected outcome over 90 days

| Metric | Now | Target | How |
|---|---|---|---|
| Visitors / 90d | 2,433 | 4,500+ | Track 3 (SEO content + 4 new pages) |
| Pageviews / visit | 2.56 | 3.5+ | Track 1 + Track 4 (sticky CTAs, cross-engagement) |
| Bounce rate | 56% | 45% | Track 1 (better intake first screen) + faster mobile LCP |
| `/ceremony-intake` submits | ~few/wk | 10-15/wk | Track 1 (single-step capture + auto-save) |
| Spike-day repeatability | 0 | Every spike attributable | Track 2 (UTM + admin/analytics-peaks page) |

---

## What I need from Sonatta before building

1. Approve this 4-track plan as the sequence (Track 1 + Track 2 ship first, this week; Track 3 over the following 2 weeks; Track 4 ongoing).
2. Confirm I can query `page_views` and `form_submissions` to produce the peak-day forensic report **now** (read-only, no schema change).
3. Decide: do I draft the 5 immersion blog posts using the existing AI Journal pipeline (you review in `/admin/journal`), or do you want to write them yourself?

Hit "Implement plan" and I'll start with the peak-day report + intake single-step rewrite in parallel.

