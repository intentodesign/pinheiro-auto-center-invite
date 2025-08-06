'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pinheiroLogo from 'figma:asset/700485982656c930c6562e184362b0b67a80f73e.png';
import backgroundPattern from 'figma:asset/91848c734a5c76b9b3897389557e821a63204962.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pinheiro-gray-dark to-pinheiro-gray-medium flex items-center justify-center relative overflow-hidden font-goli">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center mb-4"
        >
          <ImageWithFallback
            src={pinheiroLogo}
            alt="Pinheiro Auto Center Logo"
            className="max-w-[280px] md:max-w-[400px] w-full h-auto"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-pinheiro-white/90 italic tracking-wide"
        >
          40 Anos Cortando Problemas Pela Raiz
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-8 border-2 border-pinheiro-white/30 border-t-pinheiro-white rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
}