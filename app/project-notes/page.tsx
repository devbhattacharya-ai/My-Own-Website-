import type { Metadata } from 'next';
import { ProjectNotes } from '@/components/project-notes';
export const metadata:Metadata={title:'Privacy & project notes | DEV / AI STUDIO',description:'How enquiries, sample conversations and project proposals work.',alternates:{canonical:'/project-notes'}};
export default function Page(){return <ProjectNotes/>;}
