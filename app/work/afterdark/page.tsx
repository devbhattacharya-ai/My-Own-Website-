import type { Metadata } from 'next';
import { CaseStudy } from '@/components/case-study';
export const metadata: Metadata = {
 title: 'Afterdark — Concept Case Study | DEV / AI STUDIO',
 description: 'A chocolate brand concept built around product imagery and scroll storytelling.',
 alternates: { canonical: '/work/afterdark' },
 openGraph: {title:'Afterdark — Concept Case Study', description:'A chocolate brand concept built around product imagery and scroll storytelling.', url:'/work/afterdark', images:[]},
 twitter: {card:'summary',title:'Afterdark — Concept Case Study',description:'A chocolate brand concept built around product imagery and scroll storytelling.',images:[]}
};
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const params=await searchParams;
 return <CaseStudy slug="afterdark" initialLanguage={params.lang==='mr'?'mr':'en'}/>;
}
