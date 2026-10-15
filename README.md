# Bala Graphics AI App — Installable PWA

This edition is prepared to be installable on supported phones and computers after it is deployed to a public HTTPS URL.

## What's included
- Colorful responsive Bala Graphics app and the existing local image gallery.
- Web app manifest, app icons, service worker and offline caching for the app shell/assets.
- An Install App button for browsers that support the install prompt.
- Existing custom design maker, Helping AI, order form and WhatsApp request flow.

## Important: make it available to everyone
A ZIP file or `localhost` address is only available on your own computer. To let customers access the app, publish it on a hosting service and use the public HTTPS URL it provides.

## Deploy on Render (example)
1. Create/sign in to a GitHub account and create a new repository.
2. Upload the contents of this extracted folder to the repository (not the ZIP file itself).
3. In Render, choose **New + → Web Service** and connect that repository.
4. Use these settings:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
5. Create the web service. Wait for the deployment to finish and open the public `https://...onrender.com` URL.
6. Share that URL with customers by WhatsApp or a QR code. Use the actual URL provided by your host; do not use `localhost`.

Hosting providers change their plans and limits. Check the provider's current terms before choosing a free or paid plan. A hosted service may sleep on a free tier or have usage limits.

## Install on devices
- **Android / Chrome:** open the public HTTPS URL, choose Install app if offered, or use the browser menu → Install app / Add to Home screen.
- **iPhone / Safari:** open the public HTTPS URL → Share → Add to Home Screen.
- **Windows / Chrome or Edge:** open the public HTTPS URL and select the Install icon/menu option if offered.

## AI image generation
The AI image-generation endpoint requires `OPENAI_API_KEY` configured as a server-side environment variable in the hosting dashboard. Never put the key in client-side HTML or publish it. API use may incur charges. The Helping AI is built-in guidance and does not require a key.

## Notes
- Service-worker offline support caches the app shell and local images after the first successful online load. AI generation and WhatsApp still require an internet connection.
- The custom SVG is a design concept; confirm spelling, final dimensions and print readiness before production.
- Customer-selected files stay in their browser. They must attach artwork manually in WhatsApp after the app opens the prefilled order message.
- The app's WhatsApp order destination is currently set to `+91 99443 07171`; change it in `public/index.html` if needed before publishing.
