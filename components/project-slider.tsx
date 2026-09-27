"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Demo = {
  title: string;
  type: string;
  text: string;
  tags: readonly string[];
  caseStudy: readonly string[];
  image: string;
  url: string;
};

type ProjectSliderProps = {
  demos: readonly Demo[];
  language: "en" | "mr";
  motionEnabled: boolean;
  demoLabel: string;
  viewDemo: string;
  details: string;
  caseLabels: readonly string[];
};

export function ProjectSlider({ demos, language, motionEnabled, demoLabel, viewDemo, details, caseLabels }: ProjectSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const options = useMemo(() => ({ align: "center" as const, loop: true, duration: motionEnabled ? 38 : 0 }), [motionEnabled]);
  const demo = demos[selected];
  const mr = language === "mr";

  useEffect(() => {
    if (!api) return;
    const slides = api.slideNodes();
    const cards = slides.map(slide => slide.querySelector<HTMLElement>(".radical-card"));

    // Measure untransformed slide slots, then bend the cards around the centre.
    // Embla owns horizontal movement and looping; only the inner cards rotate.
    const drawArc = () => {
      const viewport = api.rootNode().getBoundingClientRect();
      const centre = viewport.left + viewport.width / 2;
      const overlap = viewport.width * (viewport.width < 600 ? 0.18 : 0.1);
      const distances = slides.map(slide => {
        const rect = slide.getBoundingClientRect();
        return Math.max(-1.5, Math.min(1.5, (rect.left + rect.width / 2 - centre) / rect.width));
      });
      distances.forEach((distance, index) => {
        const card = cards[index];
        if (!card) return;
        const amount = Math.abs(distance);
        card.style.transform = `translate3d(${-distance * overlap}px, ${amount * 38}px, 0) rotate(${distance * 9}deg) scale(${1 - amount * 0.11})`;
        slides[index].style.zIndex = String(10 - Math.round(amount * 5));
      });
    };
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onInit = () => { onSelect(); drawArc(); };
    onInit();
    api.on("scroll", drawArc).on("reInit", onInit).on("select", onSelect);
    return () => {
      api.off("scroll", drawArc).off("reInit", onInit).off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel className="radical-slider" opts={options} setApi={setApi} aria-label={mr ? "संकल्पना वेबसाइट्स" : "Concept websites"}>
      <div className="radical-stage">
        <div className="radical-orbit" aria-hidden="true" />
        <CarouselContent className="radical-track">
          {demos.map((item, index) => (
            <CarouselItem className="radical-slide" key={item.url} aria-label={`${index + 1} / ${demos.length}: ${item.title}`} aria-hidden={index !== selected}>
              <article className="radical-card" data-active={index === selected}>
                <a className="radical-card-link" href={item.url} target="_blank" rel="noopener noreferrer" tabIndex={index === selected ? 0 : -1}
                  aria-label={`${viewDemo}: ${item.title}`} draggable={false}
                  onClick={event => {
                    if (index !== selected) { event.preventDefault(); api?.scrollTo(index, !motionEnabled); }
                  }}>
                  <div className="radical-card-top"><span className="label">0{index + 1} / {demoLabel}</span><ArrowUpRight aria-hidden="true" /></div>
                  <div className="radical-image"><img src={item.image} alt={`${item.title} — ${mr ? "वेबसाइट पूर्वावलोकन" : "website preview"}`} width="1200" height="750" loading={index === selected ? "eager" : "lazy"} draggable={false} /></div>
                  <div className="radical-card-caption"><h3>{item.title}</h3><p>{item.type}</p></div>
                </a>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      <div className="radical-toolbar">
        <p className="radical-count" aria-hidden="true"><span>0{selected + 1}</span><span>/ 0{demos.length}</span></p>
        <p className="radical-hint label"><MoveHorizontal aria-hidden="true" />{mr ? "ओढा किंवा स्वाइप करा" : "Drag or swipe to explore"}</p>
        <div className="radical-arrows">
          <CarouselPrevious className="radical-arrow" aria-label={mr ? "मागील प्रोजेक्ट" : "Previous project"} onClick={() => api?.scrollPrev(!motionEnabled)} />
          <CarouselNext className="radical-arrow" aria-label={mr ? "पुढील प्रोजेक्ट" : "Next project"} onClick={() => api?.scrollNext(!motionEnabled)} />
        </div>
      </div>
      <div className="radical-index" role="group" aria-label={mr ? "प्रोजेक्ट निवडा" : "Choose a project"}>
        {demos.map((item, index) => <button type="button" key={item.url} aria-pressed={selected === index} onClick={() => api?.scrollTo(index, !motionEnabled)}><span className="label">0{index + 1}</span><span>{item.title}</span></button>)}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{demo.title}, {selected + 1} / {demos.length}</p>
      <div className="radical-details" key={demo.url}>
        <div className="project-description"><p>{demo.text}</p><div className="project-tags">{demo.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <div className="radical-detail-actions">
          <a href={`/work/${demo.url.includes("smile-dental") ? "smile-dental" : demo.url.includes("bisi-bele") ? "bisi-bele" : "afterdark"}?lang=${language}`} className="ghost-link">{mr ? "सविस्तर केस स्टडी पहा" : "Read case study"}<ArrowUpRight aria-hidden="true" /></a>
          <a href={demo.url} target="_blank" rel="noopener noreferrer" className="ghost-link">{viewDemo}<ArrowUpRight aria-hidden="true" /></a>
          <Accordion className="project-details" type="single" collapsible><AccordionItem value="details"><AccordionTrigger>{details}</AccordionTrigger><AccordionContent><dl>{demo.caseStudy.map((detail, i) => <div key={i}><dt className="label">{caseLabels[i]}</dt><dd>{detail}</dd></div>)}</dl></AccordionContent></AccordionItem></Accordion>
        </div>
      </div>
    </Carousel>
  );
}
