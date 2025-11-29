# SEO Strategy & Future Outlook

## 1. Current State: Strong Foundation

Your new website is built on **Next.js 14**, which provides a massive SEO advantage over traditional WordPress sites.

### Why it's better now:
*   **Server-Side Rendering (SSR)**: Google sees the full HTML content immediately, just like a static page. No waiting for JavaScript to load.
*   **Performance (Core Web Vitals)**:
    *   **LCP (Largest Contentful Paint)**: Optimized via the new `next/image` component (WebP formats, proper sizing).
    *   **CLS (Cumulative Layout Shift)**: Minimized because space is reserved for images before they load.
*   **Semantic HTML**: The code uses proper `<header>`, `<main>`, `<article>`, and `<h1>` tags, making it easy for search engines to understand the structure.

---

## 2. The Future of SEO for This Architecture

Since you are using a "Headless" setup, your SEO strategy involves both technical configuration and content habits.

### A. Technical SEO (The "Set and Forget" Stuff)

1.  **Dynamic Sitemaps (High Priority)**
    *   **Goal**: Automatically generate a `sitemap.xml` that lists all your pages, services, and team members.
    *   **Action**: Install `next-sitemap`. It will auto-crawl your routes and build this file every time you deploy.
    *   **Benefit**: Google discovers new therapist profiles instantly.

2.  **Structured Data (Schema.org)**
    *   **Goal**: Tell Google explicitly "This page is a LocalBusiness" or "This page is a Person (Therapist)".
    *   **Action**: Add JSON-LD snippets to your Service and Team pages.
    *   **Benefit**: You can get "Rich Snippets" in search results (e.g., showing star ratings, prices, or opening hours directly in Google).

3.  **Metadata API**
    *   **Current**: You have basic titles.
    *   **Future**: Connect the WordPress "Yoast SEO" plugin data to Next.js.
    *   **How**: The API can expose the custom meta titles/descriptions you write in Yoast. We just need to map them to the Next.js `generateMetadata()` function.

### B. Content Strategy (The "Growth" Stuff)

1.  **"Programmatic" SEO for Conditions**
    *   **Strategy**: Create pages not just for "Physiotherapy" (the solution), but for "Back Pain" (the problem).
    *   **Implementation**: Create a new Content Type in WordPress called "Conditions". Link them to Therapists.
    *   **Why**: People search for their symptoms ("sciatica relief dorchester") more often than the technical treatment name.

2.  **Local SEO Dominance**
    *   **Google My Business**: Ensure your GMB profile links exactly to your new homepage.
    *   **Location Pages**: If you expand to a second location, create a dedicated landing page (e.g., `/locations/weymouth`) with specific address/map data.

3.  **Voice Search Optimization**
    *   **Trend**: "Hey Siri, find a physio near me."
    *   **Action**: Ensure your "Contact" page has clear, text-based Address, Phone, and Opening Hours. Schema markup (mentioned above) is critical here.

---

## 3. Summary Checklist for Launch

- [ ] **Google Search Console**: Verify your domain ownership.
- [ ] **Sitemap**: Submit your `sitemap.xml` to Search Console.
- [ ] **Redirects**: If you had an old site, ensure 301 redirects are in place so you don't lose old traffic.
- [ ] **Analytics**: Install Google Analytics 4 (GA4) to track conversions (e.g., "Book Now" clicks).
