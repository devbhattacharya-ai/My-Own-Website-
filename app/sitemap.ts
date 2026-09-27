import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';
export default function sitemap(): MetadataRoute.Sitemap {
 return ['', '/pricing', '/work/smile-dental', '/work/bisi-bele', '/work/afterdark', '/project-notes'].map(path=>({url:`${siteUrl}${path}`}));
}
