const domain =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "dev-ai-web-automation.dev2404.chatgpt.site";

export const siteUrl = domain.startsWith("http") ? domain : `https://${domain}`;
