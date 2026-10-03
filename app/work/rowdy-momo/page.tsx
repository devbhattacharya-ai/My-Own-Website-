import type { Metadata } from 'next';
import { CaseStudy } from '@/components/case-study';
export const metadata: Metadata = {
 title: 'Rowdy Momo Cafe — Concept Case Study | DEV / AI STUDIO',
 description: 'A dark, poster-led Nepali café website with a scroll menu, story, and reserve form.',
 alternates: { canonical: '/work/rowdy-momo' },
 openGraph: {title:'Rowdy Momo Cafe — Concept Case Study', description:'A dark, poster-led Nepali café website with a scroll menu, story, and reserve form.', url:'/work/rowdy-momo', images:[]},
 twitter: {card:'summary',title:'Rowdy Momo Cafe — Concept Case Study',description:'A dark, poster-led Nepali café website with a scroll menu, story, and reserve form.',images:[]}
};
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const params=await searchParams;
 return <CaseStudy slug="rowdy-momo" initialLanguage={params.lang==='mr'?'mr':'en'}/>;
}
