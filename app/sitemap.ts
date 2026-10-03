import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';
export default function sitemap(): MetadataRoute.Sitemap {
 return ['', '/pricing', '/work/smile-dental', '/work/rowdy-momo', '/work/afterdark', '/project-notes'].map(path=>({url:`${siteUrl}${path}`}));
}
