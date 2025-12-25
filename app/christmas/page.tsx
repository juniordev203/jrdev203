'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ============================================
// CUSTOMIZATION VARIABLES
// ============================================
const CONFIG = {
  girlfriendName: 'Ín Nhi',
  photos: [
    '/image/anh1.jpg',
    '/image/anh2.jpg',
    '/image/anh3.jpg',
  ],
  message: {
    title: 'Marry Christmas, Em!',
    content: `Không biết vít rì cả, chúc em giáng sinh vui vẻ hihihi yêu emmm =)))) ❤️`,
  },
  bgMusic: '/music/tinhiugiuamuadong.mp3',
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function ChristmasPage() {
  const [phase, setPhase] = useState<'terminal' | 'reveal'>('terminal');
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showTree, setShowTree] = useState(false);
  const [showOrnaments, setShowOrnaments] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Terminal script with timing
  const terminalScript = [
    { text: `> Wake up, ${CONFIG.girlfriendName}...`, delay: 1000 },
    { text: '\n> Initiating christmas_protocol_v25.12...', delay: 1500 },
    { text: '\n> Compiling love data... Done.', delay: 1000 },
    { text: '\n> Rendering surprise...', delay: 2000 },
  ];

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let scriptIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const revealTree = () => {
      setFadeOut(true);
      setTimeout(() => {
        setPhase('reveal');
        setShowTree(true);
        setTimeout(() => setShowOrnaments(true), 2000);
        setTimeout(() => setShowMessage(true), 3000);
      }, 2000);
    };

    const typeNextChar = () => {
      if (scriptIndex >= terminalScript.length) {
        const lastScript = terminalScript[terminalScript.length - 1];
        timeoutId = setTimeout(revealTree, lastScript.delay);
        return;
      }

      const currentScript = terminalScript[scriptIndex];

      if (currentIndex < currentScript.text.length) {
        currentText += currentScript.text[currentIndex];
        setTerminalText(currentText);
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 50);
      } else {
        scriptIndex++;
        currentIndex = 0;
        if (scriptIndex < terminalScript.length) {
          timeoutId = setTimeout(typeNextChar, currentScript.delay);
        } else {
          timeoutId = setTimeout(revealTree, currentScript.delay);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto play music when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && !musicStarted) {
        try {
          await audioRef.current.play();
          setMusicStarted(true);
          console.log('Music started successfully');
        } catch (error) {
          console.log('Auto-play blocked, waiting for user interaction:', error);
        }
      }
    };

    // Try to play immediately
    playAudio();

    // If auto-play is blocked, try again on first user interaction
    const handleFirstInteraction = async () => {
      if (!musicStarted && audioRef.current) {
        try {
          await audioRef.current.play();
          setMusicStarted(true);
          console.log('Music started after user interaction');
          // Remove listeners after successful play
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
        } catch (error) {
          console.log('Failed to play music:', error);
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [musicStarted]);

  // Generate 20 fairy lights with random positions
  const fairyLights = [
    // Top section (smallest triangle area)
    { top: '12%', left: '48%', color: 'bg-red-500', shadow: 'shadow-[0_0_15px_#ef4444]', delay: '0.1s' },
    { top: '15%', left: '52%', color: 'bg-amber-300', shadow: 'shadow-[0_0_15px_#fcd34d]', delay: '0.3s' },

    // Upper-middle section
    { top: '20%', left: '42%', color: 'bg-yellow-300', shadow: 'shadow-[0_0_15px_#fde047]', delay: '0.5s' },
    { top: '22%', left: '58%', color: 'bg-red-400', shadow: 'shadow-[0_0_15px_#f87171]', delay: '0.7s' },
    { top: '26%', left: '46%', color: 'bg-white', shadow: 'shadow-[0_0_20px_#ffffff]', delay: '0.2s' },
    { top: '28%', left: '54%', color: 'bg-amber-400', shadow: 'shadow-[0_0_15px_#fbbf24]', delay: '0.9s' },

    // Middle section (second triangle)
    { top: '34%', left: '38%', color: 'bg-red-500', shadow: 'shadow-[0_0_15px_#ef4444]', delay: '0.4s' },
    { top: '36%', left: '62%', color: 'bg-yellow-400', shadow: 'shadow-[0_0_15px_#facc15]', delay: '0.6s' },
    { top: '40%', left: '44%', color: 'bg-white', shadow: 'shadow-[0_0_20px_#ffffff]', delay: '0.8s' },
    { top: '42%', left: '56%', color: 'bg-amber-300', shadow: 'shadow-[0_0_15px_#fcd34d]', delay: '1.0s' },
    { top: '46%', left: '50%', color: 'bg-red-400', shadow: 'shadow-[0_0_15px_#f87171]', delay: '0.3s' },

    // Lower-middle section (third triangle)
    { top: '52%', left: '35%', color: 'bg-yellow-300', shadow: 'shadow-[0_0_15px_#fde047]', delay: '0.5s' },
    { top: '54%', left: '65%', color: 'bg-white', shadow: 'shadow-[0_0_20px_#ffffff]', delay: '0.7s' },
    { top: '58%', left: '42%', color: 'bg-amber-400', shadow: 'shadow-[0_0_15px_#fbbf24]', delay: '0.9s' },
    { top: '60%', left: '58%', color: 'bg-red-500', shadow: 'shadow-[0_0_15px_#ef4444]', delay: '0.2s' },

    // Bottom section (largest triangle)
    { top: '66%', left: '32%', color: 'bg-yellow-400', shadow: 'shadow-[0_0_15px_#facc15]', delay: '0.4s' },
    { top: '68%', left: '68%', color: 'bg-white', shadow: 'shadow-[0_0_20px_#ffffff]', delay: '0.6s' },
    { top: '72%', left: '38%', color: 'bg-red-400', shadow: 'shadow-[0_0_15px_#f87171]', delay: '0.8s' },
    { top: '74%', left: '62%', color: 'bg-amber-300', shadow: 'shadow-[0_0_15px_#fcd34d]', delay: '1.0s' },
    { top: '78%', left: '50%', color: 'bg-yellow-300', shadow: 'shadow-[0_0_15px_#fde047]', delay: '0.5s' },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={CONFIG.bgMusic} loop />

      {/* Phase 1: Terminal */}
      {phase === 'terminal' && (
        <div
          className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-2000 z-50 ${fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div className="text-green-400 font-mono text-base sm:text-lg md:text-xl px-6 whitespace-pre-wrap max-w-2xl">
            {terminalText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
          </div>
        </div>
      )}

      {/* Phase 2: Reveal */}
      {phase === 'reveal' && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f2d] to-[#0f3d2c]">
          {/* Falling Snow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

            {/* SPECTACULAR CHRISTMAS TREE - 65-70% viewport height */}
            {showTree && (
              <div className="relative w-full h-[70vh] flex items-center justify-center animate-fade-in">

                {/* Tree Container - GIANT SIZE */}
                <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">

                  {/* Tree Layers - Multi-layered Neon Triangles */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    {/* Layer 1: Top Triangle (Teal) */}
                    <div
                      className="w-0 h-0 border-l-[70px] sm:border-l-[90px] md:border-l-[100px] border-l-transparent border-r-[70px] sm:border-r-[90px] md:border-r-[100px] border-r-transparent border-b-[100px] sm:border-b-[130px] md:border-b-[150px] border-b-teal-400/90 drop-shadow-[0_0_40px_rgba(45,212,191,0.9)] shadow-[0_0_60px_#2dd4bf,0_0_100px_#14b8a6,inset_0_0_30px_rgba(45,212,191,0.3)] animate-glow-pulse mb-[-15px] animate-tree-draw-1 z-10"
                      style={{ filter: 'brightness(1.2)' }}
                    />

                    {/* Layer 2: Upper-Middle Triangle (Emerald) */}
                    <div
                      className="w-0 h-0 border-l-[100px] sm:border-l-[130px] md:border-l-[150px] border-l-transparent border-r-[100px] sm:border-r-[130px] md:border-r-[150px] border-r-transparent border-b-[130px] sm:border-b-[160px] md:border-b-[180px] border-b-emerald-500/95 drop-shadow-[0_0_45px_rgba(16,185,129,0.9)] shadow-[0_0_70px_#10b981,0_0_110px_#059669,inset_0_0_35px_rgba(16,185,129,0.3)] animate-glow-pulse mb-[-15px] animate-tree-draw-2 z-9"
                      style={{ animationDelay: '0.25s', filter: 'brightness(1.15)' }}
                    />

                    {/* Layer 3: Lower-Middle Triangle (Green) */}
                    <div
                      className="w-0 h-0 border-l-[130px] sm:border-l-[170px] md:border-l-[200px] border-l-transparent border-r-[130px] sm:border-r-[170px] md:border-r-[200px] border-r-transparent border-b-[150px] sm:border-b-[190px] md:border-b-[210px] border-b-green-600/95 drop-shadow-[0_0_50px_rgba(5,150,105,0.9)] shadow-[0_0_80px_#059669,0_0_120px_#047857,inset_0_0_40px_rgba(5,150,105,0.3)] animate-glow-pulse mb-[-15px] animate-tree-draw-3 z-8"
                      style={{ animationDelay: '0.5s', filter: 'brightness(1.1)' }}
                    />

                    {/* Layer 4: Bottom Triangle (Deep Emerald) */}
                    <div
                      className="w-0 h-0 border-l-[160px] sm:border-l-[210px] md:border-l-[250px] border-l-transparent border-r-[160px] sm:border-r-[210px] md:border-r-[250px] border-r-transparent border-b-[170px] sm:border-b-[220px] md:border-b-[240px] border-b-emerald-700/95 drop-shadow-[0_0_55px_rgba(4,120,87,0.9)] shadow-[0_0_90px_#047857,0_0_130px_#065f46,inset_0_0_45px_rgba(4,120,87,0.3)] animate-glow-pulse mb-[-15px] animate-tree-draw-4 z-7"
                      style={{ animationDelay: '0.75s', filter: 'brightness(1.05)' }}
                    />

                    {/* Tree Trunk */}
                    <div
                      className="w-[50px] sm:w-[70px] h-[60px] sm:h-[80px] bg-gradient-to-b from-amber-900 to-amber-950 shadow-[0_0_25px_#78350f,inset_0_0_20px_rgba(120,53,15,0.5)] animate-tree-draw-5 z-6"
                      style={{ animationDelay: '1s' }}
                    />

                    {/* GIANT PULSING STAR ON TOP */}
                    <div className="absolute top-[-30px] sm:top-[-40px] md:top-[-50px] left-1/2 -translate-x-1/2 z-20">
                      <div className="relative">
                        {/* Star glow effect */}
                        <div className="absolute inset-0 animate-ping-slow">
                          <div className="text-yellow-300 text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_40px_#fbbf24] opacity-60">
                            ⭐
                          </div>
                        </div>
                        {/* Main star */}
                        <div className="relative text-yellow-300 text-6xl sm:text-7xl md:text-8xl animate-star-pulse drop-shadow-[0_0_50px_#fbbf24] shadow-[0_0_80px_#fbbf24]">
                          ⭐
                        </div>
                      </div>
                    </div>

                    {/* 20 FAIRY LIGHTS - Twinkling asynchronously */}
                    {fairyLights.map((light, i) => (
                      <div
                        key={i}
                        className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full ${light.color} ${light.shadow} animate-twinkle z-20`}
                        style={{
                          top: light.top,
                          left: light.left,
                          animationDelay: light.delay,
                          animationDuration: `${1.2 + Math.random() * 0.6}s`,
                        }}
                      />
                    ))}

                    {/* Photo Ornaments */}
                    {showOrnaments && (
                      <>
                        {CONFIG.photos.map((photo, index) => {
                          const positions = [
                            { top: '25%', left: '30%' },
                            { top: '45%', left: '70%' },
                            { top: '58%', left: '50%' },
                          ];
                          const position = positions[index] || { top: '50%', left: '50%' };

                          return (
                            <div
                              key={index}
                              className="absolute animate-float-in z-[25]"
                              style={{
                                top: position.top,
                                left: position.left,
                                animationDelay: `${index * 0.4}s`,
                              }}
                            >
                              <div className="relative group">
                                {/* Ornament String */}
                                <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 w-[2px] h-[25px] bg-gradient-to-b from-amber-200 to-transparent" />

                                {/* Photo Frame - Larger for visibility */}
                                <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden border-[5px] border-amber-400 shadow-[0_0_30px_#fbbf24,0_0_50px_#f59e0b] animate-ornament-glow hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-pink-400 to-purple-600">
                                  <Image
                                    src={photo}
                                    alt={`Memory ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="100px"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>

                {/* Message Card - Overlays bottom of tree */}
                {showMessage && (
                  <div className="absolute bottom-0 left-0 right-0 z-30 pb-4 sm:pb-6 px-4 animate-slide-up-drawer">
                    <div className="max-w-lg mx-auto">
                      <div className=" ">
                        {/* Glass effect overlay */}
                        <div className="absolute inset-0 pointer-events-none" />

                        {/* Decorative Corner Sparkles */}
                        <div className="absolute -top-3 -right-3 text-3xl animate-pulse-slow z-10">✨</div>
                        <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse-slow z-10" style={{ animationDelay: '0.5s' }}>✨</div>

                        {/* Title */}
                        <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-glow-text drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          {CONFIG.message.title}
                        </h1>

                        {/* Message */}
                        <div className="relative text-white text-xs sm:text-sm leading-relaxed whitespace-pre-line text-center font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {CONFIG.message.content}
                        </div>

                        {/* Decorative Hearts */}
                        <div className="relative flex justify-center gap-3 mt-4 sm:mt-6 text-2xl sm:text-3xl">
                          {['❤️', '💝', '🎄'].map((emoji, i) => (
                            <span
                              key={i}
                              className="animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            >
                              {emoji}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes snow {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.2);
          }
          50% {
            opacity: 0.9;
            filter: brightness(1.4);
          }
        }

        @keyframes ornament-glow {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.3);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          25% {
            opacity: 0.4;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          75% {
            opacity: 0.6;
            transform: scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-60px) scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        @keyframes slide-up-drawer {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tree-draw {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes star-pulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1.5);
          }
          50% {
            transform: scale(1.15) rotate(15deg);
            filter: brightness(2);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .animate-snow {
          animation: snow linear infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2.5s ease-in-out infinite;
        }

        .animate-ornament-glow {
          animation: ornament-glow 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }

        .animate-float-in {
          animation: float-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .animate-slide-up-drawer {
          animation: slide-up-drawer 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-tree-draw-1,
        .animate-tree-draw-2,
        .animate-tree-draw-3,
        .animate-tree-draw-4,
        .animate-tree-draw-5 {
          animation: tree-draw 0.8s ease-out forwards;
          transform-origin: top center;
          opacity: 0;
        }

        .animate-star-pulse {
          animation: star-pulse 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-glow-text {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  );
}

