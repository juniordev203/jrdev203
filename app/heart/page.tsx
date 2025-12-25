'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeartPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black/20">
      {/* Background Image with Blur and Opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/image/anh1.jpg"
          alt="Background"
          fill
          className="object-cover opacity-80 scale-110"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-rose-900/5 to-pink-900/10" /> */}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `rgba(${255}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.3})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          
          {/* Heart Image Container */}
          <div className="relative">
            
            {/* Heart Container with Animation */}
            <div className="heart-container animate-float-slow relative">
              
              {/* Heart Image with 3D Effect */}
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] animate-heart-pulse">
                <Image
                  src="/image/traitim.png"
                  alt="Heart"
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(255,8,68,0.8)] animate-heart-glow"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
                />
                
                {/* Glow Effect Behind */}
                <div className="absolute inset-0 blur-3xl animate-pulse-slow scale-150 -z-10" />
              </div>

              {/* Text in the Center */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] animate-text-glow px-4">
                  I Nớp IU!
                </h1>
              </div>

              {/* Sparkles around heart */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const radius = 180;
                const radiusSm = 220;
                const radiusMd = 280;
                
                return (
                  <div
                    key={i}
                    className="absolute text-xl sm:text-2xl md:text-3xl animate-sparkle"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    ✨
                  </div>
                );
              })}
            </div>

          </div>

          {/* Back Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Link href="/christmas">
              <button className="">
                <span>←</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animations and Styles */}
      <style jsx global>{`
        .heart-container {
          position: relative;
        }

        @keyframes heart-pulse {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.03);
          }
        }

        @keyframes heart-glow {
          0%, 100% {
            filter: drop-shadow(0 0 40px rgba(255, 8, 68, 0.6)) 
                    drop-shadow(0 0 80px rgba(255, 8, 68, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(255, 8, 68, 0.9)) 
                    drop-shadow(0 0 120px rgba(255, 8, 68, 0.6));
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.02);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes text-glow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 107, 157, 0.6),
              0 0 30px rgba(255, 8, 68, 0.4);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(255, 255, 255, 1),
              0 0 40px rgba(255, 107, 157, 0.8),
              0 0 60px rgba(255, 8, 68, 0.6);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-heart-pulse {
          animation: heart-pulse 4s ease-in-out infinite;
        }

        .animate-heart-glow {
          animation: heart-glow 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

