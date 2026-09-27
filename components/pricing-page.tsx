"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";

type Language = "en" | "mr";

const websiteRows = [
  { pages: "01", standard: "₹11,900", animated: "₹24,900" },
  { pages: "03", standard: "₹19,900", animated: "₹34,900" },
  { pages: "05", standard: "₹27,900", animated: "₹49,900" },
  { pages: "06+", standard: null, animated: null },
] as const;

const copy = {
  en: {
    skip: "Skip to pricing",
    back: "Back to studio",
    work: "Selected work",
    services: "Services",
    contact: "Start a conversation",
    pricing: "PRICING / DEV AI STUDIO",
    hero: ["CLEAR SCOPE.", "CLEAR PRICE."],
    intro: "Choose a starting point. I’ll shape the final proposal around your pages, content and the work the site needs to do.",
    jump: "Explore prices",
    webLabel: "01 / WEBSITE BUILDS",
    webTitle: "A website for the work ahead.",
    webIntro: "Standard sites keep the message direct. Animated sites add a considered visual story. Both are built to work on phones first.",
    pages: "Pages",
    standard: "Standard",
    animated: "Animated",
    six: "Quoted to scope",
    from: "from",
    standardTitle: "Standard website",
    standardText: "A clear business presence with responsive design, essential search setup and a working enquiry path.",
    standardItems: ["Subtle hover and reveal details", "Contact form or WhatsApp chat link", "Two revision rounds and 14 days of launch fixes"],
    animatedTitle: "Animated website",
    animatedText: "A tailored hero and planned scroll moments where motion helps explain the product or service.",
    animatedItems: ["Motion scenes agreed in the proposal", "Touch-friendly mobile version", "Reduced-motion alternative and performance checks"],
    tableNote: "Starting prices for standard brochure pages. Custom booking systems, commerce, multilingual copy and 3D assets need a separate quote.",
    motionLabel: "02 / EXTRA MOTION",
    motionTitle: "One more moment, if it earns its place.",
    motionIntro: "Every animated build includes the agreed motion scenes. If you want another sequence later, these are the starting ranges.",
    motionRows: [
      ["Additional animated section", "₹3,000–₹5,000", "A distinct reveal, transition or interaction in one section."],
      ["Complex scroll sequence", "₹8,000–₹15,000", "A longer, carefully timed story across a section."],
      ["Interactive 3D", "Custom quote", "Priced after the model, interactions and mobile fallback are agreed."],
    ],
    motionNote: "Simple fades and button hovers are part of the site price. A bespoke 3D model, video or paid asset is scoped separately.",
    waLabel: "03 / WHATSAPP AUTOMATION",
    waTitle: "The conversation is its own project.",
    waIntro: "Website prices include a WhatsApp chat link if you want one. Automated replies and lead flows are quoted separately.",
    waRows: [
      ["Business App setup", "₹2,900", "Profile, greeting, away message and quick replies. No chatbot."],
      ["FAQ + lead capture", "from ₹12,900", "Answers agreed questions, collects enquiry details and hands off to a person."],
      ["Booking + follow-up", "from ₹19,900", "An agreed appointment or lead journey with reminders or follow-ups."],
      ["Custom AI / CRM flow", "Custom quote", "Quoted after the data, provider and support needs are clear."],
    ],
    waNote: "These are one-time setup prices. Ongoing management, WhatsApp Business Platform message charges and any software subscription are separate when required.",
    detailLabel: "04 / BEFORE WE BEGIN",
    detailTitle: "What the quote makes clear.",
    detailRows: [
      ["The scope", "Pages, unique interactions, copy responsibilities and the enquiry flow are listed before work starts."],
      ["The handover", "You get the approved website and a walkthrough of what was built. Launch fixes cover defects in the agreed work."],
      ["Other costs", "Domain, hosting, paid imagery, third-party tools and applicable taxes are disclosed separately."],
    ],
    ctaLabel: "YOUR PROJECT / NEXT STEP",
    ctaTitle: "Tell me what you need to build.",
    ctaText: "Share your business, the pages you need and whether you want motion or WhatsApp automation. I’ll suggest a sensible scope and exact quote.",
    ctaLink: "Discuss my project",
    footer: "Independent web & automation studio",
    notes: "Privacy & project notes",
  },
  mr: {
    skip: "किंमतींकडे जा",
    back: "मुख्य पानावर जा",
    work: "निवडक काम",
    services: "सेवा",
    contact: "बोलूया",
    pricing: "किंमत / DEV AI STUDIO",
    hero: ["काम स्पष्ट.", "किंमत स्पष्ट."],
    intro: "योग्य सुरुवात निवडा. पेजेस, मजकूर आणि वेबसाइटचे उद्दिष्ट पाहून मी अंतिम प्रस्ताव देईन.",
    jump: "किंमती पाहा",
    webLabel: "01 / वेबसाइट",
    webTitle: "तुमच्या कामासाठी योग्य वेबसाइट.",
    webIntro: "साधी वेबसाइट तुमचा संदेश स्पष्ट ठेवते. अ‍ॅनिमेटेड वेबसाइट दृश्य अनुभव जोडते. दोन्ही मोबाइलवर सहज वापरता येतील अशा बनवल्या जातात.",
    pages: "पेजेस",
    standard: "साधी",
    animated: "अ‍ॅनिमेटेड",
    six: "कामानुसार प्रस्ताव",
    from: "पासून",
    standardTitle: "साधी वेबसाइट",
    standardText: "मोबाइलसाठी योग्य डिझाइन, शोधासाठी मूलभूत सेटअप आणि चौकशीची स्पष्ट सोय.",
    standardItems: ["गरजेपुरते होव्हर आणि रिव्हील इफेक्ट्स", "संपर्क फॉर्म किंवा WhatsApp चॅट लिंक", "दोन बदलांच्या फेऱ्या आणि लाँचनंतर 14 दिवस दोष दुरुस्ती"],
    animatedTitle: "अ‍ॅनिमेटेड वेबसाइट",
    animatedText: "व्यवसायाची गोष्ट समजावण्यासाठी खास हिरो अ‍ॅनिमेशन आणि नियोजित स्क्रोल अनुभव.",
    animatedItems: ["अ‍ॅनिमेशनची दृश्ये प्रस्तावात आधी ठरतील", "मोबाइलसाठी योग्य अनुभव", "कमी हालचालीचा पर्याय आणि वेगाची तपासणी"],
    tableNote: "या मूलभूत किंमती माहिती देणाऱ्या वेबसाइटसाठी आहेत. खास बुकिंग व्यवस्था, ऑनलाइन विक्री, दुसऱ्या भाषेतील मजकूर आणि 3D सामग्रीसाठी वेगळा प्रस्ताव असेल.",
    motionLabel: "02 / अतिरिक्त अ‍ॅनिमेशन",
    motionTitle: "गरज असेल तर आणखी एक खास क्षण.",
    motionIntro: "अ‍ॅनिमेटेड वेबसाइटमध्ये प्रस्तावात ठरलेली दृश्ये समाविष्ट असतात. नंतर अधिक अ‍ॅनिमेशन हवे असल्यास या सुरुवातीच्या किंमती आहेत.",
    motionRows: [
      ["अतिरिक्त अ‍ॅनिमेटेड विभाग", "₹3,000–₹5,000", "एका विभागात खास रिव्हील, ट्रान्झिशन किंवा संवाद."],
      ["स्क्रोलवर चालणारा मोठा अनुभव", "₹8,000–₹15,000", "एका विभागात वेळेनुसार पुढे जाणारी दृश्य कथा."],
      ["परस्परसंवादी 3D", "कामानुसार किंमत", "मॉडेल, संवाद आणि मोबाइल पर्याय ठरल्यानंतर किंमत."],
    ],
    motionNote: "साधे फेड्स आणि बटण होव्हर आधीच वेबसाइटच्या किंमतीत आहेत. खास 3D मॉडेल, व्हिडिओ किंवा सशुल्क सामग्री वेगळी मोजली जाईल.",
    waLabel: "03 / WHATSAPP ऑटोमेशन",
    waTitle: "संवादासाठी स्वतंत्र सेवा.",
    waIntro: "वेबसाइटच्या किंमतीत हवी असल्यास WhatsApp चॅट लिंक समाविष्ट आहे. स्वयंचलित उत्तरे आणि लीड फ्लोसाठी स्वतंत्र किंमत आहे.",
    waRows: [
      ["Business App सेटअप", "₹2,900", "प्रोफाइल, स्वागत संदेश, अनुपस्थितीचा संदेश आणि क्विक रिप्लाय. चॅटबॉट नाही."],
      ["प्रश्नोत्तरे + लीड माहिती", "₹12,900 पासून", "ठरलेल्या प्रश्नांची उत्तरे, चौकशीची माहिती आणि गरज पडल्यास व्यक्तीकडे हस्तांतरण."],
      ["बुकिंग + पाठपुरावा", "₹19,900 पासून", "ठरलेला अपॉइंटमेंट किंवा लीड प्रवास, स्मरणपत्रे किंवा पाठपुरावा."],
      ["खास AI / CRM फ्लो", "कामानुसार किंमत", "डेटा, सेवा पुरवठादार आणि देखभालीची गरज समजल्यावर प्रस्ताव."],
    ],
    waNote: "या एकदाच्या सेटअप किंमती आहेत. गरज असल्यास नियमित देखभाल, WhatsApp Business Platform संदेश शुल्क आणि इतर टूल्सचे शुल्क वेगळे असेल.",
    detailLabel: "04 / सुरुवात करण्यापूर्वी",
    detailTitle: "प्रस्तावात सर्व काही स्पष्ट असेल.",
    detailRows: [
      ["कामाची व्याप्ती", "पेजेस, खास अ‍ॅनिमेशन, मजकूर कोण देईल आणि चौकशी कशी येईल हे आधी लिहून ठरवू."],
      ["हस्तांतरण", "मान्य केलेली वेबसाइट आणि तयार केलेल्या कामाचे मार्गदर्शन मिळेल. ठरलेल्या कामातील दोष लाँचनंतर दुरुस्त होतील."],
      ["इतर खर्च", "डोमेन, होस्टिंग, सशुल्क फोटो, इतर टूल्स आणि लागू असलेले कर स्वतंत्रपणे स्पष्ट केले जातील."],
    ],
    ctaLabel: "तुमचा प्रोजेक्ट / पुढची पायरी",
    ctaTitle: "तुम्हाला काय तयार करायचे आहे?",
    ctaText: "व्यवसाय, आवश्यक पेजेस आणि अ‍ॅनिमेशन किंवा WhatsApp ऑटोमेशन हवे आहे का ते सांगा. मी कामाची योग्य व्याप्ती आणि नेमकी किंमत सुचवेन.",
    ctaLink: "प्रोजेक्टबद्दल बोलूया",
    footer: "स्वतंत्र वेब आणि ऑटोमेशन स्टुडिओ",
    notes: "गोपनीयता व प्रकल्पाची माहिती",
  },
} as const;

export function PricingPage({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const root = useRef<HTMLDivElement>(null);
  const t = copy[language];

  useEffect(() => {
    const host = root.current;
    if (!host || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(host.querySelectorAll<HTMLElement>(".pricing-reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -18px 0px" });
    elements.forEach(el => observer.observe(el));
    requestAnimationFrame(() => host.classList.add("pricing-motion-ready"));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    return () => { document.documentElement.lang = "en"; };
  }, [language]);

  const homeLink = `/${language === "mr" ? "?lang=mr" : ""}`;
  const whatsappUrl = `https://wa.me/917738400373?text=${encodeURIComponent(language === "mr"
    ? "नमस्कार Dev, मी वेबसाइट आणि WhatsApp ऑटोमेशनच्या किंमती पाहिल्या. मला माझ्या प्रोजेक्टबद्दल बोलायचे आहे."
    : "Hi Dev, I saw your website and WhatsApp automation prices. I’d like to discuss a quote for my project.")}`;

  function toggleLanguage() {
    const next = language === "en" ? "mr" : "en";
    setLanguage(next);
    const url = new URL(window.location.href);
    if (next === "mr") url.searchParams.set("lang", "mr");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="pricing-page site-frame" data-language={language} ref={root}>
      <a className="skip-link" href="#pricing-main">{t.skip}</a>
      <header className="pricing-header page-shell">
        <a className="brand" href={homeLink} aria-label="Dev AI Studio home"><span className="brand-symbol" aria-hidden="true">D<span>✦</span></span><span>DEV /<br />AI STUDIO</span></a>
        <nav className="pricing-header-links" aria-label={language === "mr" ? "मुख्य नेव्हिगेशन" : "Main navigation"}>
          <a href={`${homeLink}#work`} className="ghost-link">{t.work}</a>
          <a href={`${homeLink}#services`} className="ghost-link">{t.services}</a>
          <span aria-current="page">{language === "mr" ? "किंमत" : "Pricing"}</span>
        </nav>
        <button type="button" className="language-switch" onClick={toggleLanguage} aria-label={language === "en" ? "Switch to Marathi" : "Switch to English"} aria-pressed={language === "mr"}>
          <span className={language === "en" ? "selected" : ""}>EN</span><span className="language-divider" aria-hidden="true">/</span><span lang="mr" className={language === "mr" ? "selected" : ""}>मराठी</span>
        </button>
      </header>

      <main id="pricing-main" tabIndex={-1} className="page-shell">
        <section className="pricing-hero" aria-labelledby="pricing-title">
          <div className="pricing-meta"><span className="label">{t.pricing}</span><span className="label">KHARGHAR / INDIA</span></div>
          <div className="pricing-hero-content">
            <div className="pricing-rings" aria-hidden="true"><i/><i/><i/></div>
            <h1 id="pricing-title">{t.hero.map(line => <span key={line}>{line}</span>)}</h1>
          </div>
          <div className="pricing-hero-bottom"><a href="#websites" className="ghost-link">{t.jump}<ArrowDown aria-hidden="true"/></a><p>{t.intro}</p></div>
        </section>

        <section id="websites" className="pricing-section" aria-labelledby="pricing-web-title">
          <div className="section-meta"><p className="label">{t.webLabel}</p><span className="label">WEB / DESIGN</span></div>
          <div className="pricing-section-heading pricing-reveal"><h2 id="pricing-web-title">{t.webTitle}</h2><p>{t.webIntro}</p></div>
          <div className="pricing-table-wrap">
            <table className="pricing-table"><thead><tr><th scope="col">{t.pages}</th><th scope="col">{t.standard}</th><th scope="col">{t.animated}</th></tr></thead>
              <tbody>{websiteRows.map(row => <tr className="pricing-reveal" key={row.pages}><th scope="row">{row.pages}</th><td>{row.standard ? <><span className="price-value">{row.standard}</span><small>{t.from}</small></> : <span className="price-quote">{t.six}</span>}</td><td>{row.animated ? <><span className="price-value">{row.animated}</span><small>{t.from}</small></> : <span className="price-quote">{t.six}</span>}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="pricing-fineprint">{t.tableNote}</p>
          <div className="pricing-two-up">
            <article className="pricing-description pricing-reveal"><p className="label">A / {t.standard}</p><h3>{t.standardTitle}</h3><p>{t.standardText}</p><ul>{t.standardItems.map(item => <li key={item}>{item}</li>)}</ul></article>
            <article className="pricing-description pricing-reveal"><p className="label">B / {t.animated}</p><h3>{t.animatedTitle}</h3><p>{t.animatedText}</p><ul>{t.animatedItems.map(item => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        <section className="pricing-section" aria-labelledby="pricing-motion-title">
          <div className="section-meta"><p className="label">{t.motionLabel}</p><span className="label">ADDITIONS / MOTION</span></div>
          <div className="pricing-section-heading pricing-reveal"><h2 id="pricing-motion-title">{t.motionTitle}</h2><p>{t.motionIntro}</p></div>
          <div className="pricing-lines">{t.motionRows.map(([title, price, description], index) => <article className="pricing-line pricing-reveal" key={title}><span className="label">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><p className="pricing-line-price">{price}</p></article>)}</div>
          <p className="pricing-fineprint">{t.motionNote}</p>
        </section>

        <section className="pricing-section" aria-labelledby="pricing-wa-title">
          <div className="section-meta"><p className="label">{t.waLabel}</p><span className="label">SETUP / SEPARATE</span></div>
          <div className="pricing-section-heading pricing-reveal"><h2 id="pricing-wa-title">{t.waTitle}</h2><p>{t.waIntro}</p></div>
          <div className="pricing-lines">{t.waRows.map(([title, price, description], index) => <article className="pricing-line pricing-reveal" key={title}><span className="label">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><p className="pricing-line-price">{price}</p></article>)}</div>
          <p className="pricing-fineprint">{t.waNote}</p>
        </section>

        <section className="pricing-section pricing-detail" aria-labelledby="pricing-detail-title">
          <div className="section-meta"><p className="label">{t.detailLabel}</p></div>
          <div className="pricing-detail-layout"><h2 id="pricing-detail-title" className="pricing-reveal">{t.detailTitle}</h2><div>{t.detailRows.map(([title, description], index) => <article className="pricing-detail-row pricing-reveal" key={title}><span className="label">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div>
        </section>

        <section className="pricing-end" aria-labelledby="pricing-end-title"><p className="label">{t.ctaLabel}</p><div className="pricing-end-grid"><h2 id="pricing-end-title">{t.ctaTitle}</h2><div><p>{t.ctaText}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ghost-link">{t.ctaLink}<span className="sr-only">{language === "mr" ? " (WhatsApp नवीन टॅबमध्ये उघडेल)" : " (opens WhatsApp in a new tab)"}</span><ArrowUpRight aria-hidden="true"/></a></div></div></section>
      </main>
      <footer className="pricing-footer page-shell"><a className="footer-wordmark" href={homeLink}><span className="footer-wordmark-inner">DEV / AI STUDIO</span></a><div className="footer-bottom"><p>{t.footer}</p><div className="footer-controls"><a className="ghost-link" href={`/project-notes?lang=${language}`}>{t.notes}</a><a className="ghost-link" href={homeLink}><ArrowLeft aria-hidden="true"/>{t.back}</a></div></div></footer>
    </div>
  );
}
