'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function VideoBackground({
  videoSrc = '/videos/weatherhaven-bg.mp4',
  fallbackImage = '/images/hero-bg.jpg',
  overlay = true,
  overlayOpacity = 0.4,
  children,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleError = () => {
      setIsVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div 
      className={`video-background-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Video Background */}
      {!isVideoError && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: 1,
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image */}
      {(isVideoError || !isVideoLoaded) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }}
        />
      )}

      {/* Animated Gradient Overlay */}
      {overlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(135deg, 
                rgba(0, 0, 0, ${overlayOpacity}) 0%, 
                rgba(0, 102, 255, ${overlayOpacity * 0.3}) 25%, 
                rgba(0, 212, 255, ${overlayOpacity * 0.2}) 50%, 
                rgba(0, 255, 136, ${overlayOpacity * 0.3}) 75%, 
                rgba(0, 0, 0, ${overlayOpacity}) 100%
              )
            `,
            zIndex: 2
          }}
        />
      )}

      {/* Animated Particles Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${Math.random() * 0.5 + 0.1})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          height: '100%',
          width: '100%'
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
