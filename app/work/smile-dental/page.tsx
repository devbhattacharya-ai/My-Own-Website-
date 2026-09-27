import type { Metadata } from 'next';
import { CaseStudy } from '@/components/case-study';
export const metadata: Metadata = {
 title: 'Smile Dental Clinic — Concept Case Study | DEV / AI STUDIO',
 description: 'Treatment discovery, bilingual content and a clearer appointment enquiry journey.',
 alternates: { canonical: '/work/smile-dental' },
 openGraph: {title:'Smile Dental Clinic — Concept Case Study', description:'Treatment discovery, bilingual content and a clearer appointment enquiry journey.', url:'/work/smile-dental', images:[]},
 twitter: {card:'summary',title:'Smile Dental Clinic — Concept Case Study',description:'Treatment discovery, bilingual content and a clearer appointment enquiry journey.',images:[]}
};
export default async function Page({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const params=await searchParams;
 return <CaseStudy slug="smile-dental" initialLanguage={params.lang==='mr'?'mr':'en'}/>;
}
