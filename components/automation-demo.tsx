"use client";

import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";

export function AutomationDemo({ language = "en" }: { language?: "en" | "mr" }) {
  const mr = language === "mr";
  const [answers, setAnswers] = useState<number[]>([]);
  const [scenario, setScenario] = useState(0);
  const clinic = mr ? [
    { question: "नमस्कार! तुम्हाला कशासाठी भेट हवी आहे?", choices: ["नियमित तपासणी", "दातांची स्वच्छता", "उपचारांची माहिती"] },
    { question: "तुम्ही प्रथमच भेट देत आहात का?", choices: ["हो, पहिली भेट", "नाही, याआधी भेट दिली आहे"] },
    { question: "संपर्कासाठी कोणती वेळ सोयीची आहे?", choices: ["सकाळ", "दुपार", "संध्याकाळ"] },
  ] : [
    { question: "Hello! What would you like to enquire about?", choices: ["Routine check-up", "Teeth cleaning", "Treatment information"] },
    { question: "Will this be your first visit?", choices: ["Yes, first visit", "No, returning patient"] },
    { question: "When would you prefer a callback?", choices: ["Morning", "Afternoon", "Evening"] },
  ];
  const labels = mr ? ["क्लिनिक", "रेस्टॉरंट", "स्थानिक सेवा"] : ["Clinic", "Restaurant", "Local service"];
  const restaurant = mr ? [
    { question: "कशाबद्दल माहिती हवी आहे?", choices: ["मेनू पाहायचा आहे", "टेबलची चौकशी", "टेकअवे"] },
    { question: "किती जणांसाठी?", choices: ["१–२ जण", "३–४ जण", "५ किंवा अधिक"] },
    { question: "कधी हवे आहे?", choices: ["आज", "उद्या", "तारीख ठरलेली नाही"] },
  ] : [
    { question: "What can we help you with?", choices: ["Explore the menu", "Table enquiry", "Takeaway"] },
    { question: "How many people is this for?", choices: ["1–2 people", "3–4 people", "5 or more"] },
    { question: "When are you planning for?", choices: ["Today", "Tomorrow", "Just exploring"] },
  ];
  const service = mr ? [
    { question: "तुम्हाला काय हवे आहे?", choices: ["नवीन सेवेची चौकशी", "किंमतीचा अंदाज", "आधीच्या कामाबद्दल मदत"] },
    { question: "सेवा कुठे हवी आहे?", choices: ["खारघर", "नवी मुंबई", "इतर परिसर"] },
    { question: "कधी सुरू करायचे आहे?", choices: ["या आठवड्यात", "या महिन्यात", "आधी माहिती हवी आहे"] },
  ] : [
    { question: "What would you like help with?", choices: ["A new service", "A quote", "Help with existing work"] },
    { question: "Where do you need the service?", choices: ["Kharghar", "Navi Mumbai", "Another area"] },
    { question: "When would you like to start?", choices: ["This week", "This month", "Exploring options"] },
  ];
  const stages = [clinic, restaurant, service][scenario];
  const selectedAnswers = answers.map((choice, i) => stages[i].choices[choice]);
  const done = answers.length === stages.length;
  const message = `Hi Dev, I tried the ${labels[scenario]} automation simulation on your website. I would like to discuss a similar WhatsApp enquiry flow for my business.`;
  return <section id="automation-demo" className="page-shell section-space automation-section" aria-labelledby="automation-title">
    <div className="section-meta"><p className="label">{mr ? "प्रत्यक्ष अनुभव / इंटरॅक्टिव्ह डेमो" : "IN PRACTICE / INTERACTIVE DEMO"}</p><span className="label">{mr ? "कोणतीही वैयक्तिक माहिती नको" : "NO PERSONAL DETAILS NEEDED"}</span></div>
    <div className="automation-layout"><div className="automation-intro"><h2 id="automation-title">{mr ? "एक प्रश्न. स्पष्ट पुढची पायरी." : <>ONE ENQUIRY.<br />A CLEAR NEXT STEP.</>}</h2><p>{mr ? "ग्राहकाचा प्रश्न व्यवस्थित विनंतीमध्ये कसा बदलतो ते पाहा. व्यवसाय निवडा आणि छोटा नमुना संवाद करून पाहा." : "See how a customer question becomes an organised enquiry. Choose a business and try a short customer conversation."}</p><ol className="automation-steps">{(mr ? ["गरज समजून घ्या", "संबंधित माहिती विचारा", "टीमकडे विनंती पाठवा"] : ["Understand the enquiry", "Ask relevant questions", "Prepare a team handoff"]).map((s,i)=><li key={s} data-current={Math.min(answers.length,2) === i}><span>0{i+1}</span>{s}</li>)}</ol><p className="demo-disclaimer">{mr ? "हे ब्राउझरमधील सिम्युलेशन आहे. मेसेज पाठवला जात नाही, माहिती जतन होत नाही आणि अपॉइंटमेंट बुक होत नाही. प्रत्यक्ष सेवेसाठी स्वतंत्र WhatsApp सेटअप आवश्यक आहे." : "Browser simulation—not a connected WhatsApp bot. Nothing is sent or saved, and no appointment is booked. A live service requires a separate WhatsApp setup."}</p></div>
    <div className="conversation-panel"><div className="scenario-picker" role="group" aria-label={mr ? "व्यवसाय निवडा" : "Choose a business"}>{labels.map((label,i)=><button type="button" key={i} aria-pressed={scenario===i} onClick={()=>{setScenario(i);setAnswers([]);}}>{label}</button>)}</div><header><div><span className="label">{labels[scenario]} / {mr ? "नमुना संवाद" : "SAMPLE CONVERSATION"}</span><p>{mr ? "प्रश्नापासून विनंतीपर्यंत" : "From question to request"}</p></div><button type="button" className="ghost-link" onClick={()=>setAnswers([])} aria-label={mr ? "पुन्हा सुरू करा" : "Restart demo"}><RotateCcw size={18} /></button></header>
      <div className="conversation-log" role="log" aria-live="polite" aria-relevant="additions text">{stages.slice(0,Math.min(answers.length+1,3)).map((stage,i)=><div className="conversation-turn" key={i}><p className="chat-message"><small>{mr ? "स्वयंचलित उत्तर" : "AUTOMATED REPLY"}</small>{stage.question}</p>{answers[i] !== undefined && <p className="chat-message chat-customer"><small>{mr ? "तुम्ही" : "YOU"}</small>{selectedAnswers[i]}</p>}</div>)}{done && <div className="handoff-summary"><span className="label">{mr ? "विनंती तयार झाली" : "ENQUIRY READY FOR THE TEAM"}</span><h3>{mr ? "पुढची पायरी: वैयक्तिक संपर्क." : "Next: a human conversation."}</h3><p>{selectedAnswers.join(" · ")}</p><p>{mr ? "टीम उपलब्धता तपासून वेळ निश्चित करेल. ही फक्त डेमो विनंती आहे." : "The team would confirm availability and arrange the next step. This is a demo request only."}</p></div>}</div>
      {!done ? <div className="conversation-options" role="group" aria-label={stages[answers.length].question}>{stages[answers.length].choices.map((choice,choiceIndex)=><button type="button" key={choice} onClick={()=>setAnswers(previous=>previous.length === answers.length && previous.length < 3 ? [...previous,choiceIndex] : previous)}>{choice}<span aria-hidden="true">→</span></button>)}</div> : <div className="conversation-end"><a className="ghost-link" href={`https://wa.me/917738400373?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">{mr ? "Dev सोबत अशा सेवेबद्दल बोला" : "Discuss this flow with Dev"}<ArrowUpRight size={18}/></a><p>{mr ? "WhatsApp उघडेल. पाठवण्याआधी मेसेज तपासा." : "Opens WhatsApp. Review the message before sending."}</p></div>}
    </div></div>
  </section>;
}
