import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.to(
      progressBarRef.current,
      {
        width: '100%',
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          setPercentage(progress);
        },
      },
      '-=0.3'
    );

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="light-beam opacity-50" />
      
      {/* Floating orbs */}
      <div className="glow-orb w-64 h-64 -top-20 -left-20 animate-float" />
      <div className="glow-orb w-48 h-48 -bottom-10 -right-10 animate-float" style={{ animationDelay: '2s' }} />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-extralight tracking-widest text-foreground">
          <span className="text-gradient font-medium">João</span>Victor
        </h1>
        <p className="text-muted-foreground text-sm tracking-[0.3em] mt-2 uppercase">
          Web Developer
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-container mt-12">
        <div ref={progressBarRef} className="progress-bar" />
      </div>
      
      {/* Percentage */}
      <span ref={percentageRef} className="text-primary text-sm font-light mt-4 tracking-wider">
        {percentage}%
      </span>
    </div>
  );
};

export default Preloader;