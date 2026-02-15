import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FooterRoll.css';

gsap.registerPlugin(ScrollTrigger);

function FooterRoll() {
  const sectionRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const star = starRef.current;
    const shadow = shadowRef.current;
    if (!section || !star || !shadow) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      tl.fromTo(star,
        { x: '-10vw', rotation: 0 },
        { x: '110vw', rotation: 1080, ease: 'none' }
      );

      tl.fromTo(shadow,
        { x: '-10vw', scaleX: 0.6, opacity: 0.2 },
        { x: '110vw', scaleX: 1, opacity: 0.3, ease: 'none' },
        '<'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="footer-roll" ref={sectionRef}>
      <div className="footer-roll-star" ref={starRef}>
        <div className="footer-roll-sparkle">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="footer-roll-ray" key={i} />
          ))}
        </div>
      </div>
      <div className="footer-roll-shadow" ref={shadowRef} />
    </section>
  );
}

export default FooterRoll;
