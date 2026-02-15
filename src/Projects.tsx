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
  },
  {
    title: 'Surgical Video AI',
    desc: 'Segmentation & classification pipelines for surgical videos with task-specific overlays and real-time inference.',
    tags: ['Python', 'PyTorch', 'React'],
  },
  {
    title: 'SickKids Research',
    desc: 'Algorithm to process sensor data — heart rate, skin proximity, EDA — and track device wear time for paediatric thrombosis.',
    tags: ['Python', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'SIIM Hackathon',
    desc: 'LLM-driven RAG prototype to extract structured findings from radiology reports into FHIR Observation resources.',
    tags: ['Python', 'Gemini', 'FHIR'],
  },
  {
    title: '3D DICOM Pipeline',
    desc: 'Converted 2D Cartesian image sequences into 3D DICOM volumes with spatial alignment and volumetric reconstruction.',
    tags: ['Python', 'DICOM', 'NumPy'],
  },
  {
    title: 'Radiology Labelling',
    desc: 'Expert augmentation framework for radiology report labelling to support AI model fine-tuning at scale.',
    tags: ['Python', 'NLP', 'Data Eng'],
  },
];

function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const star = starRef.current;
    const shadow = shadowRef.current;
    if (!wrapper || !track || !star || !shadow) return;

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
        },
      });

      const rollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          scrub: 0.4,
          start: 'center center',
          end: 'bottom top',
        },
      });

      rollTl.fromTo(star,
        { x: -100, rotation: 0 },
        { x: window.innerWidth + 100, rotation: 1440, ease: 'none' }
      );
      rollTl.fromTo(shadow,
        { x: -100, opacity: 0.3 },
        { x: window.innerWidth + 100, opacity: 0.15, ease: 'none' },
        '<'
      );
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
              <h3 className="projects-card-title">{project.title}</h3>
              <p className="projects-card-desc">{project.desc}</p>
              <div className="projects-card-tags">
                {project.tags.map((tag) => (
                  <span className="projects-card-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="projects-roll-area">
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
