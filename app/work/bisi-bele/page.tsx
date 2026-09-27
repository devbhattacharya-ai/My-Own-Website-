import type { Metadata } from 'next';
import { CaseStudy } from '@/components/case-study';
export const metadata: Metadata = {
 title: 'Bisi Bele — Concept Case Study | DEV / AI STUDIO',
 description: 'A food-first restaurant website concept with menu discovery and local context.',
 alternates: { canonical: '/work/bisi-bele' },
 openGraph: {title:'Bisi Bele — Concept Case Study', description:'A food-first restaurant website concept with menu discovery and local context.', url:'/work/bisi-bele', images:[]},
 twitter: {card:'summary',title:'Bisi Bele — Concept Case Study',description:'A food-first restaurant website concept with menu discovery and local context.',images:[]}
};
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const params=await searchParams;
 return <CaseStudy slug="bisi-bele" initialLanguage={params.lang==='mr'?'mr':'en'}/>;
}
