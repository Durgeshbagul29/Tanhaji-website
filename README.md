# Tanhaji website - optimised build

Static HTML/CSS/JS site. Upload the contents of this folder to your web root (same layout as your original zip). No build step is needed to run it.

## Do these 4 things before going live
1. **Set your domain.** Canonical, Open Graph, sitemap and robots.txt use the placeholder `https://YOUR-DOMAIN`.
   Run `python3 set-domain.py https://www.yourdomain.com` once from this folder.
2. **Contact form:** open `assets/js/site-config.js` and paste a form-service URL into `formEndpoint` (Formspree, Web3Forms or your own API). Until then the form opens the visitor's email app (support@abraca-dabra.com) instead of pretending to send.
3. **Analytics:** put your GA4 ID (`G-XXXXXXXXXX`) into `gaMeasurementId` in the same file. Store-button clicks are then tracked as `store_click` events.
4. **Discord:** the footer icon linked to discord.com (not your server), so it is commented out in `index.html` and `Steam_LandingPage/index.html`. Add your invite link and uncomment it.

Then verify the site in Google Search Console and submit `sitemap.xml`.

## What was changed
**SEO:** unique titles and meta descriptions, one H1 per page, canonical tags, Open Graph/Twitter tags, JSON-LD (VideoGame + Organization), robots.txt, sitemap.xml, `noindex` on 404 pages, descriptive image names and better alt text, a real page for the blog post (`blog/indian-gaming-2022-23/`, linked from the blog card title), and a privacy page (`privacy.html`, linked in the footer).

**Speed:**
- Hero video 21.9 MB -> 3.5 MB (desktop, 720p) / 1.5 MB (mobile). Audio and the play/pause + unmute button are kept. A poster image shows instantly. The video is skipped when the visitor uses Data Saver or "reduce motion". The old loading dots were removed because the poster replaces them.
- Images used by the site: about 15.3 MB of PNG -> about 2.5 MB of WebP, resized, with width/height and lazy loading below the fold (gallery images stay eager so the scrolling gallery keeps working).
- Tailwind 2.2.19 (2.9 MB CDN file) -> 24 KB purged local `assets/css/tailwind.css`. Same version and default settings, so the design is unchanged.
- Font Awesome CDN -> local subset (`fontawesome-subset.css` + 3 woff2 fonts), only the icons you use.
- YouTube news videos load lazily; preconnect hints for Google Fonts; cached-asset headers in `_headers` (Netlify/Cloudflare) and `.htaccess` (Apache).

**Fixes and accessibility:** removed a hidden video popup that pointed to a missing file; removed the missing 404 background image; removed right-click blocking; menu button has aria-label and aria-expanded; form fields have name/autocomplete/required; reduced-motion and keyboard-focus styles; external links have `rel="noopener noreferrer"`; Steam page now uses consistent relative paths; font fallback changed from `cursive` to a sans-serif stack.

## Not changed / needs your input
- Blog author ("Game Insider") and date (June 15, 2023) are as in your original. Replace with a real author and update the article.
- The Diwali, Shiv Jayanti and Ganesh campaign sections were already commented out in your `index.html`; they are untouched.
- Blog, gallery, maps and news text are still injected by JavaScript on the home page (Google can render this, but static HTML is stronger). The blog post itself is now static HTML.
- Google Fonts (Sirin Stencil) is still loaded from Google.
- Unused original images (about 12 MB, e.g. `sample2.png`, `sample3.png`, `newlibrary.png`) were left out of this package; they remain in your original zip.
- Nothing here was tested on a live URL: run PageSpeed Insights and Search Console after deployment.

## Maintenance
To change styles/classes later, rebuild `tailwind.css`: install `tailwindcss@2.2.19`, set `purge.content` to your HTML/JS files, and run `npx tailwindcss -i in.css -o assets/css/tailwind.css --minify` with `NODE_ENV=production`.
