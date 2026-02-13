import React, { useEffect, useRef } from 'react';
import './WelcomeAnimation.css';

const WelcomeAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
        // Create sparkle instead of 'o'
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
      } else {
        span.textContent = letter;
        container.appendChild(span);
      }

      // After entrance animation finishes, add idle animation
      const entranceTime = (index * 0.15 + 1.2) * 1000;
      setTimeout(() => {
        span.classList.add(idleAnimations[index % idleAnimations.length]);
      }, entranceTime);
    });

    // After subtitle animations finish, remove animation so hover works
    const subtitleWords = subtitleRef.current?.querySelectorAll('.subtitle-word');
    subtitleWords?.forEach((word, i) => {
      const delay = 2000 + i * 120 + 500;
      setTimeout(() => {
        const el = word as HTMLElement;
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.classList.add('subtitle-word-ready');
      }, delay);
    });
  }, []);

  return (
    <div className="welcome-animation-wrapper">
      <div className="welcome-container">
        <div className="welcome" ref={containerRef}></div>
        <p className="subtitle" ref={subtitleRef}>
          <span className="subtitle-word subtitle-word-0">to</span>{' '}
          <span className="subtitle-word subtitle-word-1">my</span>{' '}
          <span className="subtitle-word subtitle-word-2">little</span>{' '}
          <span className="subtitle-word subtitle-word-3">part</span>{' '}
          <span className="subtitle-word subtitle-word-4">of</span>{' '}
          <span className="subtitle-word subtitle-word-5">the</span>{' '}
          <span className="subtitle-word subtitle-word-6">internet</span>
        </p>
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;