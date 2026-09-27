"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useStudioMotion } from "@/components/studio-motion";
import { ProjectSlider } from "@/components/project-slider";
import { AutomationDemo } from "@/components/automation-demo";

type Language = "en" | "mr";
const WHATSAPP_NUMBER = "917738400373";

const content = {
  en: {
    skip: "Skip to main content",
    nav: ["Services", "Work", "Process", "Contact"],
    talk: "Let's talk",
    eyebrow: "AI websites + WhatsApp automation",
    heroLine: "Turn visitors",
    heroAccent: "into real enquiries.",
    heroText:
      "Friendly, fast websites paired with smart WhatsApp journeys—so your business earns trust, captures intent and replies instantly.",
    start: "Plan your website",
    explore: "See how it works",
    trust: ["Strategy included", "Mobile-first", "Built for Indian businesses"],
    heroNotes: ["Looks credible", "Replies instantly", "Captures leads"],
    rail: ["DESIGN", "AUTOMATE", "CONVERT", "GROW"],
    problemLabel: "THE REAL PROBLEM",
    problem: "A slow website loses attention. A slow reply loses the lead.",
    problemResult: "So I connect both.",
    servicesKicker: "WHAT I BUILD",
    servicesHeading: "Two smart systems. One clear goal.",
    servicesAccent: "More growth.",
    services: [
      {
        title: "AI-powered websites",
        text: "Fast, modern websites designed to turn visitors into enquiries—not just sit online looking pretty.",
        items: ["Landing pages", "Business websites", "Appointment & lead flows"],
      },
      {
        title: "WhatsApp automation",
        text: "Automated conversations that answer questions, qualify leads and follow up while you focus on the business.",
        items: ["Instant lead replies", "FAQs & qualification", "Reminders & follow-ups"],
      },
    ],
    workKicker: "SELECTED DEMOS",
    workHeading: "See the work in action.",
    workText:
      "Three complete concept websites across service, hospitality and premium product brands—shown with an honest brief, build scope and verified features.",
    demoLabel: "CONCEPT CASE STUDY",
    caseLabels: ["BRIEF", "BUILD", "VERIFIED"],
    viewDemo: "View live demo",
    demos: [
      {
        title: "Bisi Bele",
        type: "South Indian café · Kharghar",
        text: "A warm, food-first website that brings the menu, story, location and ordering journey together.",
        tags: ["Restaurant website", "Menu discovery", "Order journey"],
        caseStudy: [
          "Make a local food brand easy to browse and order from a phone.",
          "Responsive café website with menu, story, location and ordering paths.",
          "Mobile-first layout · menu discovery · direct order action",
        ],
        image: "/demo-bisi-bele.jpg",
        url: "https://bisi-bele-kharghar.dev2404.chatgpt.site/",
      },
      {
        title: "Smile Dental Clinic",
        type: "Dental clinic · Kharghar",
        text: "A premium bilingual clinic experience with treatments, trust signals and a guided appointment flow.",
        tags: ["Clinic website", "EN + Marathi", "Appointment flow"],
        caseStudy: [
          "Turn treatment research into a clear, trust-led appointment journey.",
          "Bilingual clinic website with treatments, trust cues and guided booking.",
          "English + Marathi · treatment detail · future-date appointment flow",
        ],
        image: "/demo-smile-dental.jpg",
        url: "https://smile-dental-clinic-demo.dev2404.chatgpt.site/",
      },
      {
        title: "AFTERDARK",
        type: "Dark chocolate · Concept brand",
        text: "A cinematic, product-first website built around an 85% dark chocolate bar, tactile interaction and scroll-led storytelling.",
        tags: ["Luxury product website", "Scroll storytelling", "Interactive motion"],
        caseStudy: [
          "Give a concept chocolate brand the atmosphere of a premium product launch.",
          "Responsive product story with tactile interaction and scroll-led motion.",
          "85% cacao concept · reduced-motion fallback · responsive interaction",
        ],
        image: "/demo-afterdark.jpg",
        url: "https://afterdark-chocolate.dev2404.chatgpt.site/",
      },
    ],
    why: "WHY IT WORKS",
    whyHeading: "Less chasing. More useful conversations.",
    outcomes: [
      ["Look credible", "Give customers a clear, premium first impression on every screen."],
      ["Capture intent", "Guide visitors towards one simple action instead of making them search."],
      ["Reply instantly", "Keep warm leads moving even when you are busy or offline."],
    ],
    scopeKicker: "WHAT YOUR PROJECT INCLUDES",
    scopeHeading: "A clear build. A clear handover. No vague promises.",
    scopeText:
      "Your proposal defines the work before payment, so you know what is included, what happens next and which costs sit outside the project.",
    scopeItems: [
      ["Focused website", "Responsive pages, clear copy structure and one primary enquiry action."],
      ["Lead-ready WhatsApp flow", "Prepared enquiry messages and qualifying questions designed around your business."],
      ["Launch & handover", "Launch guidance, final project files and account ownership agreed in writing."],
      ["Scope before payment", "Timeline, revision rounds, support and any paid tools confirmed in your proposal."],
    ],
    scopeNote:
      "Domain, hosting, WhatsApp Business Platform/API usage and paid third-party tools are separate when your project needs them.",
    processKicker: "A SIMPLE PROCESS",
    processHeading: "From idea to live—without the tech headache.",
    steps: [
      ["Understand", "A short call to map your business, customers and the result you need."],
      ["Build", "Your website and WhatsApp flow are designed, written and connected."],
      ["Launch", "You review the experience, then we go live with a clean handover."],
    ],
    faqKicker: "CLEAR ANSWERS",
    faqHeading: "Know what you are agreeing to before we begin.",
    faqs: [
      [
        "What will I receive?",
        "Before work begins, your proposal lists the pages, website features, WhatsApp flow, copy responsibilities, integrations and handover items included in your project.",
      ],
      [
        "How long will the project take?",
        "Timing depends on the page count, content readiness and automation complexity. You receive a written delivery timeline before payment.",
      ],
      [
        "How do revisions work?",
        "Revision rounds and what counts as a revision are defined in the proposal, so the scope stays clear for both of us.",
      ],
      [
        "Will I own the website?",
        "Ownership of the approved final files and the accounts used for your domain, hosting and tools is confirmed in the proposal and handover.",
      ],
      [
        "Are there additional costs?",
        "Domain, hosting, WhatsApp Business Platform/API usage and paid third-party tools are separate when required. Every known cost is disclosed before you approve the project.",
      ],
      [
        "How is payment handled?",
        "The proposal lists the payment amount, milestones and due dates. Work begins only after you approve the scope and the agreed first payment is received.",
      ],
      [
        "What happens after launch?",
        "Your proposal states the launch-support period and any ongoing update or maintenance plan. Continued support is included only when it is written into the scope.",
      ],
    ],
    ready: "READY WHEN YOU ARE",
    contactHeading: "Let’s make your business easier to choose.",
    contactText:
      "Tell me what you sell and where you're getting stuck. I’ll help you find the simplest useful solution.",
    whatsapp: "Chat with Dev on WhatsApp",
    footer: "AI websites & WhatsApp automation for growing businesses.",
    top: "Back to top ↑",
    assistantAsk: "Ask the assistant",
    assistantOnline: "Instant project guide",
    assistantLabel: "AI PROJECT ASSISTANT",
    assistantTitle: "What can I help you build?",
    assistantDescription: "Answer three quick questions and I’ll prepare your WhatsApp enquiry.",
    assistantNeedPrompt: "What do you need help with?",
    assistantNeeds: ["A new business website", "Website redesign", "WhatsApp automation", "Website + automation"],
    assistantTimelinePrompt: "When would you like to get started?",
    assistantTimelines: ["As soon as possible", "Within 2–4 weeks", "Just exploring"],
    assistantDetailsPrompt: "Last step — where can Dev reach you?",
    assistantName: "Your name",
    assistantPhone: "Your phone number",
    assistantPrepare: "Continue on WhatsApp",
    assistantBack: "Back",
    assistantDisclaimer: "No spam. Your details stay in this browser until you continue on WhatsApp.",
    assistantStepLabel: "Step",
  },
  mr: {
    skip: "मुख्य मजकुराकडे जा",
    nav: ["सेवा", "काम", "प्रक्रिया", "संपर्क"],
    talk: "बोलूया",
    eyebrow: "AI वेबसाइट्स + WhatsApp ऑटोमेशन",
    heroLine: "अधिक भेट देणाऱ्यांना",
    heroAccent: "खऱ्या चौकशीत बदला.",
    heroText:
      "आकर्षक, वेगवान वेबसाइट आणि स्मार्ट WhatsApp प्रवास—जेणेकरून तुमचा व्यवसाय विश्वास मिळवेल, गरज ओळखेल आणि त्वरित प्रतिसाद देईल.",
    start: "तुमची वेबसाइट ठरवा",
    explore: "हे कसे चालते ते पाहा",
    trust: ["रणनीती समाविष्ट", "मोबाइल-फर्स्ट", "भारतीय व्यवसायांसाठी"],
    heroNotes: ["विश्वासार्ह दिसा", "त्वरित उत्तर", "लीड मिळवा"],
    rail: ["डिझाइन", "ऑटोमेशन", "रूपांतरण", "वाढ"],
    problemLabel: "खरी समस्या",
    problem: "संथ वेबसाइट लक्ष गमावते. संथ प्रतिसाद ग्राहक गमावतो.",
    problemResult: "म्हणून मी दोन्ही जोडतो.",
    servicesKicker: "मी काय तयार करतो",
    servicesHeading: "दोन स्मार्ट व्यवस्था. एक स्पष्ट ध्येय.",
    servicesAccent: "अधिक वाढ.",
    services: [
      {
        title: "AI-सक्षम वेबसाइट्स",
        text: "वेगवान, आधुनिक वेबसाइट्स ज्या फक्त सुंदर दिसत नाहीत—तर भेट देणाऱ्यांना चौकशीकडे वळवतात.",
        items: ["लँडिंग पेजेस", "व्यवसाय वेबसाइट्स", "अपॉइंटमेंट आणि लीड फ्लो"],
      },
      {
        title: "WhatsApp ऑटोमेशन",
        text: "तुम्ही व्यवसायावर लक्ष देत असताना प्रश्नांची उत्तरे देणारे, लीड्स पात्र ठरवणारे आणि पाठपुरावा करणारे संवाद.",
        items: ["त्वरित लीड प्रतिसाद", "वारंवार प्रश्न आणि पात्रता", "स्मरणपत्रे आणि पाठपुरावा"],
      },
    ],
    workKicker: "निवडक डेमो",
    workHeading: "माझे काम प्रत्यक्ष पाहा.",
    workText:
      "सेवा, हॉस्पिटॅलिटी आणि प्रीमियम उत्पादन ब्रँडसाठी तीन संपूर्ण संकल्पना वेबसाइट्स—प्रत्येकासोबत स्पष्ट उद्देश, कामाची व्याप्ती आणि तपासलेली वैशिष्ट्ये.",
    demoLabel: "संकल्पना केस स्टडी",
    caseLabels: ["उद्देश", "निर्मिती", "तपासलेले"],
    viewDemo: "लाइव्ह डेमो पाहा",
    demos: [
      {
        title: "Bisi Bele",
        type: "दक्षिण भारतीय कॅफे · खारघर",
        text: "मेनू, ब्रँडची गोष्ट, लोकेशन आणि ऑर्डरचा प्रवास एकत्र आणणारी उबदार वेबसाइट.",
        tags: ["रेस्टॉरंट वेबसाइट", "मेनू शोध", "ऑर्डर प्रवास"],
        caseStudy: [
          "स्थानिक फूड ब्रँड मोबाइलवर सहज पाहता आणि ऑर्डर करता येईल असा अनुभव तयार करणे.",
          "मेनू, ब्रँडची गोष्ट, लोकेशन आणि ऑर्डर मार्गांसह रिस्पॉन्सिव्ह कॅफे वेबसाइट.",
          "मोबाइल-फर्स्ट मांडणी · मेनू शोध · थेट ऑर्डर कृती",
        ],
        image: "/demo-bisi-bele.jpg",
        url: "https://bisi-bele-kharghar.dev2404.chatgpt.site/",
      },
      {
        title: "Smile Dental Clinic",
        type: "डेंटल क्लिनिक · खारघर",
        text: "उपचार, विश्वासाची माहिती आणि मार्गदर्शित अपॉइंटमेंट फ्लोसह द्विभाषिक क्लिनिक अनुभव.",
        tags: ["क्लिनिक वेबसाइट", "इंग्रजी + मराठी", "अपॉइंटमेंट फ्लो"],
        caseStudy: [
          "उपचारांची माहिती शोधणाऱ्या व्यक्तीला विश्वासार्ह अपॉइंटमेंट प्रवास देणे.",
          "उपचार, विश्वास संकेत आणि मार्गदर्शित बुकिंगसह द्विभाषिक क्लिनिक वेबसाइट.",
          "इंग्रजी + मराठी · उपचार माहिती · भविष्यातील तारखेची अपॉइंटमेंट",
        ],
        image: "/demo-smile-dental.jpg",
        url: "https://smile-dental-clinic-demo.dev2404.chatgpt.site/",
      },
      {
        title: "AFTERDARK",
        type: "डार्क चॉकलेट · संकल्पना ब्रँड",
        text: "८५% डार्क चॉकलेट बारभोवती तयार केलेली सिनेमॅटिक वेबसाइट—टॅक्टाइल मोशन आणि स्क्रोल स्टोरीटेलिंगसह.",
        tags: ["लक्झरी प्रॉडक्ट वेबसाइट", "स्क्रोल स्टोरीटेलिंग", "इंटरॅक्टिव्ह मोशन"],
        caseStudy: [
          "संकल्पना चॉकलेट ब्रँडला प्रीमियम प्रॉडक्ट लाँचसारखा अनुभव देणे.",
          "टॅक्टाइल इंटरॅक्शन आणि स्क्रोल-आधारित मोशनसह रिस्पॉन्सिव्ह प्रॉडक्ट स्टोरी.",
          "८५% कोको संकल्पना · कमी मोशन पर्याय · रिस्पॉन्सिव्ह इंटरॅक्शन",
        ],
        image: "/demo-afterdark.jpg",
        url: "https://afterdark-chocolate.dev2404.chatgpt.site/",
      },
    ],
    why: "हे का प्रभावी आहे",
    whyHeading: "कमी पाठपुरावा. अधिक उपयुक्त संवाद.",
    outcomes: [
      ["विश्वास निर्माण करा", "प्रत्येक स्क्रीनवर ग्राहकांना स्पष्ट आणि प्रीमियम पहिली छाप द्या."],
      ["गरज ओळखा", "भेट देणाऱ्यांना एका सोप्या कृतीकडे मार्गदर्शन करा."],
      ["त्वरित उत्तर द्या", "तुम्ही व्यस्त किंवा ऑफलाइन असतानाही इच्छुक ग्राहकांशी संवाद सुरू ठेवा."],
    ],
    scopeKicker: "तुमच्या प्रोजेक्टमध्ये काय समाविष्ट आहे",
    scopeHeading: "स्पष्ट काम. स्पष्ट हस्तांतरण. अस्पष्ट आश्वासने नाहीत.",
    scopeText:
      "पेमेंटपूर्वी प्रस्तावात कामाची व्याप्ती स्पष्ट केली जाते, त्यामुळे काय समाविष्ट आहे, पुढे काय होईल आणि कोणते खर्च वेगळे आहेत हे तुम्हाला माहीत असते.",
    scopeItems: [
      ["लक्ष्यित वेबसाइट", "रिस्पॉन्सिव्ह पेजेस, स्पष्ट मजकूर रचना आणि चौकशीसाठी एक मुख्य कृती."],
      ["लीडसाठी तयार WhatsApp फ्लो", "तुमच्या व्यवसायानुसार चौकशी संदेश आणि पात्रता प्रश्न."],
      ["लाँच आणि हस्तांतरण", "लाँच मार्गदर्शन, अंतिम प्रोजेक्ट फाइल्स आणि अकाउंट मालकी लेखी स्वरूपात."],
      ["पेमेंटपूर्वी स्पष्ट व्याप्ती", "वेळापत्रक, दुरुस्ती फेऱ्या, सपोर्ट आणि सशुल्क टूल्स प्रस्तावात निश्चित."],
    ],
    scopeNote:
      "तुमच्या प्रोजेक्टला आवश्यक असल्यास डोमेन, होस्टिंग, WhatsApp Business Platform/API वापर आणि सशुल्क तृतीय-पक्ष टूल्सचे शुल्क वेगळे असेल.",
    processKicker: "सोपी प्रक्रिया",
    processHeading: "कल्पनेपासून लाइव्हपर्यंत—तांत्रिक त्रासाशिवाय.",
    steps: [
      ["समजून घेणे", "तुमचा व्यवसाय, ग्राहक आणि अपेक्षित परिणाम समजण्यासाठी एक छोटा कॉल."],
      ["निर्मिती", "तुमची वेबसाइट आणि WhatsApp फ्लो डिझाइन, लेखन आणि कनेक्ट केले जातात."],
      ["लाँच", "तुम्ही अनुभव तपासल्यानंतर आम्ही वेबसाइट लाइव्ह करून स्पष्ट हस्तांतरण करतो."],
    ],
    faqKicker: "स्पष्ट उत्तरे",
    faqHeading: "काम सुरू करण्यापूर्वी तुम्ही कशाला मान्यता देत आहात ते जाणून घ्या.",
    faqs: [
      [
        "मला नेमके काय मिळेल?",
        "काम सुरू होण्यापूर्वी प्रस्तावात पेजेस, वेबसाइट फीचर्स, WhatsApp फ्लो, मजकुराची जबाबदारी, इंटिग्रेशन्स आणि हस्तांतरणात मिळणाऱ्या गोष्टी स्पष्ट केल्या जातील.",
      ],
      [
        "प्रोजेक्ट पूर्ण होण्यासाठी किती वेळ लागतो?",
        "वेळ पेजेसची संख्या, मजकूर तयार असणे आणि ऑटोमेशनची गुंतागुंत यावर अवलंबून असते. पेमेंटपूर्वी तुम्हाला लेखी वेळापत्रक मिळेल.",
      ],
      [
        "दुरुस्त्या कशा केल्या जातात?",
        "दुरुस्तीच्या फेऱ्या आणि दुरुस्तीमध्ये नेमके काय समाविष्ट आहे हे प्रस्तावात स्पष्ट केले जाईल.",
      ],
      [
        "वेबसाइटची मालकी माझ्याकडे असेल का?",
        "मंजूर अंतिम फाइल्स आणि डोमेन, होस्टिंग व टूल्ससाठी वापरलेल्या अकाउंट्सची मालकी प्रस्ताव आणि हस्तांतरणात स्पष्ट केली जाईल.",
      ],
      [
        "अतिरिक्त खर्च असतील का?",
        "आवश्यक असल्यास डोमेन, होस्टिंग, WhatsApp Business Platform/API वापर आणि सशुल्क टूल्स वेगळे असतील. मान्यता देण्यापूर्वी सर्व ज्ञात खर्च सांगितले जातील.",
      ],
      [
        "पेमेंट कसे केले जाईल?",
        "प्रस्तावात पेमेंटची रक्कम, टप्पे आणि देय तारखा दिल्या जातील. तुम्ही कामाची व्याप्ती मंजूर केल्यानंतर आणि ठरलेले पहिले पेमेंट मिळाल्यानंतरच काम सुरू होईल.",
      ],
      [
        "लाँचनंतर काय होईल?",
        "प्रस्तावात लाँचनंतरच्या सपोर्टचा कालावधी आणि पुढील अपडेट किंवा देखभाल योजना नमूद केली जाईल. सततचा सपोर्ट लेखी व्याप्तीत असल्यासच समाविष्ट असेल.",
      ],
    ],
    ready: "तुम्ही तयार असाल तेव्हा",
    contactHeading: "तुमचा व्यवसाय निवडणे सोपे करूया.",
    contactText:
      "तुम्ही काय विकता आणि कुठे अडचण येते ते सांगा. मी तुम्हाला सर्वात सोपा आणि उपयुक्त उपाय शोधण्यात मदत करेन.",
    whatsapp: "Dev सोबत WhatsApp वर बोला",
    footer: "वाढत्या व्यवसायांसाठी AI वेबसाइट्स आणि WhatsApp ऑटोमेशन.",
    top: "वर जा ↑",
    assistantAsk: "असिस्टंटला विचारा",
    assistantOnline: "त्वरित प्रोजेक्ट मार्गदर्शक",
    assistantLabel: "AI प्रोजेक्ट असिस्टंट",
    assistantTitle: "मी तुम्हाला काय तयार करण्यात मदत करू?",
    assistantDescription: "तीन छोटे प्रश्नांची उत्तरे द्या आणि मी तुमची WhatsApp चौकशी तयार करेन.",
    assistantNeedPrompt: "तुम्हाला कशासाठी मदत हवी आहे?",
    assistantNeeds: ["नवीन व्यवसाय वेबसाइट", "वेबसाइट रीडिझाइन", "WhatsApp ऑटोमेशन", "वेबसाइट + ऑटोमेशन"],
    assistantTimelinePrompt: "तुम्हाला कधी सुरू करायचे आहे?",
    assistantTimelines: ["शक्य तितक्या लवकर", "२–४ आठवड्यांत", "सध्या फक्त माहिती घेत आहे"],
    assistantDetailsPrompt: "शेवटची पायरी — Dev तुमच्याशी कुठे संपर्क करू शकतो?",
    assistantName: "तुमचे नाव",
    assistantPhone: "तुमचा फोन नंबर",
    assistantPrepare: "WhatsApp वर पुढे जा",
    assistantBack: "मागे",
    assistantDisclaimer: "स्पॅम नाही. तुम्ही WhatsApp वर पुढे जाईपर्यंत तुमची माहिती या ब्राउझरमध्येच राहते.",
    assistantStepLabel: "पायरी",
  },
} as const;

const editorial = {
  en: {
    hero: ["GOOD DESIGN.", "REAL", "CONVERSATIONS."],
    heroText: "AI-powered websites and WhatsApp automation. Built to make your business easier to choose — and easier to reach.",
    location: "KHARGHAR, INDIA / WORKING EVERYWHERE",
    viewWork: "Explore the work", start: "Start a conversation", scroll: "Scroll to explore",
    introLabel: "INDEPENDENT STUDIO.\nCONNECTED THINKING.",
    intro: "Your website makes the first impression. What happens next matters just as much.",
    introBody: "I’m Devroop. I build websites and WhatsApp journeys that turn interest into enquiries. You work directly with me—from idea to launch.",
    approach: "What I can build", workTitle: ["A FEW IDEAS.", "MADE REAL."],
    workText: "Three concept websites. Different businesses, the same attention to how people discover, explore and enquire.",
    depthTitle: ["IDEAS INTO", "EXPERIENCES."], depthNote: "DESIGN + TECHNOLOGY, WORKING TOGETHER.", depthLink: "Explore the services",
    workNote: "CONCEPT WORK / EXPLORE THE LIVE SITES", project: "PROJECT", details: "The project in detail",
    servicesTitle: ["GOOD ON THEIR OWN.", "BETTER TOGETHER."],
    servicesText: "A website that earns attention. A conversation that moves it forward.",
    outcomesTitle: "Designed around the next step.",
    processTitle: ["FROM FIRST IDEA", "TO OPEN FOR BUSINESS."],
    scopeTitle: "Every detail, agreed.", faqTitle: ["BEFORE", "WE BEGIN."],
    contactTitle: ["LET’S MAKE", "SOMETHING", "USEFUL."],
    call: "Call Dev", phone: "+91 77384 00373", guide: "Plan your project", close: "Close project guide",
    studio: "Independent web & automation studio", made: "BASED IN KHARGHAR / BUILT FOR YOUR BUSINESS",
    phoneError: "Enter a valid phone number with 10–15 digits.", nameError: "Please enter your name.",
    assistantLabel: "PROJECT GUIDE", assistantTitle: "Let’s find your starting point.",
  },
  mr: {
    hero: ["उत्तम डिझाइन.", "अर्थपूर्ण", "संवाद."],
    heroText: "AI-सक्षम वेबसाइट्स आणि WhatsApp ऑटोमेशन. तुमचा व्यवसाय निवडणे आणि तुमच्याशी संपर्क साधणे सोपे करण्यासाठी.",
    location: "खारघर, भारत / सर्वत्र सेवा",
    viewWork: "माझे काम पाहा", start: "संवाद सुरू करूया", scroll: "पुढे पाहा",
    introLabel: "स्वतंत्र स्टुडिओ.\nएकत्रित विचार.",
    intro: "तुमची वेबसाइट पहिली छाप पाडते. त्यानंतरचा संवादही तितकाच महत्त्वाचा असतो.",
    introBody: "मी देवरूप. व्यवसायाला मिळणाऱ्या उत्सुकतेचे चौकशीत रूपांतर करणाऱ्या वेबसाइट्स आणि WhatsApp प्रवास मी तयार करतो. कल्पनेपासून लाँचपर्यंत तुम्ही थेट माझ्यासोबत काम करता.",
    approach: "मी काय तयार करतो", workTitle: ["काही कल्पना.", "प्रत्यक्षात उतरलेल्या."],
    workText: "तीन संकल्पना वेबसाइट्स. व्यवसाय वेगळे, पण ग्राहकांना माहिती शोधणे आणि चौकशी करणे सोपे व्हावे हेच ध्येय.",
    depthTitle: ["कल्पनांपासून", "अनुभवापर्यंत."], depthNote: "डिझाइन + तंत्रज्ञान, एकत्र काम करणारे.", depthLink: "सेवा पाहा",
    workNote: "संकल्पना प्रोजेक्ट्स / लाइव्ह वेबसाइट्स पाहा", project: "प्रोजेक्ट", details: "प्रोजेक्टची माहिती",
    servicesTitle: ["दोन उपयुक्त सेवा.", "एकत्र अधिक प्रभावी."],
    servicesText: "लक्ष वेधणारी वेबसाइट. पुढची पायरी सोपी करणारा संवाद.",
    outcomesTitle: "पुढची पायरी सोपी करण्यासाठी.",
    processTitle: ["पहिल्या कल्पनेपासून", "व्यवसायाच्या लाँचपर्यंत."],
    scopeTitle: "प्रत्येक तपशील, आधीच ठरलेला.", faqTitle: ["सुरुवात", "करण्यापूर्वी."],
    contactTitle: ["काहीतरी", "उपयुक्त", "घडवूया."],
    call: "Dev ला कॉल करा", phone: "+91 77384 00373", guide: "प्रोजेक्ट ठरवा", close: "प्रोजेक्ट मार्गदर्शक बंद करा",
    studio: "स्वतंत्र वेब आणि ऑटोमेशन स्टुडिओ", made: "खारघरमध्ये स्थित / तुमच्या व्यवसायासाठी",
    phoneError: "१०–१५ अंकांचा वैध फोन नंबर द्या.", nameError: "कृपया तुमचे नाव द्या.",
    assistantLabel: "प्रोजेक्ट मार्गदर्शक", assistantTitle: "सुरुवात कुठून करायची ते ठरवूया.",
  },
} as const;

function MotionLines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => <span className="motion-mask" key={index}><span className="motion-line">{line}</span></span>);
}

function RollingLabel({ children }: { children: string }) {
  return <span className="rolling-label"><span>{children}</span><span aria-hidden="true">{children}</span></span>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantStep, setAssistantStep] = useState(0);
  const [assistantNeed, setAssistantNeed] = useState(0);
  const [assistantTimeline, setAssistantTimeline] = useState(0);
  const [assistantName, setAssistantName] = useState("");
  const [assistantPhone, setAssistantPhone] = useState("");
  const [formError, setFormError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const motionEnabled = motionReady && !reducedMotion && !motionPaused;
  const copy = content[language];
  const text = editorial[language];
  useStudioMotion(root, language, motionEnabled, assistantOpen);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    setMotionReady(true);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    // A new visit always starts in English. Old preferences must not override the visible switch.
    if (new URLSearchParams(window.location.search).get("lang") === "mr") setLanguage("mr");
    try {
      window.localStorage.removeItem("dev-ai-language");
      window.localStorage.removeItem("dev-ai-theme");
    } catch { /* The page also works when browser storage is unavailable. */ }
  }, []);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(language === "mr"
    ? "नमस्कार Dev, मला माझ्या व्यवसायासाठी AI वेबसाइट किंवा WhatsApp ऑटोमेशनबद्दल चर्चा करायची आहे."
    : "Hi Dev, I want to discuss an AI website or WhatsApp automation for my business.")}`;

  function completeAssistant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = assistantPhone.replace(/\D/g, "");
    if (!assistantName.trim()) { setFormError(text.nameError); return; }
    if (digits.length < 10 || digits.length > 15) { setFormError(text.phoneError); return; }
    setFormError("");
    const message = [
      language === "mr" ? "नमस्कार Dev," : "Hi Dev,",
      language === "mr" ? "मी वेबसाइट प्रोजेक्ट मार्गदर्शक वापरला आणि मला माझ्या व्यवसायाबद्दल चर्चा करायची आहे." : "I used the website project guide and would like to discuss my business.",
      "",
      `${language === "mr" ? "नाव" : "Name"}: ${assistantName.trim()}`,
      `${language === "mr" ? "फोन" : "Phone"}: ${assistantPhone.trim()}`,
      `${language === "mr" ? "गरज" : "Project need"}: ${copy.assistantNeeds[assistantNeed]}`,
      `${language === "mr" ? "सुरू करण्याची वेळ" : "Preferred start"}: ${copy.assistantTimelines[assistantTimeline]}`,
      "",
      language === "mr" ? "कृपया पुढील पायऱ्यांबद्दल मला सांगा." : "Please tell me the best next step.",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const toggleLanguage = () => { setLanguage(current => current === "en" ? "mr" : "en"); setFormError(""); };

  function toggleMotion() {
    const sections = Array.from(root.current?.querySelectorAll<HTMLElement>(".hero-scroll, main > section, .site-footer") ?? []);
    const anchor = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.45;
    });
    const oldTop = anchor?.matches(".hero-scroll, .depth-scene") ? 0 : anchor?.getBoundingClientRect().top;
    setMotionPaused(value => !value);
    // The compact fallback removes pinned distance. Keep the reader in the same section.
    requestAnimationFrame(() => {
      if (anchor && oldTop !== undefined) {
        window.scrollBy({ top: anchor.getBoundingClientRect().top - oldTop, behavior: "instant" });
      }
    });
  }

  return (
    <div ref={root} className="site-frame" data-language={language} data-motion={motionEnabled ? "on" : "off"} id="top">
      <div className="studio-cursor" aria-hidden="true" />
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <header className="site-header page-shell">
        <a className="brand" href="#top" aria-label="Dev AI Studio home"><span className="brand-symbol" aria-hidden="true">D<span>✦</span></span><span>DEV /<br />AI STUDIO</span></a>
        <nav className="main-nav" aria-label={language === "mr" ? "मुख्य नेव्हिगेशन" : "Main navigation"}>
          <a href="#work"><RollingLabel>{copy.nav[1]}</RollingLabel></a><a href="#services"><RollingLabel>{copy.nav[0]}</RollingLabel></a><a href="#automation-demo"><RollingLabel>{language === "mr" ? "डेमो" : "Demo"}</RollingLabel></a><a href={`/pricing${language === "mr" ? "?lang=mr" : ""}`}><RollingLabel>{language === "mr" ? "किंमत" : "Pricing"}</RollingLabel></a>
        </nav>
        <div className="header-actions">
          <button type="button" className="language-switch" onClick={toggleLanguage} aria-label={language === "en" ? "Switch to Marathi" : "Switch to English"} aria-pressed={language === "mr"}>
            <span className={language === "en" ? "selected" : ""}>EN</span><span className="language-divider" aria-hidden="true">/</span><span lang="mr" className={language === "mr" ? "selected" : ""}>मराठी</span>
          </button>
          <a className="ghost-link header-contact" href="#contact">{copy.talk}<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <div className="hero-scroll">
        <section className="hero page-shell" aria-labelledby="hero-title">
          <div className="hero-topline"><p className="label">{copy.eyebrow}</p><p className="label hero-location">{text.location}</p></div>
          <div className="hero-stage">
            <div className="hero-orbit" aria-hidden="true">
              <span className="orbit-ring ring-outer" /><span className="orbit-ring ring-inner" />
              <div className="orb-scroll"><div className="orb-pointer"><div className="orb-surface"><span className="iridescent-sphere" /><span className="sphere-sheen" /></div></div></div>
            </div>
            <h1 id="hero-title" className="hero-title" aria-label={text.hero.join(" ")}>{text.hero.map((line, index) => <span key={index} className={`hero-line hero-line-${index}`} aria-hidden="true"><span className="hero-line-mask">{(language === "en" ? Array.from(line) : [line]).map((character, i) => <span className="hero-character" key={i}>{character === " " ? "\u00a0" : character}</span>)}</span></span>)}</h1>
            <span className="hero-coordinate label" aria-hidden="true">DESIGN + AUTOMATE</span>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="ghost-link hero-work">{text.viewWork}<ArrowDown aria-hidden="true" /></a>
            <div className="hero-summary"><p>{text.heroText}</p><a className="ghost-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{text.start}<ArrowUpRight aria-hidden="true" /></a></div>
            <a href="#about" className="scroll-indicator label">{text.scroll}<ArrowDown aria-hidden="true" /></a>
          </div>
        </section>

        </div>

        <section className="intro-section page-shell section-space" id="about">
          <div className="intro-aside"><p className="label">{text.introLabel}</p><a className="ghost-link" href="#services">{text.approach}<ArrowRight aria-hidden="true" /></a></div>
          <div className="intro-copy"><h2 aria-label={text.intro}>{text.intro.split(" ").map((word, i) => <span className="statement-word" aria-hidden="true" key={i}>{word} </span>)}</h2><p className="reveal">{text.introBody}</p></div>
        </section>

        <section className="work-section page-shell section-space" id="work" aria-labelledby="work-title">
          <div className="section-meta"><p className="label">01 / {copy.workKicker}</p><span className="label">2026</span></div>
          <header className="section-heading reveal"><h2 id="work-title" className="display-heading"><MotionLines lines={text.workTitle} /></h2><p>{text.workText}</p></header>
          <ProjectSlider demos={copy.demos} language={language} motionEnabled={motionEnabled} demoLabel={copy.demoLabel} viewDemo={copy.viewDemo} details={text.details} caseLabels={copy.caseLabels} />
          <p className="work-footnote label">{text.workNote}</p>
        </section>

        <section className="depth-scene section-space" aria-labelledby="depth-title">
          <div className="depth-viewport">
            <div className="depth-title"><p className="label">{text.depthNote}</p><h2 id="depth-title">{text.depthTitle.map(line => <span key={line}>{line}</span>)}</h2></div>
            <div className="depth-gallery">
            <div className="depth-grid" aria-hidden="true">
              {[0, 1, 2, 1, 2, 0].map((demoIndex, index) => <figure className={`depth-tile depth-tile-${index}`} key={index}><img src={copy.demos[demoIndex].image} alt="" width="1200" height="750" loading="lazy" /><figcaption className="label">0{demoIndex + 1} / {copy.demos[demoIndex].title}</figcaption></figure>)}
            </div>
            </div>
            <div className="depth-endnote"><span className="label">{text.depthNote}</span><a className="ghost-link" href="#services">{text.depthLink}<ArrowDown aria-hidden="true" /></a></div>
            <span className="depth-coordinate label" aria-hidden="true">DEV / AI STUDIO — DESIGN IN EVERY DIMENSION</span>
          </div>
        </section>

        <section className="services-section page-shell section-space" id="services" aria-labelledby="services-title">
          <div className="section-meta"><p className="label">02 / {copy.servicesKicker}</p><span className="label">WEB + WHATSAPP</span></div>
          <header className="section-heading reveal"><h2 id="services-title" className="display-heading"><MotionLines lines={text.servicesTitle} /></h2><p>{text.servicesText}</p></header>
          <div className="service-list">{copy.services.map((service, index) => <article className="service-row" key={service.title}><span className="label service-number">0{index + 1}</span><h3>{service.title}</h3><div className="service-copy"><p>{service.text}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ghost-link">{text.start}<ArrowUpRight aria-hidden="true" /></a></div></article>)}</div>
          <a className="ghost-link services-pricing-link" href={`/pricing${language === "mr" ? "?lang=mr" : ""}`}>{language === "mr" ? "सेवांच्या किंमती पाहा" : "See starting prices"}<ArrowUpRight aria-hidden="true" /></a>
          <div className="outcomes-block reveal"><p className="label">{copy.why}</p><h3>{text.outcomesTitle}</h3><div className="outcomes-grid">{copy.outcomes.map(([title, description], index) => <div key={title}><span className="label">0{index + 1}</span><h4>{title}</h4><p>{description}</p></div>)}</div></div>
        </section>

        <AutomationDemo language={language} />

        <section className="process-section page-shell section-space" id="process" aria-labelledby="process-title">
          <div className="section-meta"><p className="label">03 / {copy.processKicker}</p><span className="label">{language === "en" ? "DIRECT. COLLABORATIVE. CLEAR." : "थेट. एकत्रित. स्पष्ट."}</span></div>
          <header className="section-heading reveal"><h2 id="process-title" className="display-heading"><MotionLines lines={text.processTitle} /></h2></header>
          <div className="process-grid">{copy.steps.map(([title, description], index) => <article className="process-step reveal" key={title}><span className="process-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          <div className="scope-layout reveal" id="scope"><header><p className="label">{copy.scopeKicker}</p><h3>{text.scopeTitle}</h3><p>{copy.scopeText}</p></header><div className="scope-list">{copy.scopeItems.map(([title, description]) => <div key={title}><h4>{title}</h4><p>{description}</p></div>)}<p className="scope-note">{copy.scopeNote}</p></div></div>
        </section>

        <section className="faq-section page-shell section-space reveal" aria-labelledby="faq-title">
          <div className="faq-intro"><p className="label">04 / {copy.faqKicker}</p><h2 id="faq-title" className="display-heading"><MotionLines lines={text.faqTitle} /></h2></div>
          <Accordion className="faq-accordion" type="single" collapsible>{copy.faqs.map(([question, answer], index) => <AccordionItem className="faq-item" key={index} value={`faq-${index}`}><AccordionTrigger className="faq-trigger"><span><small className="label">0{index + 1}</small>{question}</span></AccordionTrigger><AccordionContent className="faq-content"><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion>
        </section>

        <section className="contact-section page-shell section-space" id="contact" aria-labelledby="contact-title">
          <div className="section-meta"><p className="label">05 / {copy.ready}</p></div>
          <div className="contact-layout reveal"><h2 id="contact-title" className="contact-title"><MotionLines lines={text.contactTitle} /></h2><div className="contact-aside"><div className="contact-mark" aria-hidden="true"><span className="contact-colour"><span className="iridescent-sphere" /><span className="sphere-sheen" /></span></div><p>{copy.contactText}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ghost-link contact-whatsapp">{copy.whatsapp}<ArrowUpRight aria-hidden="true" /></a><a className="ghost-link" href={`tel:+${WHATSAPP_NUMBER}`}><Phone aria-hidden="true" />{text.call}<span>{text.phone}</span></a></div></div>
        </section>
      </main>

      <footer className="site-footer page-shell"><a className="footer-wordmark" href="#top"><span className="footer-wordmark-inner">DEV / AI STUDIO</span></a><div className="footer-bottom"><p>{text.studio}</p><div className="footer-controls"><a className="ghost-link" href={`/pricing${language === "mr" ? "?lang=mr" : ""}`}>{language === "mr" ? "किंमत" : "Pricing"}</a><a className="ghost-link" href={`/project-notes?lang=${language}`}>{language === "mr" ? "गोपनीयता व प्रकल्प" : "Privacy & project notes"}</a><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={language === "en" ? "Switch to Marathi" : "Switch to English"} aria-pressed={language === "mr"}><span className={language === "en" ? "selected" : ""}>EN</span><span aria-hidden="true">/</span><span lang="mr" className={language === "mr" ? "selected" : ""}>मराठी</span></button><a className="ghost-link" href="#top">{copy.top}</a></div></div></footer>

      <button className="motion-toggle label" type="button" disabled={reducedMotion} aria-pressed={motionEnabled} onClick={toggleMotion}>
        <span className="motion-toggle-dot" aria-hidden="true" />{language === "en" ? (reducedMotion ? "Reduced motion" : motionEnabled ? "Pause motion" : "Resume motion") : (reducedMotion ? "कमी हालचाल" : motionEnabled ? "हालचाल थांबवा" : "हालचाल सुरू करा")}
      </button>

      <Dialog open={assistantOpen} onOpenChange={open => { setAssistantOpen(open); if (!open) { setAssistantStep(0); setFormError(""); } }}>
        <DialogTrigger asChild><button className="assistant-fab" type="button"><MessageCircle aria-hidden="true" /><span>{text.guide}</span></button></DialogTrigger>
        <DialogContent data-lenis-prevent className="assistant-dialog" showCloseButton={false} lang={language}>
          <DialogClose className="assistant-close" aria-label={text.close}><X aria-hidden="true" /></DialogClose>
          <DialogHeader><p className="label">{text.assistantLabel}</p><DialogTitle>{text.assistantTitle}</DialogTitle><DialogDescription>{copy.assistantDescription}</DialogDescription></DialogHeader>
          <div className="assistant-progress" aria-label={`${copy.assistantStepLabel} ${assistantStep + 1} / 3`}>{[0, 1, 2].map(step => <span key={step} className={assistantStep >= step ? "active" : ""} />)}</div>
          <div className="assistant-step" aria-live="polite" aria-atomic="true">
            {assistantStep === 0 && <><h3>{copy.assistantNeedPrompt}</h3><div className="assistant-options">{copy.assistantNeeds.map((option, index) => <button key={option} type="button" onClick={() => { setAssistantNeed(index); setAssistantStep(1); }}><span>{option}</span><ArrowRight aria-hidden="true" /></button>)}</div></>}
            {assistantStep === 1 && <><h3>{copy.assistantTimelinePrompt}</h3><div className="assistant-options">{copy.assistantTimelines.map((option, index) => <button key={option} type="button" onClick={() => { setAssistantTimeline(index); setAssistantStep(2); }}><span>{option}</span><ArrowRight aria-hidden="true" /></button>)}</div><button className="ghost-link assistant-back" type="button" onClick={() => setAssistantStep(0)}><ArrowLeft aria-hidden="true" />{copy.assistantBack}</button></>}
            {assistantStep === 2 && <form onSubmit={completeAssistant}><h3>{copy.assistantDetailsPrompt}</h3><label htmlFor="enquiry-name">{copy.assistantName}</label><Input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} value={assistantName} onChange={event => setAssistantName(event.target.value)} /><label htmlFor="enquiry-phone">{copy.assistantPhone}</label><Input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} aria-describedby={formError ? "enquiry-error" : undefined} value={assistantPhone} onChange={event => setAssistantPhone(event.target.value)} />{formError && <p className="form-error" id="enquiry-error" role="alert">{formError}</p>}<button className="ghost-link assistant-submit" type="submit">{copy.assistantPrepare}<ArrowUpRight aria-hidden="true" /></button><button type="button" className="ghost-link assistant-back" onClick={() => { setAssistantStep(1); setFormError(""); }}><ArrowLeft aria-hidden="true" />{copy.assistantBack}</button></form>}
          </div>
          <p className="assistant-disclaimer">{copy.assistantDisclaimer}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
