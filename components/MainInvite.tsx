'use client';

import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Music, Wine, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pinheiroLogo from 'figma:asset/700485982656c930c6562e184362b0b67a80f73e.png';
import backgroundPattern from 'figma:asset/91848c734a5c76b9b3897389557e821a63204962.png';

interface MainInviteProps {
  onConfirmPresence: () => void;
  onOpenMaps: () => void;
  onAddToCalendar: () => void;
}

export function MainInvite({ onConfirmPresence, onOpenMaps, onAddToCalendar }: MainInviteProps) {
  return (
    <div className="min-h-screen bg-pinheiro-white font-goli">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-pinheiro-gray-dark px-6 py-8 text-center relative overflow-hidden"
      >
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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <ImageWithFallback
            src={pinheiroLogo}
            alt="Pinheiro Auto Center Logo"
            className="max-w-[200px] md:max-w-[250px] w-full h-auto mb-4"
          />
          <p className="text-sm md:text-base text-pinheiro-white/80 italic">
            40 Anos Cortando Problemas Pela Raiz
          </p>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-pinheiro-green-dark mb-2">
            VOCÊ ESTÁ CONVIDADO
          </h3>
          <p className="text-lg md:text-xl text-pinheiro-black">
            REINAUGURAÇÃO PINHEIRO AUTO CENTER
          </p>
        </motion.div>

        {/* Personal Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="personal-message">
            <div className="message-card relative overflow-hidden bg-gradient-to-br from-pinheiro-white/95 to-white/95 p-8 rounded-xl shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pinheiro-green-medium to-pinheiro-green-dark"></div>
              <p className="font-dancing text-xl font-semibold text-pinheiro-black leading-relaxed text-center mb-4">
                Depois de meses preparando cada detalhe, chegou a hora de abrir as portas da nova Pinheiro Auto Center.
              </p>
              <p className="font-dancing text-xl font-bold text-pinheiro-green-dark text-center mt-3 mb-3 text-shadow">
                A estrutura mudou. O compromisso com você, não.
              </p>
              <p className="font-dancing text-xl font-semibold text-pinheiro-black leading-relaxed text-center mb-4">
                Queremos te receber pessoalmente para mostrar o que evoluímos — e por que isso é bom para você e seu carro.
              </p>
              <p className="font-dancing text-xl font-bold text-pinheiro-green-medium text-center mt-6">
                Te esperamos no dia 19/08 pra viver esse novo capítulo com a gente. ✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* Event Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="p-6 mb-8 border-2 border-pinheiro-green-medium shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-pinheiro-green-medium flex-shrink-0" />
                <div>
                  <p className="font-bold text-pinheiro-green-dark text-lg">
                    19 DE AGOSTO DE 2025
                  </p>
                  <p className="text-sm text-pinheiro-black/70">Terça-feira</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-pinheiro-green-medium flex-shrink-0" />
                <div>
                  <p className="text-pinheiro-black">15:00 às 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-pinheiro-green-medium flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-pinheiro-black">
                    Pinheiro Auto Center
                  </p>
                  <p className="text-sm text-pinheiro-black/70">
                    Santo Antônio da Patrulha/RS
                  </p>
                  <p className="text-xs text-pinheiro-black/60 mt-1">
                    R. Renato Randazzo, 75 - Pitangueiras
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Event Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8"
        >
          <div className="event-highlights">
            <h4 className="font-bold text-pinheiro-green-dark mb-6 text-center text-lg">
              O QUE VOCÊ VAI ENCONTRAR:
            </h4>
            <div className="highlights-list flex justify-around gap-4 flex-wrap">
              <div className="highlight-item flex flex-col items-center gap-3 flex-1 min-w-[90px]">
                <div className="highlight-icon w-[50px] h-[50px] bg-gradient-to-br from-pinheiro-green-medium to-pinheiro-green-dark rounded-full flex items-center justify-center shadow-md relative overflow-hidden animate-gentle-pulse">
                  <div className="absolute -top-px -left-px -right-px -bottom-px bg-gradient-to-br from-pinheiro-green-medium via-pinheiro-green-dark to-pinheiro-green-medium rounded-full -z-10 animate-slow-rotate"></div>
                  <Music className="w-5 h-5 text-white z-10" />
                </div>
                <span className="font-semibold text-pinheiro-green-dark text-center text-sm leading-tight">
                  Música ao Vivo
                </span>
              </div>
              
              <div className="highlight-item flex flex-col items-center gap-3 flex-1 min-w-[90px]">
                <div className="highlight-icon w-[50px] h-[50px] bg-gradient-to-br from-pinheiro-green-medium to-pinheiro-green-dark rounded-full flex items-center justify-center shadow-md relative overflow-hidden animate-gentle-pulse" style={{animationDelay: '1s'}}>
                  <div className="absolute -top-px -left-px -right-px -bottom-px bg-gradient-to-br from-pinheiro-green-medium via-pinheiro-green-dark to-pinheiro-green-medium rounded-full -z-10 animate-slow-rotate" style={{animationDelay: '1s'}}></div>
                  <Wine className="w-5 h-5 text-white z-10" />
                </div>
                <span className="font-semibold text-pinheiro-green-dark text-center text-sm leading-tight">
                  Coquetel
                </span>
              </div>
              
              <div className="highlight-item flex flex-col items-center gap-3 flex-1 min-w-[90px]">
                <div className="highlight-icon w-[50px] h-[50px] bg-gradient-to-br from-pinheiro-green-medium to-pinheiro-green-dark rounded-full flex items-center justify-center shadow-md relative overflow-hidden animate-gentle-pulse" style={{animationDelay: '2s'}}>
                  <div className="absolute -top-px -left-px -right-px -bottom-px bg-gradient-to-br from-pinheiro-green-medium via-pinheiro-green-dark to-pinheiro-green-medium rounded-full -z-10 animate-slow-rotate" style={{animationDelay: '2s'}}></div>
                  <Car className="w-5 h-5 text-white z-10" />
                </div>
                <span className="font-semibold text-pinheiro-green-dark text-center text-sm leading-tight">
                  Super Carros
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="space-y-4"
        >
          <Button
            onClick={onConfirmPresence}
            className="w-full bg-pinheiro-green-medium hover:bg-pinheiro-green-dark text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-200"
            size="lg"
          >
            CONFIRMAR PRESENÇA
          </Button>

          <Button
            onClick={onOpenMaps}
            variant="outline"
            className="w-full border-2 border-pinheiro-green-medium text-pinheiro-green-medium hover:bg-pinheiro-green-medium hover:text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-200"
            size="lg"
          >
            ABRIR NO GOOGLE MAPS
          </Button>

          <Button
            onClick={onAddToCalendar}
            variant="outline"
            className="w-full border-2 border-pinheiro-green-dark text-pinheiro-green-dark hover:bg-pinheiro-green-dark hover:text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-200"
            size="lg"
          >
            ADICIONAR À AGENDA
          </Button>
        </motion.div>
      </div>
    </div>
  );
}