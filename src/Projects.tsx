import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'REMEDA',
    desc: 'AI-powered clinical platform for intake, transcription & real-time provider tools with OpenMRS FHIR integration.',
    tags: ['React', 'Flask', 'FHIR'],
    image: '/images/remeda.png',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 – Present',
    highlights: [
      'Built real-time transcription pipeline with WebSocket streaming',
      'Integrated OpenMRS FHIR API for patient data exchange',
      'Designed provider dashboard with live clinical decision support',
    ],
  },
  {
    title: 'Surgical Video AI',
    desc: 'Segmentation & classification pipelines for surgical videos with task-specific overlays and real-time inference.',
    tags: ['Python', 'PyTorch', 'React'],
    image: '/images/surgical-ai.png',
    role: 'ML Engineer',
    period: 'Jun 2024 – Aug 2024',
    highlights: [
      'Trained U-Net segmentation models on annotated surgical frames',
      'Built real-time inference overlay system for operating room displays',
      'Achieved 92% mIoU on instrument segmentation benchmarks',
    ],
  },
  {
    title: 'SickKids Research',
    desc: 'Algorithm to process sensor data — heart rate, skin proximity, EDA — and track device wear time for paediatric thrombosis.',
    tags: ['Python', 'PostgreSQL', 'Docker'],
    image: '/images/sickkids.png',
    role: 'Research Developer',
    period: 'Jan 2024 – May 2024',
    highlights: [
      'Developed signal processing pipeline for multi-sensor wearable data',
      'Automated wear-time detection with 95%+ accuracy',
      'Containerised analysis workflow for reproducible research',
    ],
  },
  {
    title: 'SIIM Hackathon',
    desc: 'LLM-driven RAG prototype to extract structured findings from radiology reports into FHIR Observation resources.',
    tags: ['Python', 'Gemini', 'FHIR'],
    image: '/images/siim.png',
    role: 'Backend Developer',
    period: 'Mar 2024',
    highlights: [
      'Designed RAG pipeline with Gemini for radiology report parsing',
      'Mapped extracted findings to FHIR Observation resources',
      'Presented prototype at SIIM annual conference',
    ],
  },
  {
    title: '3D DICOM Pipeline',
    desc: 'Converted 2D Cartesian image sequences into 3D DICOM volumes with spatial alignment and volumetric reconstruction.',
    tags: ['Python', 'DICOM', 'NumPy'],
    image: '/images/dicom-pipeline.png',
    role: 'Software Developer',
    period: 'Nov 2023 – Feb 2024',
    highlights: [
      'Built spatial alignment engine for multi-slice image registration',
      'Implemented volumetric reconstruction from 2D Cartesian sequences',
      'Validated output against clinical DICOM viewers',
    ],
  },
  {
    title: 'Radiology Labelling',
    desc: 'Expert augmentation framework for radiology report labelling to support AI model fine-tuning at scale.',
    tags: ['Python', 'NLP', 'Data Eng'],
    image: '/images/rad-labelling.png',
    role: 'Data Engineer',
    period: 'Aug 2023 – Oct 2023',
    highlights: [
      'Architected labelling pipeline processing 10K+ radiology reports',
      'Integrated NLP pre-labelling to reduce expert annotation time by 40%',
      'Built quality assurance dashboard for inter-annotator agreement',
    ],
  },
];

function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const rollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const star = starRef.current;
    const shadow = shadowRef.current;
    const rollArea = rollAreaRef.current;
    if (!wrapper || !track || !star || !shadow || !rollArea) return;

    const setWrapperHeight = () => {
      const scrollDist = track.scrollWidth - window.innerWidth;
      wrapper.style.height = `${window.innerHeight + scrollDist}px`;
    };
    setWrapperHeight();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          scrub: 0.6,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onRefresh: setWrapperHeight,
        },
      });

      const rollDist = window.innerWidth + 400;

      // Repeating loop timeline (starts after initial roll)
      const loopTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 3,
        paused: true,
      });

      loopTl.fromTo(star, { x: 0, rotation: 0 }, {
        x: rollDist,
        rotation: 1440,
        duration: 3,
        ease: 'power1.inOut',
      });
      loopTl.fromTo(shadow, { x: 0 }, {
        x: rollDist,
        duration: 3,
        ease: 'power1.inOut',
      }, '<');

      // Initial roll on first scroll into view
      const introTl = gsap.timeline({
        paused: true,
        onComplete: () => { loopTl.play(0); },
      });

      introTl.fromTo(star, { x: 0, rotation: 0 }, {
        x: rollDist,
        rotation: 1440,
        duration: 3,
        ease: 'power1.inOut',
      });
      introTl.fromTo(shadow, { x: 0 }, {
        x: rollDist,
        duration: 3,
        ease: 'power1.inOut',
      }, '<');

      let hasEntered = false;

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 80%',
        end: 'bottom top',
        onEnter: () => {
          if (!hasEntered) {
            hasEntered = true;
            introTl.restart();
          } else {
            loopTl.resume();
          }
        },
        onLeave: () => loopTl.pause(),
        onEnterBack: () => loopTl.resume(),
        onLeaveBack: () => { loopTl.pause(); hasEntered = false; introTl.pause(0); loopTl.pause(0); },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-wrapper" ref={wrapperRef}>
        <div className="projects-sticky" ref={stickyRef}>
          <div className="projects-track" ref={trackRef}>
            <div className="projects-intro">
              <h2 className="projects-heading">Projects</h2>
              <p className="projects-subheading">Scroll to explore</p>
            </div>
            {projects.map((project, i) => (
              <div className="projects-card" key={project.title}>
                <div className="projects-card-number">0{i + 1}</div>
                <div className="projects-card-accent" />
                <div className="projects-card-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <h3 className="projects-card-title">{project.title}</h3>
                <p className="projects-card-meta">{project.role} · {project.period}</p>
                <p className="projects-card-desc">{project.desc}</p>
                <ul className="projects-card-highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="projects-card-tags">
                  {project.tags.map((tag) => (
                    <span className="projects-card-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="projects-roll-area" ref={rollAreaRef}>
          <div className="projects-roll-star" ref={starRef}>
            <div className="inline-sparkle">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="sparkle-ray" key={i} />
              ))}
            </div>
          </div>
          <div className="projects-roll-shadow" ref={shadowRef} />
        </div>
    </div>
  );
}

export default Projects;
