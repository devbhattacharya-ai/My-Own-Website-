# Dev AI Studio website

This repository contains the full website as a Next.js project.

## Run locally

Install Node.js 22, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Import this repository using the **Next.js** framework preset. Use the repository root as Root Directory. Leave Build Command and Output Directory at their defaults. Vercel runs `npm run build` (`next build`).

The site URL used for canonical links, sitemap, robots and structured data comes from Vercel's production URL. To use your own domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain.example` for the project and redeploy.

The project gallery links to separate demo websites. A contact button opens WhatsApp; the interactive automation example runs in the browser and is not a live WhatsApp bot.
