# The Brunch Munch Demo

A lightweight, frontend-only sales website demo for The Brunch Munch.

## Run locally

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Before handoff

1. The primary WhatsApp contact is set to `233545291789` from the supplied business profile screenshot. Change `WHATSAPP_NUMBER` in `script.js` if a different number should receive enquiries.
2. Replace each image placeholder in `index.html` with the supplied photography. Placeholder surfaces are labelled and grouped by use: hero, about, menu, and event showcase.
3. The fallback wordmark and favicon now echo the supplied Instagram logo. Replace them with the original logo file if a higher-resolution asset is supplied.
4. Replace bracketed testimonials and any remaining placeholder social/contact fields with approved business content.

There is no backend, database, authentication, payment processing, or server-side form submission. The enquiry form creates a pre-filled WhatsApp click-to-chat message in the browser.
