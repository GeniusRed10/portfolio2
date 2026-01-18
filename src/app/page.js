"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Script from "next/script";
import Image from "next/image";
import { withBasePath } from "@/utils/base-path";

import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Data
const skillsData = [
  {
    category: "Web & Cloud Hosting",
    skills: ["cPanel/WHM", "VPS", "Dedicated Servers", "DNS Management", "SSL Configuration"],
  },
  {
    category: "Frontend & Backend",
    skills: ["HTML/CSS/JavaScript", "React", "Next.js", "Vue.js", "PHP", "MySQL", "PlpgSQL", "TypeScript"],
  },
  {
    category: "JAMstack & Serverless",
    skills: ["Next.js", "Astro", "Gatsby", "AWS Lambda", "Cloudflare Workers", "Firebase"],
  },
  {
    category: "Version Control & CI/CD",
    skills: ["Git", "GitHub", "GitLab", "GitHub Actions", "GitLab CI/CD", "CircleCI"],
  },
  {
    category: "Database & Storage",
    skills: ["FaunaDB", "Supabase", "Firebase Firestore", "PostgreSQL", "AWS S3", "Cloudinary"],
  },
  {
    category: "Security & Performance",
    skills: ["OAuth", "JWT", "Auth0", "Web Vitals", "GTmetrix", "SEMrush"],
  },
];

const experienceData = [
  {
    title: "Support Engineer",
    company: "Netlify",
    period: "Current",
    image: "/img_01.jpg",
    description: [
      "Diagnose and resolve complex issues related to web development, deployment pipelines, and platform configurations.",
      "Assist customers with troubleshooting errors related to static site generators (Gatsby, Next.js), serverless functions, and CI/CD workflows.",
      "Provide clear, actionable guidance to customers, ensuring they feel supported and empowered.",
      "Collaborate with cross-functional teams to address recurring issues and propose process or product improvements.",
    ],
  },
  {
    company: "Newfold Digital",
    totalPeriod: "4 yrs 4 mos",
    image: "/img_01.jpg",
    roles: [
      {
        title: "Executive Response Specialist",
        period: "Sep 2023 - Apr 2025 · 1 yr 8 mos",
        description: "I manage high-priority cases, working closely with support leaders, system engineers, and senior executives to resolve complex technical issues. My role requires a strategic approach to communication and problem-solving, ensuring timely resolutions and clear stakeholder engagement. I also leverage my social media expertise to enhance brand presence, address concerns, and improve customer satisfaction.",
      },
      {
        title: "Service Resolution Team Tier II",
        period: "Mar 2022 - Aug 2023 · 1 yr 6 mos",
        description: "As a Service Resolution Tier II Specialist, I provided guidance and advanced technical support to customer service teams, ensuring efficient issue resolution and a seamless customer experience. My role focused on mentoring support specialists, troubleshooting complex customer application issues, and ensuring adherence to company metrics and best practices.",
      },
      {
        title: "Domain, Email, Hosting Specialist",
        period: "Jan 2021 - Feb 2022 · 1 yr 2 mos",
        description: "Handling customer inquiries and troubleshooting issues related to domains, email, and hosting. In this role, I was responsible for assisting customers with a wide range of technical concerns, from domain registration and DNS configuration to email setup and hosting management.",
      },
    ],
  },
];

const projectsData = [
  {
    title: "Blockchain-Based Supply Chain Tracker",
    description: "Transparent supply chain management system using blockchain technology to track products from manufacture to delivery with immutable records. Features QR code generation, smart contracts, and IoT sensor integration.",
    tech: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    features: [
      "Immutable blockchain-based product tracking",
      "QR code generation and mobile scanning",
      "Smart contract automation for payments and compliance",
      "IoT sensor integration for environmental monitoring",
      "Real-time supply chain visibility dashboard",
    ],
  },
  {
    title: "Full RingCentral Integration",
    description: "Complete RingCentral integration into CRM enabling in-app calling, messaging, presence tracking, call analytics, and webhook-based logging. All API interactions handled through Supabase Edge Functions.",
    tech: ["Supabase", "Webhooks", "Docker", "RingCentral API", "OAuth 2.0", "JWT", "Netlify"],
    link: "https://ringcentral.brightwordbooks.com",
    image: "https://www.brightgauge.com/hubfs/ringcentral.png",
    features: [
      "In-app calling and messaging",
      "Real-time presence tracking",
      "Call analytics and logging",
      "OAuth 2.0 authentication",
      "Webhook-based event processing",
    ],
  },
  {
    title: "Full Stack CRM",
    description: "Comprehensive customer relationship management platform for book publishing companies. Streamlines management of authors, manuscripts, production workflows, sales, billing, and team collaboration.",
    tech: ["Supabase", "CSS", "Docker", "React", "Node.js", "TypeScript"],
    link: "https://crm.brightwordbooks.com",
    image: "https://media.istockphoto.com/id/1479379116/photo/businessman-using-a-computer-and-dashboard-crm-for-management-customer-relationship.webp?a=1&b=1&s=612x612&w=0&k=20&c=1TtREXkeLB7l9Oh073yEusbykd2HuYafDsBeMA5vGm4=",
    features: [
      "Author and manuscript management",
      "Visual production pipeline and project tracking",
      "Integrated sales, billing, and commission calculation",
      "Automated invoice and contract PDF generation",
      "Real-time dashboards and analytics",
      "Role-based access and permissions",
    ],
  },
  {
    title: "Publishing Marketing Company",
    description: "Comprehensive publishing platform that revolutionizes book marketing and distribution. Provides authors with powerful tools for book promotion, sales management, and reader engagement with automated marketing campaigns.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    link: "https://www.brightwordbooks.com",
    image: "https://i.ytimg.com/vi/1nwwGBRPJaM/maxresdefault.jpg",
    features: [
      "Real-time data processing and analytics",
      "Custom visualization builder",
      "Automated alerting and notification system",
      "Historical data analysis and trending",
      "API integration support",
    ],
  },
  {
    title: "Serverless Book Portfolio",
    description: "Full-featured Christian ministry platform combining modern web technologies with spiritual content delivery. Features robust CMS for sermons, integrated video streaming, secure donations, and event registration.",
    tech: ["Next.js", "Stripe", "Sanity CMS", "Vercel", "Tailwind CSS"],
    link: "https://perfectglory.com",
    image: "https://m.media-amazon.com/images/I/81ZrM6u7SbL._SY466_.jpg",
    features: [
      "Content management for sermons and testimonials",
      "Integrated video streaming",
      "Secure donation processing",
      "Event registration system",
      "Mobile-first responsive design",
    ],
  },
  {
    title: "Serverless E-commerce Platform 3",
    description: "Comprehensive security compliance automation platform designed to maintain and verify security posture across cloud and on-premise infrastructure. Covers SOC 2, HIPAA, and PCI DSS compliance frameworks.",
    tech: ["Python", "AWS Security Hub", "Terraform", "Docker", "ELK Stack"],
    link: "https://www.authortamaramiller.com",
    image: "https://m.media-amazon.com/images/I/411zHzhbn4L._SY445_SX342_ControlCacheEqualizer_.jpg",
    features: [
      "Automated security scanning and assessment",
      "Compliance framework coverage (SOC 2, HIPAA, PCI DSS)",
      "Automated policy enforcement",
      "Security control validation",
      "Unified security analytics",
    ],
  },
  {
    title: "Serverless E-commerce Platform 2",
    description: "Sophisticated e-commerce platform for portfolio websites featuring advanced product catalog management, secure payment processing, and real-time inventory tracking with serverless architecture.",
    tech: ["React", "AWS Lambda", "DynamoDB", "Stripe", "Netlify"],
    link: "https://patrickscott.netlify.app",
    image: "https://m.media-amazon.com/images/I/71nrsFSfNlL._SY466_.jpg",
    features: [
      "Advanced product catalog management",
      "Secure encrypted payment processing",
      "Real-time inventory tracking",
      "Automated order processing",
      "Comprehensive admin tools",
    ],
  },
  {
    title: "Serverless E-commerce Platform 1",
    description: "Next-generation e-commerce platform built entirely on serverless architecture, delivering exceptional performance and scalability. Features AI-powered product recommendations and dynamic pricing strategies.",
    tech: ["Next.js", "AWS Lambda", "DynamoDB", "Stripe", "Netlify"],
    link: "https://brian-oglesby.com",
    image: "https://static.wixstatic.com/media/c46be2_2774317d00d949de96dddddc047759b6~mv2.png/v1/fill/w_544,h_701,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Brian%20Oglesby_stacked.png",
    features: [
      "Serverless architecture with auto-scaling",
      "AI-powered product recommendations",
      "Real-time inventory management",
      "Automated order processing and fulfillment",
      "Customer behavior analytics",
    ],
  },
  {
    title: "Project Coming Soon",
    description: "A new exciting project is in development. Details will be added soon.",
    tech: ["TBD"],
    link: "#",
    image: "/project-1.jpg",
    features: [],
  },
  {
    title: "Project Coming Soon",
    description: "A new exciting project is in development. Details will be added soon.",
    tech: ["TBD"],
    link: "#",
    image: "/project-2.jpg",
    features: [],
  },
  {
    title: "Project Coming Soon",
    description: "A new exciting project is in development. Details will be added soon.",
    tech: ["TBD"],
    link: "#",
    image: "/project-3.jpg",
    features: [],
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const heroContentRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const videoFramesRef = useRef({ frame: 0 });
  const lenisRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Prevent scroll until everything is ready
  useEffect(() => {
    if (!isReady || !gsapLoaded) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Unlock scroll when ready
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isReady, gsapLoaded]);

  // Initialize GSAP and mark as loaded
  useEffect(() => {
    // GSAP is already imported synchronously, so it's ready
    if (typeof gsap !== 'undefined' && ScrollTrigger) {
      setGsapLoaded(true);
    }
  }, []);

  // Preload all frame images with priority loading
  useEffect(() => {
    const frameCount = 207;
    let loadedCount = 0;
    const images = [];

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= frameCount) {
        setIsReady(true);
      }
    };

    // Load first 10 frames with high priority
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      // Use fetchpriority for first frames
      if (i < 10) {
        img.fetchPriority = 'high';
      }
      img.src = withBasePath(`/frames/frame_${(i + 1).toString().padStart(4, "0")}.jpg`);
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Hero frame animation
  useGSAP(
    () => {
      if (!isReady) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      contextRef.current = context;

      const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        context.scale(pixelRatio, pixelRatio);
      };

      setCanvasSize();

      const frameCount = 207;
      const images = imagesRef.current;

      const render = () => {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        const img = images[videoFramesRef.current.frame];
        if (img && img.complete && img.naturalWidth > 0) {
          const imageAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          if (imageAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imageAspect;
            drawX = (canvasWidth - drawWidth) / 2;
            drawY = 0;
          } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imageAspect;
            drawX = 0;
            drawY = (canvasHeight - drawHeight) / 2;
          }

          context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
      };

      // Initial render
      render();

      // Initial zoom animation on load
      gsap.fromTo(canvas, 
        { scale: 1.3 },
        { scale: 1, duration: 2, ease: "power2.out" }
      );

      // Create hero scroll animation (frames only, no text)
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+=${window.innerHeight * 6}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // Frame animation - use all 207 frames across the scroll
          const targetFrame = Math.min(Math.round(progress * (frameCount - 1)), frameCount - 1);
          videoFramesRef.current.frame = targetFrame;
          render();

          // Hero content container z-depth effect
          if (progress <= 0.15) {
            const fadeProgress = progress / 0.15;
            const translateZ = fadeProgress * -300;
            gsap.set(heroContentRef.current, {
              transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
            });
          }
        },
      });

      const handleResize = () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Telescope banner animation
  useGSAP(
    () => {
      if (!isReady) return;

      const bannerContainer = document.querySelector(".banner-img-container");
      const bannerIntroTextElements = gsap.utils.toArray(".banner-intro-text");
      const bannerMaskLayers = gsap.utils.toArray(".mask");
      const bannerHeader = document.querySelector(".banner-header h1");

      if (!bannerHeader) return;

      const splitText = new SplitText(bannerHeader, { type: "words" });
      const words = splitText.words;
      gsap.set(words, { opacity: 0 });

      bannerMaskLayers.forEach((layer, i) => {
        gsap.set(layer, { scale: 0.9 - i * 0.2 });
      });
      gsap.set(bannerContainer, { scale: 0 });

      ScrollTrigger.create({
        trigger: ".banner",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.set(bannerContainer, { scale: progress });

          bannerMaskLayers.forEach((layer, i) => {
            const initialScale = 0.9 - i * 0.2;
            const layerProgress = Math.min(progress / 0.9, 1.0);
            const currentScale = initialScale + layerProgress * (1.0 - initialScale);
            gsap.set(layer, { scale: currentScale });
          });

          if (progress <= 0.9) {
            const textProgress = progress / 0.9;
            const moveDistance = window.innerWidth * 0.5;
            gsap.set(bannerIntroTextElements[0], { x: -textProgress * moveDistance });
            gsap.set(bannerIntroTextElements[1], { x: textProgress * moveDistance });
          }

          if (progress >= 0.7 && progress <= 0.9) {
            const headerProgress = (progress - 0.7) / 0.2;
            const totalWords = words.length;

            words.forEach((word, i) => {
              const wordStartDelay = i / totalWords;
              const wordEndDelay = (i + 1) / totalWords;

              let wordOpacity = 0;

              if (headerProgress >= wordEndDelay) {
                wordOpacity = 1;
              } else if (headerProgress >= wordStartDelay) {
                const wordProgress = (headerProgress - wordStartDelay) / (wordEndDelay - wordStartDelay);
                wordOpacity = wordProgress;
              }

              gsap.set(word, { opacity: wordOpacity });
            });
          } else if (progress < 0.7) {
            gsap.set(words, { opacity: 0 });
          } else if (progress > 0.9) {
            gsap.set(words, { opacity: 1 });
          }
        },
      });
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Skills & Experience - Sticky Animated Columns (from folder 265)
  useGSAP(
    () => {
      if (!isReady) return;

      // Initialize text split for animated columns - Skills section
      const initTextSplit = (selector) => {
        const textElements = document.querySelectorAll(selector);
        textElements.forEach((element) => {
          if (element.classList.contains("split-done")) return;
          element.classList.add("split-done");
          const split = new SplitText(element, {
            type: "lines",
            linesClass: "line",
          });
          split.lines.forEach(
            (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
          );
        });
      };

      initTextSplit("#skills.sticky-cols .col-3 h1, #skills.sticky-cols .col-3 p");

      // Set initial states for Skills section
      gsap.set("#skills.sticky-cols .col-3 .col-content-wrapper", { opacity: 1 });
      gsap.set("#skills.sticky-cols .col-3 .col-content-wrapper-2", { opacity: 0, pointerEvents: "none" });

      // Pin the Skills sticky columns section
      ScrollTrigger.create({
        trigger: "#skills.sticky-cols",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
      });

      let skillsPhase = 0;

      // Animate Skills columns based on scroll progress
      ScrollTrigger.create({
        trigger: "#skills.sticky-cols",
        start: "top top",
        end: `+=${window.innerHeight * 6}px`,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.3 && skillsPhase === 0) {
            skillsPhase = 1;
            gsap.to("#skills.sticky-cols .col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-2", { x: "0%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-3", { y: "0%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-1 img", { scale: 1.25, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-2", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-2 img", { scale: 1, duration: 0.75 });
          }

          if (progress >= 0.6 && skillsPhase === 1) {
            skillsPhase = 2;
            gsap.to("#skills.sticky-cols .col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-3", { x: "0%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-4", { y: "0%", duration: 0.75 });
            // Fade out skills, fade in professional journey
            gsap.to("#skills.sticky-cols .col-3 .col-content-wrapper", { opacity: 0, duration: 0.5 });
            gsap.to("#skills.sticky-cols .col-3 .col-content-wrapper-2", { opacity: 1, pointerEvents: "auto", duration: 0.5, delay: 0.3 });
          }

          if (progress < 0.3 && skillsPhase >= 1) {
            skillsPhase = 0;
            gsap.to("#skills.sticky-cols .col-1", { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-2", { x: "100%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-3", { y: "100%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-1 img", { scale: 1, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-2", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-img-2 img", { scale: 1.25, duration: 0.75 });
          }

          if (progress < 0.6 && skillsPhase === 2) {
            skillsPhase = 1;
            gsap.to("#skills.sticky-cols .col-2", { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-3", { x: "100%", duration: 0.75 });
            gsap.to("#skills.sticky-cols .col-4", { y: "100%", duration: 0.75 });
            // Fade in skills, fade out professional journey
            gsap.to("#skills.sticky-cols .col-3 .col-content-wrapper", { opacity: 1, duration: 0.5, delay: 0.3 });
            gsap.to("#skills.sticky-cols .col-3 .col-content-wrapper-2", { opacity: 0, pointerEvents: "none", duration: 0.5 });
          }
        },
      });
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Feature Cards Animation
  useGSAP(
    () => {
      if (!isReady) return;

      const featureCards = document.querySelectorAll(".feature-card");
      
      if (featureCards.length === 0) return;

      // Animate feature cards on scroll
      featureCards.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15,
          }
        );
      });
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Projects - Horizontal Scroll Carousel
  useGSAP(
    () => {
      if (!isReady) return;

      const projectsCarousel = document.querySelector(".projects-carousel");
      const projectSlides = document.querySelectorAll(".project-slide");
      
      if (!projectsCarousel || projectSlides.length === 0) return;

      // Calculate total width for horizontal scroll
      const totalWidth = projectsCarousel.scrollWidth - window.innerWidth;

      // Pin and horizontal scroll
      ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top top",
        end: `+=${totalWidth}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(projectsCarousel, {
            x: -self.progress * totalWidth,
          });
        },
      });

      // Animate individual slides on scroll
      projectSlides.forEach((slide, index) => {
        gsap.fromTo(slide.querySelector(".project-slide-content"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: null,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  // Show loading screen until ready
  if (!isReady || !gsapLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <img src={withBasePath("/logo.png")} alt="Logo" className="logo-image" />
            <div className="logo-circle"></div>
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
          <p className="loading-text">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"
        strategy="afterInteractive"
      />
      <Script
        type="module"
        src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/ionicons/ionicons.esm.js"
        strategy="afterInteractive"
      />
      <Script
        noModule
        src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/ionicons/ionicons.js"
        strategy="afterInteractive"
      />

      <Menu />

      <div ref={containerRef} className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero">
          <canvas ref={canvasRef}></canvas>
          <div className="hero-content">
            <div className="header" ref={heroContentRef}>
              {/* Hero content - intentionally minimal */}
            </div>
          </div>
        </section>

        {/* About Section - Telescope Banner */}
        <section id="about" className="banner">
          <div className="banner-img-container">
            <div className="img">
              <img src={withBasePath("/dashboard.png")} alt="Dashboard Preview" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>
            <div className="img mask">
              <img src={withBasePath("/dashboard.png")} alt="" />
            </div>

            <div className="banner-header">
              <h1>Full Stack Developer with expertise in troubleshooting, domain management, web hosting, and cloud-based deployments</h1>
            </div>
          </div>

          <div className="banner-intro-text-container">
            <div className="banner-intro-text">
              <h1>About</h1>
            </div>
            <div className="banner-intro-text">
              <h1>Me</h1>
            </div>
          </div>
        </section>

        {/* About Detail Section with Feature Cards */}
        <section className="about-detail">
          <div className="about-content">
            <div className="about-header">
              <h2>Building Scalable Modern Applications</h2>
              <p className="about-intro">
                I build scalable, modern applications using JAMstack, serverless architectures, and CI/CD workflows.
              </p>
            </div>
            
            <div className="feature-cards">
              {/* CRM Platform Card */}
              <div className="feature-card">
                <div className="feature-card-icon">
                  <ion-icon name="grid-outline"></ion-icon>
                </div>
                <div className="feature-card-content">
                  <h3>Full-Stack CRM Platform</h3>
                  <p>
                    Developed a comprehensive CRM platform covering attendance, payroll, sales, benefits, 
                    accounting, analytics, and role-based access.
                  </p>
                  <div className="feature-tech-stack">
                    <span>Supabase</span>
                    <span>Edge Functions</span>
                    <span>React</span>
                    <span>Docker</span>
                  </div>
                  <ul className="feature-highlights">
                    <li>Attendance & Payroll Management</li>
                    <li>Sales & Benefits Tracking</li>
                    <li>Accounting & Analytics Dashboard</li>
                    <li>Role-Based Access Control</li>
                  </ul>
                </div>
              </div>

              {/* RingCentral Integration Card */}
              <div className="feature-card">
                <div className="feature-card-icon">
                  <ion-icon name="call-outline"></ion-icon>
                </div>
                <div className="feature-card-content">
                  <h3>RingCentral Integration</h3>
                  <p>
                    Led a complete RingCentral integration into the CRM, enabling seamless communication 
                    features and real-time analytics.
                  </p>
                  <div className="feature-tech-stack">
                    <span>RingCentral API</span>
                    <span>OAuth 2.0</span>
                    <span>Webhooks</span>
                    <span>JWT</span>
                  </div>
                  <ul className="feature-highlights">
                    <li>In-App Calling & Messaging</li>
                    <li>Real-Time Presence Tracking</li>
                    <li>Call Analytics & Logging</li>
                    <li>Webhook-Based Event Processing</li>
                  </ul>
                </div>
              </div>

              {/* E-commerce Card */}
              <div className="feature-card">
                <div className="feature-card-icon">
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
                <div className="feature-card-content">
                  <h3>E-Commerce Solutions</h3>
                  <p>
                    Built multiple e-commerce sites with fast deployment and secure backend functions 
                    for order and inventory management.
                  </p>
                  <div className="feature-tech-stack">
                    <span>Next.js</span>
                    <span>Tailwind CSS</span>
                    <span>Stripe</span>
                    <span>Sanity CMS</span>
                  </div>
                  <ul className="feature-highlights">
                    <li>Headless CMS Integration</li>
                    <li>Secure Payment Processing</li>
                    <li>Fast Netlify Deployment</li>
                    <li>Inventory Management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Experience - Sticky Animated Columns (from folder 265) */}
        <section id="skills" className="sticky-cols">
          <div className="sticky-cols-wrapper">
            {/* Column 1: Intro text */}
            <div className="col col-1">
              <div className="col-content">
                <div className="col-content-wrapper">
                  <h1>Full Stack Skills & Professional Experience</h1>
                  <p>
                    Technologies I work with and my career journey building scalable applications,
                    from web hosting to modern JAMstack architectures.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Skills Images */}
            <div className="col col-2">
              <div className="col-img col-img-1">
                <div className="col-img-wrapper">
                  <img src={withBasePath("/img_02.jpg")} alt="Skills" />
                </div>
              </div>
              <div className="col-img col-img-2">
                <div className="col-img-wrapper">
                  <img src={withBasePath("/img_03.jpg")} alt="Experience" />
                </div>
              </div>
            </div>

            {/* Column 3: Skills Text + Experience Text */}
            <div className="col col-3">
              <div className="col-content-wrapper">
                <h1>Technical Expertise</h1>
                <div className="skills-list">
                  {skillsData.map((cat, idx) => (
                    <div key={idx} className="skill-item">
                      <strong>{cat.category}:</strong> {cat.skills.join(", ")}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-content-wrapper-2">
                <h1>Professional Journey</h1>
                <p>
                  <strong>Netlify - Support Engineer (Current)</strong><br />
                  Diagnose and resolve complex issues related to web development, deployment pipelines, and platform configurations.
                </p>
                <p>
                  <strong>Newfold Digital - 4 yrs 4 mos</strong><br />
                  Executive Response Specialist • Service Resolution Tier II • Domain, Email, Hosting Specialist
                </p>
              </div>
            </div>

            {/* Column 4: Experience Image */}
            <div className="col col-4">
              <div className="col-img">
                <div className="col-img-wrapper">
                  <img src={withBasePath("/img_01.jpg")} alt="Romeo Lagarto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects - Multi-slide Section */}
        <section id="projects" className="projects-section">
          <div className="projects-header">
            <h2>Featured Projects</h2>
            <p>A showcase of my full-stack development work</p>
          </div>
          
          <div className="projects-carousel">
            {projectsData.map((project, idx) => (
              <div key={idx} className="project-slide">
                <div className="project-slide-inner">
                  <div className="project-slide-image">
                    <img 
                      src={project.image.startsWith("/") ? withBasePath(project.image) : project.image} 
                      alt={project.title} 
                    />
                  </div>
                  <div className="project-slide-content">
                    <span className="project-number">{String(idx + 1).padStart(2, '0')}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech-inline">
                      {project.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                    {project.features && project.features.length > 0 && (
                      <ul className="project-features">
                        {project.features.slice(0, 4).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
