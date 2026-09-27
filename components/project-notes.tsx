'use client';
import { useEffect, useState } from 'react';
export function ProjectNotes() {
 const [mr,setMr]=useState(false);
 useEffect(()=>setMr(new URLSearchParams(window.location.search).get('lang')==='mr'),[]);
 const notes=mr ? [
 ['चौकशीची माहिती','प्रकल्प फॉर्ममध्ये भरलेली माहिती WhatsApp मेसेज तयार करण्यासाठी वापरली जाते. मेसेज पाठवण्याआधी तुम्ही तो तपासू शकता. हा फॉर्म येथे चौकशीचा डेटाबेस तयार करत नाही.'],
 ['डेमो व तुमच्या निवडी','नमुना संवादातील उत्तरे ब्राउझरमध्ये तात्पुरती असतात. हालचाल नियंत्रण वापरून तुम्ही सजावटीचे अॅनिमेशन थांबवू शकता.'],
 ['WhatsApp व बाहेरील वेबसाइट्स','WhatsApp किंवा लाइव्ह डेमो उघडल्यावर तुम्ही या वेबसाइटमधून बाहेर जाता. त्या सेवांचे स्वतःचे गोपनीयता नियम लागू होतात. संवेदनशील वैयक्तिक किंवा आरोग्यविषयक माहिती नमुना संवादात देऊ नका.'],
 ['प्रकल्प सुरू करण्यापूर्वी','कामाची व्याप्ती, वेळ, बदलांच्या फेऱ्या, हस्तांतरण, सपोर्ट आणि आवश्यक बाहेरील साधने प्रस्तावात ठरवली जातील. या वेबसाइटवरील माहिती स्वतःहून करार किंवा निश्चित वेळेची हमी नाही.'],
 ['संकल्पना प्रकल्प','पोर्टफोलिओतील डेमो डिझाइन व संवाद दाखवतात. ते ग्राहकांचे समर्थन किंवा पडताळलेले व्यावसायिक परिणाम दर्शवत नाहीत.'],
 ['प्रश्न किंवा विनंती','तुमच्या चौकशीतील माहिती किंवा प्रकल्पाबद्दल प्रश्न असल्यास खालील WhatsApp लिंकवरून Dev शी संपर्क करा.']
 ] : [
 ['Your enquiry details','Details entered in the project form are used to prepare a WhatsApp message. You can review it before sending. The form does not create an enquiry database on this website.'],
 ['Demos and preferences','Sample conversation answers are temporary browser state. You can pause decorative motion using the motion control.'],
 ['WhatsApp and external websites','Opening WhatsApp or a live demo takes you to another service with its own privacy practices. Please keep sensitive personal or health information out of sample conversations.'],
 ['Before a project starts','Scope, timing, revision rounds, handover, support and any third-party tools will be agreed in the proposal. Information on this website is not itself a contract or a guaranteed delivery timeline.'],
 ['Concept projects','Portfolio demos illustrate design and interaction. They do not represent client endorsements or verified business results.'],
 ['Questions or requests','For questions about information you have shared in an enquiry or about a project, contact Dev using the WhatsApp link below.']
 ];
 return <main className="case-study page-shell" lang={mr?'mr':'en'}><nav className="case-nav"><a className="ghost-link" href="/">← {mr?'मुख्य पान':'Back to home'}</a><button className="ghost-link" onClick={()=>setMr(!mr)} aria-label={mr?'Switch to English':'Switch to Marathi'}>EN / मराठी</button></nav><header className="case-hero"><p className="label">{mr?'उपयुक्त माहिती':'GOOD TO KNOW'}</p><h1>{mr?'गोपनीयता व प्रकल्प.':'PRIVACY & PROJECT NOTES.'}</h1></header>{notes.map(([title,body],i)=><section className="case-story" key={i}><p className="label">0{i+1}</p><div><h2>{title}</h2><p>{body}</p></div></section>)}<footer className="case-footer"><a className="ghost-link" href="https://wa.me/917738400373" target="_blank" rel="noopener noreferrer">{mr?'Dev शी संपर्क करा':'Contact Dev'} ↗</a></footer></main>;
}
