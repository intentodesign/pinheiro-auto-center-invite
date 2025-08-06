'use client';

import { motion } from 'motion/react';
import { CheckCircle, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import backgroundPattern from 'figma:asset/91848c734a5c76b9b3897389557e821a63204962.png';

interface SuccessScreenProps {
  onOpenMaps: () => void;
  onAddToCalendar: () => void;
}

export function SuccessScreen({ onOpenMaps, onAddToCalendar }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pinheiro-gray-dark to-pinheiro-gray-medium relative overflow-hidden font-goli">
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

      <div className="relative z-10 px-6 py-12 max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <CheckCircle className="w-24 h-24 text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            PRESENÇA CONFIRMADA!
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Obrigado! Aguardamos você no dia <strong>19/08/2025</strong> para 
            celebrarmos juntos os próximos 40 anos da Pinheiro!
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full mb-8"
        >
          <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/nDfyZpRJ1RY?autoplay=1&mute=1&controls=1&rel=0"
                title="Pinheiro Auto Center - 40 Anos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="text-center mt-3">
              <h3 className="font-bold text-pinheiro-green-dark text-sm">
                40 Anos de História
              </h3>
            </div>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full mb-8"
        >
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <div className="text-center">
              <h3 className="font-bold text-pinheiro-green-dark mb-2">
                LEMBRETE DO EVENTO
              </h3>
              <p className="text-pinheiro-black mb-1">
                <strong>19 de Agosto de 2025</strong>
              </p>
              <p className="text-pinheiro-black mb-1">
                15:00 às 21:00
              </p>
              <p className="text-pinheiro-black/70 text-sm">
                Pinheiro Auto Center - Santo Antônio da Patrulha/RS
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="w-full space-y-4"
        >
          <Button
            onClick={onOpenMaps}
            variant="secondary"
            className="w-full bg-white text-pinheiro-green-dark hover:bg-white/90 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-goli"
            size="lg"
          >
            <MapPin className="w-5 h-5" />
            ABRIR NO GOOGLE MAPS
          </Button>

          <Button
            onClick={onAddToCalendar}
            variant="secondary"
            className="w-full bg-white text-pinheiro-green-dark hover:bg-white/90 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-goli"
            size="lg"
          >
            <Calendar className="w-5 h-5" />
            ADICIONAR À AGENDA
          </Button>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center mt-8"
        >
          <p className="text-white/70 text-sm">
            Estamos ansiosos para celebrar com você!
          </p>
        </motion.div>

        {/* Project Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="project-credit mt-12 text-center p-4"
        >
          <p className="text-xs text-white/30 m-0 font-normal">
            Projeto criado por{' '}
            <a 
              href="https://instagram.com/ocaradaintento" 
              target="_blank" 
              rel="noopener"
              className="text-pinheiro-green-medium/40 no-underline hover:opacity-70 hover:underline transition-opacity duration-300"
            >
              @ocaradaintento
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}