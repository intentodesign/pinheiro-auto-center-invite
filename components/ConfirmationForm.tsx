'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Phone, Users, Loader2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pinheiroLogo from 'figma:asset/700485982656c930c6562e184362b0b67a80f73e.png';

interface FormData {
  name: string;
  phone: string;
  guests: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  guests?: string;
}

interface ConfirmationFormProps {
  onBack: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

export function ConfirmationForm({ onBack, onSubmit }: ConfirmationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    guests: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor connection status
  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    
    if (!match) return value;
    
    const [, area, first, second] = match;
    
    if (second) {
      return `(${area}) ${first}-${second}`;
    } else if (first) {
      return `(${area}) ${first}`;
    } else if (area) {
      return `(${area}`;
    }
    
    return numbers;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Phone validation
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (!phoneNumbers) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneNumbers.length !== 11) {
      newErrors.phone = 'Telefone deve ter 11 dígitos';
    }

    // Guests validation
    if (!formData.guests) {
      newErrors.guests = 'Por favor, informe quantos acompanhantes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Erro ao confirmar presença.';
      
      if (!isOnline) {
        errorMessage = 'Sem conexão com a internet. Verifique sua conexão e tente novamente.';
      } else if (error instanceof Error) {
        if (error.message.includes('Timeout')) {
          errorMessage = 'A confirmação está demorando mais que o esperado. Tente novamente.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Problema de conexão. Verifique sua internet e tente novamente.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleGuestsChange = (value: string) => {
    setFormData(prev => ({ ...prev, guests: value }));
    
    if (errors.guests) {
      setErrors(prev => ({ ...prev, guests: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-pinheiro-white font-goli">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-pinheiro-gray-dark px-6 py-8 text-center relative"
      >
        <button
          onClick={onBack}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-pinheiro-white hover:text-pinheiro-white/80 transition-colors z-10"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center justify-center">
          <ImageWithFallback
            src={pinheiroLogo}
            alt="Pinheiro Auto Center Logo"
            className="max-w-[160px] md:max-w-[200px] w-full h-auto"
          />
        </div>

        {/* Connection indicator */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-pinheiro-white/70" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-400" />
          )}
        </div>
      </motion.header>

      {/* Form Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-pinheiro-green-dark mb-3">
            CONFIRME SUA PRESENÇA
          </h2>
          <p className="text-pinheiro-black/70">
            Queremos recebê-lo da melhor forma!
          </p>
        </motion.div>

        {/* Connection warning */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="border-yellow-200 bg-yellow-50">
              <WifiOff className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Sem conexão com a internet. Verifique sua conexão antes de confirmar.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {submitError}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 border-2 border-pinheiro-green-medium/20 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="name" 
                  className="text-pinheiro-green-dark font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  SEU NOME COMPLETO
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Digite seu nome completo"
                  className={`border-2 focus:border-pinheiro-green-medium focus:ring-pinheiro-green-medium/20 font-goli ${
                    errors.name ? 'border-red-500' : 'border-pinheiro-green-medium/30'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="phone" 
                  className="text-pinheiro-green-dark font-semibold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  SEU TELEFONE
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(51) 99999-9999"
                  maxLength={15}
                  className={`border-2 focus:border-pinheiro-green-medium focus:ring-pinheiro-green-medium/20 font-goli ${
                    errors.phone ? 'border-red-500' : 'border-pinheiro-green-medium/30'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Guests Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="guests" 
                  className="text-pinheiro-green-dark font-semibold flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  QUANTOS ACOMPANHANTES?
                </Label>
                <Select value={formData.guests} onValueChange={handleGuestsChange} disabled={isSubmitting}>
                  <SelectTrigger className={`border-2 focus:border-pinheiro-green-medium focus:ring-pinheiro-green-medium/20 font-goli ${
                    errors.guests ? 'border-red-500' : 'border-pinheiro-green-medium/30'
                  }`}>
                    <SelectValue placeholder="Selecione quantos acompanhantes" />
                  </SelectTrigger>
                  <SelectContent className="font-goli">
                    <SelectItem value="0">Vou sozinho(a)</SelectItem>
                    <SelectItem value="1">1 acompanhante</SelectItem>
                    <SelectItem value="2">2 acompanhantes</SelectItem>
                    <SelectItem value="3">3 acompanhantes</SelectItem>
                    <SelectItem value="4">4 acompanhantes</SelectItem>
                    <SelectItem value="5">5 ou mais acompanhantes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.guests && (
                  <p className="text-red-500 text-sm">{errors.guests}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !isOnline}
                className="w-full bg-pinheiro-green-medium hover:bg-pinheiro-green-dark text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-goli"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    CONFIRMANDO...
                  </>
                ) : !isOnline ? (
                  'SEM CONEXÃO'
                ) : (
                  'CONFIRMAR PRESENÇA'
                )}
              </Button>

              {/* Back Link */}
              <button
                type="button"
                onClick={onBack}
                className="w-full text-pinheiro-green-dark hover:text-pinheiro-green-medium transition-colors text-center py-2 font-goli"
                disabled={isSubmitting}
              >
                Voltar
              </button>
            </form>
          </Card>
        </motion.div>

        {/* Info message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-pinheiro-black/50 text-sm">
            Sua confirmação será processada automaticamente
          </p>
        </motion.div>
      </div>
    </div>
  );
}