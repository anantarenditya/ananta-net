ANANTA.NET website package.

Navigation active-state refinement:
- Highlights the current page in the mobile menu with a light teal background, visible teal left stripe, and “Halaman ini” label.
- Resolves the active route using pathname first, then canonical URL and page title/breadcrumb as fallbacks. Detail Paket maps to Paket Langganan.

Keep all files together when copying to the `ananta-net` repository. Do not replace or delete the repository's `.git` folder.


Active navigation fix: every HTML page now declares an explicit `data-page` identity. The shared navigation uses this identity first, then URL/canonical/breadcrumb fallback. The active menu uses a mint background, teal left accent, and “Halaman ini” pill on mobile; detail-paket maps to Paket Langganan. Cache-busting query parameters are applied to shared CSS and JS references so the latest nav logic is fetched after deployment.


Admin WhatsApp number update (2026-11-18):
- Display number: 0815 1377 1177.
- WhatsApp destination configured centrally as 6281513771177.
- Structured Organization and ContactPoint telephone metadata updated.
- Shared CSS/JS cache-busting references refreshed.
