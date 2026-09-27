"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** One clock for scrolling, entrances and scroll-linked scenes. Content stays visible without JS. */
export function useStudioMotion(
  root: RefObject<HTMLDivElement | null>,
  language: string,
  enabled: boolean,
  dialogOpen: boolean,
) {
  const lenisRef = useRef<Lenis | null>(null);
  const dialogRef = useRef(dialogOpen);

  useEffect(() => {
    dialogRef.current = dialogOpen;
    if (dialogOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [dialogOpen]);

  useEffect(() => {
    const page = root.current;
    if (!page || !enabled) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let disposed = false;
    let refreshFrame = 0;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -24 },
      prevent: node => !!node.closest("[data-lenis-prevent]"),
    });
    lenisRef.current = lenis;
    if (dialogRef.current) lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const hero = page.querySelector<HTMLElement>(".hero-scroll")!;
      const heroChars = page.querySelectorAll(".hero-character");
      // A returning visitor or language switch must not replay an off-screen entrance.
      if (hero.getBoundingClientRect().bottom > 0 && window.scrollY < 80) {
        gsap.fromTo(heroChars, { yPercent: 112, rotation: 5 }, {
          yPercent: 0, rotation: 0, duration: 1.1, stagger: 0.018,
          delay: 0.08, ease: "power4.out", clearProps: "transform",
        });
        gsap.from(".orb-surface", { scale: 0.65, opacity: 0, duration: 1.5, ease: "power3.out" });
        gsap.from(".hero-topline, .hero-bottom", { opacity: 0, y: 12, duration: 0.7, delay: 0.45, clearProps: "all" });
      }

      // Masked typography is separate from section parallax, so transforms never compete.
      page.querySelectorAll<HTMLElement>(".display-heading, .contact-title").forEach(heading => {
        gsap.from(heading.querySelectorAll(".motion-line"), {
          yPercent: 112, rotation: 2, duration: 0.95, stagger: 0.1,
          ease: "power4.out", clearProps: "transform",
          scrollTrigger: { trigger: heading, start: "top 91%", once: true },
        });
      });

      page.querySelectorAll<HTMLElement>(".reveal").forEach(item => {
        gsap.from(item, {
          y: 42, opacity: 0, duration: 0.85, ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: item, start: "top 94%", once: true },
        });
      });

      gsap.fromTo(".statement-word", { opacity: 0.22 }, {
        opacity: 1, stagger: 0.16, ease: "none",
        scrollTrigger: { trigger: ".intro-copy h2", start: "top 82%", end: "bottom 48%", scrub: 0.35 },
      });

      page.querySelectorAll<HTMLElement>(".sphere-sheen").forEach(sheen => {
        const colourShift = gsap.to(sheen, {
          opacity: 0.75, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
        });
        ScrollTrigger.create({
          trigger: sheen.closest(".contact-section") ?? hero, start: "top bottom", end: "bottom top",
          onToggle: self => self.isActive ? colourShift.play() : colourShift.pause(),
          onRefresh: self => self.isActive ? colourShift.play() : colourShift.pause(),
        });
      });

      gsap.from(".service-row", {
        x: 40, opacity: 0, stagger: 0.18, duration: 0.8, clearProps: "all",
        scrollTrigger: { trigger: ".service-list", start: "top 88%", once: true },
      });
      gsap.from(".process-number", {
        yPercent: 35, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: ".process-grid", start: "top 88%", once: true },
      });
      gsap.fromTo(".contact-mark", { rotation: -50, scale: 0.65 }, {
        rotation: 90, scale: 1.2, ease: "none",
        scrollTrigger: { trigger: ".contact-section", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.from(".footer-wordmark-inner", {
        yPercent: 105, duration: 1.2, ease: "power4.out", clearProps: "all",
        scrollTrigger: { trigger: ".site-footer", start: "top 92%", once: true },
      });

      media.add({
        desktop: "(min-width: 961px) and (min-height: 650px)",
        compact: "(max-width: 960px), (max-height: 649px)",
      }, match => {
        const desktop = match.conditions?.desktop;
        if (desktop) {
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 0.7 },
          });
          timeline.to(".hero-line-0", { xPercent: -22, y: -90, ease: "none" }, 0)
            .to(".hero-line-1", { xPercent: 25, y: -40, ease: "none" }, 0)
            .to(".hero-line-2", { xPercent: -12, y: 30, ease: "none" }, 0)
            .to(".hero-orbit", { xPercent: -27, scale: 1.85, yPercent: 8, ease: "none" }, 0)
            .to(".hero-orbit", { opacity: 0.55, duration: 0.24 }, 0.46)
            .to(".hero-title", { opacity: 0.35, duration: 0.2 }, 0.5)
            .to(".hero-topline, .hero-bottom, .hero-coordinate", { autoAlpha: 0, duration: 0.16 }, 0)
            .to(".orbit-ring", { scale: 1.3, duration: 0.7, ease: "none" }, 0);

          const depth = gsap.timeline({
            scrollTrigger: { trigger: ".depth-scene", start: "top top", end: "bottom bottom", scrub: 0.75 },
          });
          page.querySelectorAll<HTMLElement>(".depth-tile").forEach((tile, index) => {
            const start = index * 0.14;
            depth.fromTo(tile, { z: -1800, opacity: 0, rotationZ: index % 2 ? 5 : -5 },
              { z: -750, opacity: 1, rotationZ: 0, duration: 0.65, ease: "none" }, start)
              .to(tile, { z: 780, duration: 2, ease: "none" }, start + 0.65)
              .to(tile, { opacity: 0, duration: 0.25, ease: "none" }, start + 2.35);
          });
          depth.fromTo(".depth-endnote", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.1);
        } else {
          // Touch keeps native momentum. Shorter scenes retain movement without long pinned waits.
          gsap.to(".orb-scroll", {
            y: 65, scale: 1.12, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
          });
          gsap.from(".depth-tile", {
            y: 70, scale: 0.8, opacity: 0, stagger: 0.09, duration: 1,
            ease: "power3.out", clearProps: "all",
            scrollTrigger: { trigger: ".depth-scene", start: "top 80%", once: true },
          });

        }
      });

      media.add("(hover: hover) and (pointer: fine)", () => {
        const cursor = page.querySelector<HTMLElement>(".studio-cursor")!;
        const orb = page.querySelector<HTMLElement>(".orb-pointer")!;
        const cursorX = gsap.quickTo(cursor, "x", { duration: 0.28, ease: "power3.out" });
        const cursorY = gsap.quickTo(cursor, "y", { duration: 0.28, ease: "power3.out" });
        const orbX = gsap.quickTo(orb, "x", { duration: 1.2, ease: "power3.out" });
        const orbY = gsap.quickTo(orb, "y", { duration: 1.2, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          cursorX(event.clientX); cursorY(event.clientY);
          gsap.set(cursor, { opacity: 1 });
          if (hero.getBoundingClientRect().bottom > 0) {
            orbX((event.clientX / window.innerWidth - 0.5) * 38);
            orbY((event.clientY / window.innerHeight - 0.5) * 28);
          }
        };
        const over = (event: PointerEvent) => {
          const interactive = (event.target as Element).closest("a, button, input");
          gsap.to(cursor, { scale: interactive ? 1.8 : 1, duration: 0.25 });
        };
        const leave = () => gsap.set(cursor, { opacity: 0 });
        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerover", over, { passive: true });
        document.addEventListener("pointerleave", leave);
        return () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerover", over);
          document.removeEventListener("pointerleave", leave);
          cursorX.tween.kill(); cursorY.tween.kill(); orbX.tween.kill(); orbY.tween.kill();
          gsap.killTweensOf([cursor, orb]);
          gsap.set(cursor, { clearProps: "all" });
          gsap.set(orb, { clearProps: "all" });
        };
      });
    }, page);

    const refresh = () => {
      if (disposed || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };
    // Font swaps, translated copy, image loads and accordions all change scroll geometry.
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(page);
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    refresh();

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      media.revert();
      context.revert();
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [root, language, enabled]);
}
