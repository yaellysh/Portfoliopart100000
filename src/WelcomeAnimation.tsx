import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WelcomeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'REMEDA', desc: 'AI-powered clinical platform for intake, transcription & real-time provider tools with OpenMRS FHIR integration.', tags: 'React · Flask · FHIR' },
  { title: 'Surgical Video AI', desc: 'Segmentation & classification pipelines for surgical videos with task-specific overlays and real-time inference.', tags: 'Python · PyTorch · React' },
  { title: 'SickKids Research', desc: 'Algorithm to process sensor data — heart rate, skin proximity, EDA — and track device wear time for paediatric thrombosis.', tags: 'Python · PostgreSQL · Docker' },
  { title: 'SIIM Hackathon', desc: 'LLM-driven RAG prototype to extract structured findings from radiology reports into FHIR Observation resources.', tags: 'Python · Gemini · FHIR' },
  { title: '3D DICOM Pipeline', desc: 'Converted 2D Cartesian image sequences into 3D DICOM volumes with spatial alignment and volumetric reconstruction.', tags: 'Python · DICOM · NumPy' },
  { title: 'Radiology Labelling', desc: 'Expert augmentation framework for radiology report labelling to support AI model fine-tuning at scale.', tags: 'Python · NLP · Data Eng' },
];

const CardColumn = ({ direction }: { direction: 'up' | 'down' }) => (
  <div className="card-column">
    <div className={`card-track card-track-${direction}`}>
      {[...projects, ...projects].map((project, i) => (
        <div className="project-card" key={i}>
          <div className="project-card-accent" />
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>
          <span className="project-card-tags">{project.tags}</span>
        </div>
      ))}
    </div>
  </div>
);

const WelcomeAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLSpanElement>(null);
  const groundShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const text = "Welcome";
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const idleAnimations = ['idle-bounce', 'idle-wiggle', 'idle-pulse', 'idle-float', 'idle-jello', 'idle-tilt', 'idle-wave'];

    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.className = `letter letter-${index}`;
      span.style.animationDelay = `${index * 0.15}s`;

      if (letter.toLowerCase() === 'o') {
        const sparkleContainer = document.createElement('span');
        sparkleContainer.className = 'sparkle-letter';
        sparkleContainer.style.animationDelay = `${index * 0.15}s`;

        const sparkle = document.createElement('div');
        sparkle.className = 'inline-sparkle';

        for (let i = 0; i < 8; i++) {
          const ray = document.createElement('div');
          ray.className = 'sparkle-ray';
          sparkle.appendChild(ray);
        }

        sparkleContainer.appendChild(sparkle);
        container.appendChild(sparkleContainer);

        // Store ref for scroll animation
        (sparkleRef as React.MutableRefObject<HTMLSpanElement | null>).current = sparkleContainer;
      } else {
        span.textContent = letter;
        container.appendChild(span);
      }

      const entranceTime = (index * 0.15 + 1.2) * 1000;
      timers.push(setTimeout(() => {
        span.classList.add(idleAnimations[index % idleAnimations.length]);
      }, entranceTime));
    });

    // After subtitle animations finish, remove animation so hover works
    const subtitleWords = subtitleRef.current?.querySelectorAll('.subtitle-word');
    subtitleWords?.forEach((word, i) => {
      const delay = 2000 + i * 250 + 700;
      timers.push(setTimeout(() => {
        const el = word as HTMLElement;
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.classList.add('subtitle-word-ready');
      }, delay));
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
      // Reset subtitle words so animations replay on remount
      subtitleWords?.forEach((word) => {
        const el = word as HTMLElement;
        el.style.animation = '';
        el.style.opacity = '';
        el.classList.remove('subtitle-word-ready');
      });
    };
  }, []);

  // Scroll-triggered sparkle bounce & roll animation
  useEffect(() => {
    let scrollCleanup: (() => void) | undefined;
    // Wait for entrance animations to finish before setting up scroll
    const setupDelay = setTimeout(() => {
      const sparkle = sparkleRef.current;
      const wrapper = wrapperRef.current;
      const shadow = groundShadowRef.current;
      if (!sparkle || !wrapper || !shadow) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const sparkleRect = sparkle.getBoundingClientRect();

      // Calculate how far the sparkle needs to drop so its bottom edge hits the wrapper bottom
      const dropDistance = wrapperRect.bottom - sparkleRect.bottom;
      // Roll off to the right side of the screen (use viewport width to ensure it goes fully off)
      const rollDistance = window.innerWidth - sparkleRect.left + sparkleRect.width;

      // Position the ground shadow at the landing spot
      const sparkleCenter = sparkleRect.left + sparkleRect.width / 2 - wrapperRect.left;
      gsap.set(shadow, {
        left: sparkleCenter,
        bottom: -8,
        xPercent: -50,
      });

      // Create a timeline that auto-plays once scroll is detected
      const tl = gsap.timeline({ paused: true });

      // Phase 1: Drop to the bottom with a smooth bounce
      // Shadow grows as star falls
      tl.to(sparkle, {
        y: dropDistance,
        duration: 0.6,
        ease: 'power2.in',
      })
      .to(shadow, {
        opacity: 0.5,
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.in',
      }, '<')
      .to(sparkle, {
        y: dropDistance * 0.7,
        duration: 0.25,
        ease: 'power2.out',
      })
      .to(shadow, {
        opacity: 0.25,
        scaleX: 0.6,
        duration: 0.25,
        ease: 'power2.out',
      }, '<')
      .to(sparkle, {
        y: dropDistance,
        duration: 0.25,
        ease: 'power2.in',
      })
      .to(shadow, {
        opacity: 0.5,
        scaleX: 1,
        duration: 0.25,
        ease: 'power2.in',
      }, '<')
      // Phase 2: Roll away flat — shadow follows
      .to(sparkle, {
        x: rollDistance,
        rotation: 720,
        duration: 1.2,
        ease: 'power1.in',
      })
      .to(shadow, {
        x: rollDistance,
        opacity: 0,
        duration: 1.2,
        ease: 'power1.in',
      }, '<');

      // Play on any scroll, reverse when back at top
      let hasPlayed = false;
      const onScroll = () => {
        if (window.scrollY > 0 && !hasPlayed) {
          hasPlayed = true;
          tl.play();
        } else if (window.scrollY === 0 && hasPlayed) {
          hasPlayed = false;
          tl.reverse();
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      scrollCleanup = () => window.removeEventListener('scroll', onScroll);
    }, 4500); // Wait for entrance animations

    return () => {
      clearTimeout(setupDelay);
      scrollCleanup?.();
    };
  }, []);

  return (
    <div className="welcome-animation-wrapper" ref={wrapperRef}>
      <div className="welcome-container">
        <div className="welcome" ref={containerRef}></div>
        <p className="subtitle" ref={subtitleRef}>
          <span className="subtitle-word subtitle-word-0">to</span>{' '}
          <span className="subtitle-word subtitle-word-1">my</span>{' '}
          <span className="subtitle-word subtitle-word-2">little</span>{' '}
          <span className="subtitle-word subtitle-word-3">part</span>{' '}
          <span className="subtitle-word subtitle-word-4">of</span>{' '}
          <span className="subtitle-word subtitle-word-5">the</span>{' '}
          <span className="subtitle-word subtitle-word-6">internet.</span>
        </p>
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
      </div>
      <div className="card-column-wrapper">
        <CardColumn direction="down" />
      </div>
      <div className="ground-shadow" ref={groundShadowRef}></div>
    </div>
  );
};

export default WelcomeAnimation;
