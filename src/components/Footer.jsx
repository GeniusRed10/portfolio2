"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from "next/script";

const Footer = () => {
  const containerRef = useRef(null);
  const physicsInitialized = useRef(false);

  const skillTags = [
    // Core Tech
    "HTML",
    "CSS",
    "JavaScript",
    "GSAP",
    "ScrollTrigger",
    "Lenis",
    "React",
    "Next.js",
    "WebGL",
    "Three.js",
    "Creative Dev",
    // Web & Cloud Hosting
    "cPanel/WHM",
    "VPS",
    "Dedicated Servers",
    "DNS Management",
    "SSL Configuration",
    // Frontend & Backend
    "Vue.js",
    "PHP",
    "MySQL",
    "PlpgSQL",
    "TypeScript",
    "Shell",
    // JAMstack & Serverless
    "Astro",
    "Gatsby",
    "AWS Lambda",
    "Cloudflare Workers",
    "Firebase",
    // Version Control & CI/CD
    "Git",
    "GitHub",
    "GitLab",
    "GitHub Actions",
    "GitLab CI/CD",
    "CircleCI",
    // Database & Storage
    "FaunaDB",
    "Supabase",
    "Firebase Firestore",
    "PostgreSQL",
    "AWS S3",
    "Cloudinary",
    // Security & Performance
    "OAuth",
    "JWT",
    "Auth0",
    "Web Vitals",
    "GTmetrix",
    "SEMrush",
    // Project tools
    "Docker",
    "RingCentral API",
    "Webhooks",
    "Edge Functions",
    "Node.js",
    "MongoDB",
    "Express",
    "Stripe",
    "Sanity CMS",
    "Vercel",
    "Tailwind CSS",
    "Netlify",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const config = {
      gravity: { x: 0, y: 1 },
      restitution: 0.5,
      friction: 0.15,
      frictionAir: 0.02,
      density: 0.002,
      wallThickness: 200,
      mouseStiffness: 0.6,
    };

    let engine, runner, mouseConstraint, bodies = [], topWall = null;

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function initPhysics(container) {
      if (physicsInitialized.current || typeof Matter === "undefined") return;
      physicsInitialized.current = true;

      engine = Matter.Engine.create();
      engine.gravity = config.gravity;
      engine.constraintIterations = 10;
      engine.positionIterations = 20;
      engine.velocityIterations = 16;
      engine.timing.timeScale = 1;

      const containerRect = container.getBoundingClientRect();
      const wallThickness = config.wallThickness;

      const walls = [
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
      ];
      Matter.World.add(engine.world, walls);

      const objects = container.querySelectorAll(".physics-object");
      objects.forEach((obj, index) => {
        const objRect = obj.getBoundingClientRect();

        const startX =
          Math.random() * (containerRect.width - objRect.width) +
          objRect.width / 2;
        const startY = -500 - index * 200;
        const startRotation = (Math.random() - 0.5) * Math.PI;

        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          objRect.width,
          objRect.height,
          {
            restitution: config.restitution,
            friction: config.friction,
            frictionAir: config.frictionAir,
            density: config.density,
          }
        );

        Matter.Body.setAngle(body, startRotation);

        bodies.push({
          body: body,
          element: obj,
          width: objRect.width,
          height: objRect.height,
        });

        Matter.World.add(engine.world, body);
      });

      setTimeout(() => {
        topWall = Matter.Bodies.rectangle(
          containerRect.width / 2,
          -wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        );
        Matter.World.add(engine.world, topWall);
      }, 3000);

      const mouse = Matter.Mouse.create(container);
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });

      mouseConstraint.mouse.element.oncontextmenu = () => false;

      let dragging = null;
      let originalInertia = null;

      Matter.Events.on(mouseConstraint, "startdrag", function (event) {
        dragging = event.body;
        if (dragging) {
          originalInertia = dragging.inertia;
          Matter.Body.setInertia(dragging, Infinity);
          Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(dragging, 0);
        }
      });

      Matter.Events.on(mouseConstraint, "enddrag", function (event) {
        if (dragging) {
          Matter.Body.setInertia(dragging, originalInertia || 1);
          dragging = null;
          originalInertia = null;
        }
      });

      Matter.Events.on(engine, "beforeUpdate", function () {
        if (dragging) {
          const found = bodies.find((b) => b.body === dragging);
          if (found) {
            const minX = found.width / 2;
            const maxX = containerRect.width - found.width / 2;
            const minY = found.height / 2;
            const maxY = containerRect.height - found.height / 2;

            Matter.Body.setPosition(dragging, {
              x: clamp(dragging.position.x, minX, maxX),
              y: clamp(dragging.position.y, minY, maxY),
            });

            Matter.Body.setVelocity(dragging, {
              x: clamp(dragging.velocity.x, -20, 20),
              y: clamp(dragging.velocity.y, -20, 20),
            });
          }
        }
      });

      container.addEventListener("mouseleave", () => {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null;
      });

      document.addEventListener("mouseup", () => {
        if (mouseConstraint) {
          mouseConstraint.constraint.bodyB = null;
          mouseConstraint.constraint.pointB = null;
        }
      });

      Matter.World.add(engine.world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      function updatePositions() {
        bodies.forEach(({ body, element, width, height }) => {
          const x = clamp(
            body.position.x - width / 2,
            0,
            containerRect.width - width
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 3,
            containerRect.height - height
          );

          element.style.left = x + "px";
          element.style.top = y + "px";
          element.style.transform = `rotate(${body.angle}rad)`;
        });

        requestAnimationFrame(updatePositions);
      }
      updatePositions();
    }

    // Initialize physics when footer comes into view
    const initObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = containerRef.current?.querySelector(".object-container");
            if (container) {
              // Wait for Matter.js to be available
              const checkMatter = () => {
                if (typeof Matter !== "undefined") {
                  initPhysics(container);
                } else {
                  setTimeout(checkMatter, 100);
                }
              };
              checkMatter();
            }
            initObserver.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      initObserver.observe(containerRef.current);
    }

    return () => {
      initObserver.disconnect();
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"
        strategy="beforeInteractive"
      />
      <section id="footer" className="footer" ref={containerRef}>
        <div className="object-container">
          {skillTags.map((tag, index) => (
            <div key={index} className="physics-object">
              <p>{tag}</p>
            </div>
          ))}
        </div>

        <div className="footer-content">
          <h1>Let&apos;s build something amazing together.</h1>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Romeo Lagarto. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
