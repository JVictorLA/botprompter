import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Logo + Bot
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20, scale: 0.9, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Barra de progresso
    tl.to(
      progressBarRef.current,
      {
        width: '100%',
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: function () {
          setPercentage(Math.round(this.progress() * 100));
        },
      },
      '-=0.4'
    );

    // Saída
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(14px)',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      {/* Grid futurista */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#6E44FF_1px,transparent_0)] bg-[size:40px_40px]" />

      {/* Glow Orbs */}
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl -top-24 -left-24 animate-pulse" />
      <div className="absolute w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000" />

      {/* LOGO */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl mb-6">
          <img
            src="/botPrompter.png"
            alt="PromptStudio AI"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          PromptStudio AI
        </h1>

        <p className="mt-2 text-xs md:text-sm tracking-[0.35em] uppercase text-gray-400">
          Inicializando Inteligência
        </p>
      </div>

      {/* Progress */}
      <div className="relative z-10 w-64 md:w-72 h-1.5 bg-gray-800/60 rounded-full overflow-hidden mt-12">
        <div
          ref={progressBarRef}
          className="h-full w-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full shadow-lg"
        />
      </div>

      {/* Percentage */}
      <span className="relative z-10 mt-4 text-xs tracking-widest text-cyan-300">
        {percentage}%
      </span>
    </div>
  );
};

export default Preloader;
