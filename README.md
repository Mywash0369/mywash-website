# Mywash Recruitment Agency — Website

**Registered entity:** K2026/125236/07  
**Stack:** HTML5 · CSS3 · Vanilla JavaScript  
**Hosting:** Netlify (static)  
**Developer:** Sthembiso Ndlovu

---

## Project Overview

A fully responsive, SEO-optimised marketing website for Mywash Recruitment Agency — a Gauteng-based recruitment, staffing, travel management, and cleaning services business.

---

## File Structure

```
mywash/
├── index.html                        # Homepage
├── about.html                        # About page
├── contact.html                      # Contact page
├── privacy-policy.html               # POPIA-compliant privacy policy
├── sitemap.xml                       # XML sitemap for search engines
├── robots.txt                        # Crawler instructions
├── site.webmanifest                  # PWA manifest
├── css/
│   └── main.css                      # Full shared design system
├── js/
│   └── main.js                       # Shared JavaScript (nav, animations, forms)
├── images/
│   └── logo.png                      # Client logo (place file here)
└── services/
    ├── travel-management.html        # Travel packages + booking
    ├── property-management.html      # Property staffing
    ├── cleaning-services.html        # Cleaning services
    └── staffing.html                 # Recruitment + domestic staffing
```

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, stats, services overview, travel packages, dual CTA |
| About | `/about.html` | Story, values, team (MD), sectors, promise |
| Travel Management | `/services/travel-management.html` | Packages, how it works, FAQ, booking |
| Property Management | `/services/property-management.html` | Roles, why us, CTA |
| Cleaning Services | `/services/cleaning-services.html` | 6 cleaning categories with tags |
| Staffing | `/services/staffing.html` | Household + FMCG, process timeline, FAQ |
| Contact | `/contact.html` | WhatsApp form, contact details, social links |
| Privacy Policy | `/privacy-policy.html` | Full POPIA-compliant policy |

---

## Tech Stack

### Design System
- Pure HTML5 semantic markup
- CSS custom properties (variables) for all tokens
- BEM naming convention
- Mobile-first responsive design
- Breakpoints: 640px / 768px / 1024px / 1280px

### JavaScript Features
- Nav: transparent over hero, frosted on scroll, mobile drawer
- Scroll reveal: `IntersectionObserver` fade-up with stagger
- Stat counters: count-up animation on scroll
- Photo panels: crossfade on scroll (desktop), static scroll (mobile/iOS)
- Testimonial carousel: touch/swipe support, auto-play, dot nav
- Contact form: WhatsApp redirect with pre-filled message
- FAQ accordion: accessible expand/collapse
- Lazy image loading: native + observer fallback
- Auto copyright year update

### SEO
- Full `<head>` template on every page: title, description, canonical, OG, Twitter card
- Structured data (JSON-LD): Organization, WebSite, BreadcrumbList, FAQPage schemas
- Hero image preload (`fetchpriority="high"`) on every page
- `sitemap.xml` with all 8 URLs and correct priorities
- `robots.txt` pointing to sitemap
- `site.webmanifest` for PWA/mobile browser support
- WCAG 2.1 AA accessibility: skip links, ARIA labels, focus rings, `lang` attribute

---

## Deployment (Netlify)

### First Deploy

1. Push this repo to GitHub (recommend private repo until live)
2. Log into [netlify.com](https://netlify.com) and click **Add new site**
3. Select **Import from GitHub** and choose this repo
4. Build settings:
   - Build command: *(leave blank — static site)*
   - Publish directory: `.` *(root of repo)*
5. Click **Deploy site**

### Connect Custom Domain

1. Client purchases domain (recommended: **mywashrecruitment.co.za** via Afrihost or Domains.co.za)
2. In Netlify: **Domain settings > Add custom domain**
3. Update DNS at registrar — point to Netlify nameservers
4. Netlify auto-provisions SSL (HTTPS) via Let's Encrypt

### After Going Live

1. **Update canonical URLs** in every `<head>` — replace `https://www.mywashrecruitment.co.za` with the actual live domain if different
2. **Submit sitemap to Google Search Console:**  
   Go to [search.google.com/search-console](https://search.google.com/search-console) > Sitemaps > Submit `https://yourdomain.co.za/sitemap.xml`
3. **Update email** — replace `mywash@mail.com` with the permanent domain email once it is set up

---

## Images

The site uses Unsplash placeholder images via URL for all background/hero images. These are suitable for development and staging. For production:

- Replace Unsplash URLs with properly licensed images stored in `/images/`
- Preferred format: WebP with JPEG fallback using `<picture>` tags
- Recommended dimensions: hero images 1920×1080px, content images 800×520px
- Logo (`/images/logo.png`) must be placed before the site will render correctly

---

## Content Updates

### Adding a New Travel Package
Open `services/travel-management.html` and `index.html`. Copy an existing `.package-card` block and update the dates, price, deposit, and includes list. Update the WhatsApp booking link with the new package name.

### Updating Contact Details
All contact details (phone, email) appear in the footer of every page and the contact page. Search for `073 096 6477` and `mywash@mail.com` across all HTML files to update.

### Domain Email
Once the domain is purchased and email is configured, replace every instance of `mywash@mail.com` with the new address. Update the `href="mailto:..."` links too.

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14+ | Full |
| Edge | 90+ | Full |
| Safari iOS | 14+ | Full |
| Chrome Android | 90+ | Full |

---

## Known Limitations

- Contact form routes through WhatsApp (no server-side email). A backend or service like Formspree/Netlify Forms can be added when required.
- Job listings page not yet built — placeholder for future development.
- OG images (`/images/og/*.jpg`) are referenced but not yet created. For rich social sharing previews, create 1200×630px branded images for each page.

---

## Future Enhancements

- **Job listings page** with filtering (requires CMS or JSON feed)
- **Headless CMS integration** (Contentful or Sanity) for client self-management of travel packages and job listings
- **Netlify Forms** or backend email for the contact form
- **Google Analytics 4** — add `gtag.js` snippet to all pages when ready
- **OG images** — create branded 1200×630px images for each page for social sharing

---

## Developer Notes

- No build tools, no npm, no bundler — pure HTML/CSS/JS. Deploy as-is.
- All CSS is in one file (`css/main.css`) shared across all pages.
- All JS is in one file (`js/main.js`) shared across all pages.
- Page-specific CSS is scoped in `<style>` blocks within each HTML file's `<head>`.
- Page-specific JS (e.g. FAQ accordion, form success) is in `<script>` blocks before `</body>`.
- `prefers-reduced-motion` is respected across all animations.

---

## Contact

**Developer:** Sthembiso Ndlovu  
**Phone:** 060 743 1268  
**Email:** sthembisosotsha@gmail.com

**Client:** Mywash Recruitment Agency  
**Phone:** 073 096 6477  
**Email:** mywash@mail.com
