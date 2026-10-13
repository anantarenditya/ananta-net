# ANANTA.NET Website

Static website for ANANTA.NET, ready for Cloudflare Pages.

## Included updates
- Centralized WhatsApp admin destination: +62 878-6893-3969.
- Consistent package catalog: Hemat 20 Mbps Rp115.000; Normal 35 Mbps Rp165.000; Premium 50 Mbps Rp225.000; Pro 100 Mbps Rp335.000. Installation fee shown as Rp100.000.
- Basic SEO: page-specific descriptions/titles, canonical URLs, Open Graph/Twitter metadata, Organization structured data, `robots.txt`, and `sitemap.xml`.
- Customer registration form on `berlangganan.html`: validates required fields and opens WhatsApp with a prefilled message. No customer data is stored or submitted to a backend. The customer must press Send in WhatsApp.
- Photo delivery optimized with WebP variants and lazy loading for gallery images; the map defers initialization until near the viewport.
- `_headers` defines basic static asset caching for Cloudflare Pages.

## Deploy
Copy these files to the `ananta-net` repository and push to `main`. Cloudflare Pages should use the repository root as its build output directory and no build command for this static site.

Mobile scroll fix: restore normal scrolling when the browser returns from a gallery preview, ensure the main/footer regions remain content-height, and add safe-area padding at the bottom of the footer on mobile. Footer credit for PT Chayo Anugrah Teknologi is retained.
