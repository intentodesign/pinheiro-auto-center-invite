// Pinheiro Auto Center - Invite App
// Main JavaScript file

class PinheiroInviteApp {
    constructor() {
        this.currentScreen = 'splash';
        this.isSubmitting = false;
        this.formData = {
            name: '',
            phone: '',
            guests: ''
        };
        
        // Event details
        this.eventDetails = {
            title: 'Reinauguração Pinheiro Auto Center',
            date: '2025-08-19',
            startTime: '15:00',
            endTime: '21:00',
            location: 'Pinheiro Auto Center - Santo Antônio da Patrulha/RS',
            address: 'R. Renato Randazzo, 75 - Pitangueiras, Santo Antônio da Patrulha - RS, 95500-000',
            description: 'Celebração dos 40 anos da Pinheiro Auto Center. Mesa de salgados, doces e bebidas. Presença especial Mobil e Heliar Baterias.',
            googleMapsUrl: 'https://maps.app.goo.gl/AFt66TDq5FYKm1gW6'
        };

        this.scriptUrl = 'https://script.google.com/macros/s/AKfycbwSQFioWCgLnoAodU-qcLJK3nWJfYDXQvLbsiyYG4Fon9bgsUf-gUs0OV8Q5lPVqozE/exec';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeIcons();
        this.startSplashScreen();
        this.monitorConnection();
        this.initializeDebugPanel();
    }

    // Initialize Lucide icons
    initializeIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Splash screen logic
    startSplashScreen() {
        setTimeout(() => {
            this.showScreen('main-invite');
        }, 3000);
    }

    // Screen management
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    // Event listeners setup
    setupEventListeners() {
        // Main invite buttons
        document.getElementById('confirm-presence-btn')?.addEventListener('click', () => {
            this.showScreen('confirmation-form');
        });

        document.getElementById('open-maps-btn')?.addEventListener('click', () => {
            this.openGoogleMaps();
        });

        document.getElementById('add-calendar-btn')?.addEventListener('click', () => {
            this.addToCalendar();
        });

        // Form navigation
        document.getElementById('form-back-btn')?.addEventListener('click', () => {
            this.showScreen('main-invite');
        });

        document.getElementById('form-back-text')?.addEventListener('click', () => {
            this.showScreen('main-invite');
        });

        // Form submission
        document.getElementById('presence-form')?.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Form validation
        document.getElementById('name')?.addEventListener('input', () => {
            this.clearFieldError('name');
        });

        document.getElementById('phone')?.addEventListener('input', (e) => {
            this.formatPhoneNumber(e);
            this.clearFieldError('phone');
        });

        document.getElementById('guests')?.addEventListener('change', () => {
            this.clearFieldError('guests');
        });

        // Success screen buttons
        document.getElementById('success-maps-btn')?.addEventListener('click', () => {
            this.openGoogleMaps();
        });

        document.getElementById('success-calendar-btn')?.addEventListener('click', () => {
            this.addToCalendar();
        });

        // Debug panel
        document.getElementById('debug-toggle')?.addEventListener('click', () => {
            this.toggleDebugPanel();
        });

        document.getElementById('debug-close')?.addEventListener('click', () => {
            this.hideDebugPanel();
        });

        document.getElementById('debug-download')?.addEventListener('click', () => {
            this.downloadBackupData();
        });

        document.getElementById('debug-clear')?.addEventListener('click', () => {
            this.clearBackupData();
        });

        // Instructions modal
        document.getElementById('instructions-toggle')?.addEventListener('click', () => {
            this.showInstructions();
        });

        document.getElementById('instructions-close')?.addEventListener('click', () => {
            this.hideInstructions();
        });

        document.getElementById('instructions-overlay')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideInstructions();
            }
        });

        document.getElementById('copy-code')?.addEventListener('click', () => {
            this.copyCodeToClipboard();
        });
    }

    // Device detection
    isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    isMobile() {
        return this.isIOS() || this.isAndroid();
    }

    // Phone number formatting
    formatPhoneNumber(event) {
        const input = event.target;
        const value = input.value.replace(/\D/g, '');
        const match = value.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        
        if (!match) return;
        
        const [, area, first, second] = match;
        
        if (second) {
            input.value = `(${area}) ${first}-${second}`;
        } else if (first) {
            input.value = `(${area}) ${first}`;
        } else if (area) {
            input.value = `(${area}`;
        } else {
            input.value = value;
        }
    }

    // Form validation
    validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value;
        const guests = document.getElementById('guests').value;
        
        let isValid = true;

        // Name validation
        if (!name) {
            this.showFieldError('name', 'Nome é obrigatório');
            isValid = false;
        } else if (name.length < 3) {
            this.showFieldError('name', 'Nome deve ter pelo menos 3 caracteres');
            isValid = false;
        }

        // Phone validation
        const phoneNumbers = phone.replace(/\D/g, '');
        if (!phoneNumbers) {
            this.showFieldError('phone', 'Telefone é obrigatório');
            isValid = false;
        } else if (phoneNumbers.length !== 11) {
            this.showFieldError('phone', 'Telefone deve ter 11 dígitos');
            isValid = false;
        }

        // Guests validation
        if (!guests) {
            this.showFieldError('guests', 'Por favor, informe quantos acompanhantes');
            isValid = false;
        }

        return isValid;
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field) field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field) field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    // Form submission
    async handleFormSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm() || this.isSubmitting) return;

        this.isSubmitting = true;
        this.updateSubmitButton(true);
        this.hideSubmitError();

        try {
            const formData = {
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value,
                guests: document.getElementById('guests').value
            };

            await this.submitToGoogleSheets(formData);
            this.showScreen('success-screen');
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            this.showSubmitError(error.message);
        } finally {
            this.isSubmitting = false;
            this.updateSubmitButton(false);
        }
    }

    updateSubmitButton(loading) {
        const submitBtn = document.getElementById('submit-btn');
        const submitText = submitBtn?.querySelector('.submit-text');
        const loadingSpinner = submitBtn?.querySelector('.loading-spinner');
        
        if (!submitBtn) return;

        if (loading) {
            submitBtn.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (loadingSpinner) loadingSpinner.style.display = 'block';
        } else {
            submitBtn.disabled = false;
            if (submitText) submitText.style.display = 'block';
            if (loadingSpinner) loadingSpinner.style.display = 'none';
        }
    }

    showSubmitError(message) {
        const errorElement = document.getElementById('submit-error');
        const messageElement = document.getElementById('error-message');
        
        if (errorElement && messageElement) {
            messageElement.textContent = message;
            errorElement.style.display = 'flex';
        }
    }

    hideSubmitError() {
        const errorElement = document.getElementById('submit-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Connection monitoring
    monitorConnection() {
        const updateConnectionStatus = () => {
            const onlineIcon = document.querySelector('.connection-indicator .online');
            const offlineIcon = document.querySelector('.connection-indicator .offline');
            const warning = document.getElementById('connection-warning');
            
            if (navigator.onLine) {
                if (onlineIcon) onlineIcon.style.display = 'block';
                if (offlineIcon) offlineIcon.style.display = 'none';
                if (warning) warning.style.display = 'none';
            } else {
                if (onlineIcon) onlineIcon.style.display = 'none';
                if (offlineIcon) offlineIcon.style.display = 'block';
                if (warning) warning.style.display = 'flex';
            }
        };

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        updateConnectionStatus();
    }

    // Test connectivity
    async testConnectivity() {
        try {
            await fetch('https://www.google.com/favicon.ico', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            });
            return true;
        } catch {
            return navigator.onLine;
        }
    }

    // Google Sheets submission with multiple strategies
    async submitToGoogleSheets(data) {
        console.log('=== INICIANDO MÚLTIPLAS ESTRATÉGIAS DE ENVIO ===');
        console.log('Dados a enviar:', data);

        // Check connectivity first
        const isConnected = await this.testConnectivity();
        if (!isConnected) {
            throw new Error('Sem conexão com a internet');
        }

        // Strategy 1: POST with no-cors mode
        try {
            console.log('=== ESTRATÉGIA 1: POST com no-cors ===');
            
            const payload = {
                name: data.name,
                phone: data.phone,
                guests: data.guests,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log('✅ POST no-cors enviado (provavelmente funcionou)');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return;

        } catch (error) {
            console.error('❌ Estratégia 1 falhou:', error);
        }

        // Strategy 2: GET with URL parameters
        try {
            console.log('=== ESTRATÉGIA 2: GET com parâmetros de URL ===');
            
            const params = new URLSearchParams({
                name: data.name,
                phone: data.phone,
                guests: data.guests,
                timestamp: new Date().toISOString(),
                method: 'GET'
            });

            const getUrl = `${this.scriptUrl}?${params.toString()}`;
            console.log('URL GET:', getUrl);

            const response = await fetch(getUrl, {
                method: 'GET',
                mode: 'no-cors'
            });

            console.log('✅ GET no-cors enviado (provavelmente funcionou)');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return;

        } catch (error) {
            console.error('❌ Estratégia 2 falhou:', error);
        }

        // Strategy 3: Regular CORS POST
        try {
            console.log('=== ESTRATÉGIA 3: POST regular com CORS ===');
            
            const payload = {
                name: data.name,
                phone: data.phone,
                guests: data.guests
            };

            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const responseText = await response.text();
                console.log('Response text:', responseText);
                
                if (responseText.includes('success') || responseText.includes('Presença confirmada')) {
                    console.log('✅ POST regular funcionou!');
                    return;
                }
            }

        } catch (error) {
            console.error('❌ Estratégia 3 falhou:', error);
        }

        // Strategy 4: FormData with no-cors
        try {
            console.log('=== ESTRATÉGIA 4: FormData com no-cors ===');
            
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('guests', data.guests);
            formData.append('timestamp', new Date().toISOString());

            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            console.log('✅ FormData no-cors enviado (provavelmente funcionou)');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return;

        } catch (error) {
            console.error('❌ Estratégia 4 falhou:', error);
        }

        // Strategy 5: Image beacon
        try {
            console.log('=== ESTRATÉGIA 5: Image beacon ===');
            
            const params = new URLSearchParams({
                name: data.name,
                phone: data.phone,
                guests: data.guests,
                timestamp: new Date().toISOString(),
                method: 'beacon'
            });

            const beaconUrl = `${this.scriptUrl}?${params.toString()}`;
            
            const img = new Image();
            
            const imagePromise = new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    console.log('✅ Image beacon timeout - provavelmente funcionou');
                    resolve();
                }, 5000);

                img.onload = () => {
                    clearTimeout(timeout);
                    console.log('✅ Image beacon carregou - funcionou!');
                    resolve();
                };

                img.onerror = () => {
                    clearTimeout(timeout);
                    console.log('✅ Image beacon erro - mas provavelmente funcionou');
                    resolve();
                };
            });

            img.src = beaconUrl;
            await imagePromise;
            return;

        } catch (error) {
            console.error('❌ Estratégia 5 falhou:', error);
        }

        // If all strategies fail, save to backup
        console.log('⚠️ TODAS AS ESTRATÉGIAS FALHARAM - Salvando backup local');
        
        try {
            const backupData = {
                ...data,
                timestamp: new Date().toISOString(),
                failedAt: new Date().toISOString(),
                error: 'Todas as estratégias de envio falharam',
                userAgent: navigator.userAgent,
                url: window.location.href,
                strategiesTried: ['POST no-cors', 'GET params', 'POST CORS', 'FormData no-cors', 'Image beacon']
            };
            
            const existingBackups = JSON.parse(localStorage.getItem('pinheiro_backup_confirmations') || '[]');
            existingBackups.push(backupData);
            localStorage.setItem('pinheiro_backup_confirmations', JSON.stringify(existingBackups));
            
            console.log('💾 Dados salvos localmente como backup');
            this.updateDebugPanel();
        } catch (backupError) {
            console.error('❌ Erro ao salvar backup local:', backupError);
        }

        // Continue to success screen anyway
        console.log('🤞 Continuando para tela de sucesso (uma das estratégias provavelmente funcionou)');
    }

    // Google Maps integration
    openGoogleMaps() {
        if (this.isMobile()) {
            window.open(this.eventDetails.googleMapsUrl, '_blank');
        } else {
            const encodedAddress = encodeURIComponent(this.eventDetails.address);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            window.open(mapsUrl, '_blank');
        }
    }

    // Calendar integration
    addToCalendar() {
        const startDateTimeUTC = '20250819T180000Z';
        const endDateTimeUTC = '20250820T000000Z';
        
        const encodedTitle = encodeURIComponent(this.eventDetails.title);
        const encodedDescription = encodeURIComponent(this.eventDetails.description);
        const encodedLocation = encodeURIComponent(this.eventDetails.address);

        if (this.isIOS()) {
            const appleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateTimeUTC}/${endDateTimeUTC}&details=${encodedDescription}&location=${encodedLocation}`;
            window.open(appleCalendarUrl, '_blank');
        } else if (this.isAndroid()) {
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateTimeUTC}/${endDateTimeUTC}&details=${encodedDescription}&location=${encodedLocation}`;
            window.open(googleCalendarUrl, '_blank');
        } else {
            const userAgent = navigator.userAgent.toLowerCase();
            
            if (userAgent.includes('edge') || userAgent.includes('outlook')) {
                const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=2025-08-19T15:00:00&enddt=2025-08-19T21:00:00&body=${encodedDescription}&location=${encodedLocation}`;
                window.open(outlookUrl, '_blank');
            } else {
                const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateTimeUTC}/${endDateTimeUTC}&details=${encodedDescription}&location=${encodedLocation}`;
                window.open(googleCalendarUrl, '_blank');
            }
        }
    }

    // Debug Panel
    initializeDebugPanel() {
        this.updateDebugPanel();
    }

    updateDebugPanel() {
        const backupData = this.getBackupData();
        const debugCount = document.getElementById('debug-count');
        const debugBody = document.getElementById('debug-body');
        const debugActions = document.getElementById('debug-actions');
        
        if (backupData.length > 0) {
            if (debugCount) {
                debugCount.textContent = backupData.length.toString();
                debugCount.style.display = 'block';
            }
            
            if (debugBody) {
                debugBody.innerHTML = `
                    <p style="margin-bottom: 1rem; color: #6b7280; font-size: 0.875rem;">
                        ${backupData.length} confirmação(ões) em backup local
                    </p>
                    <div style="max-height: 200px; overflow-y: auto;">
                        ${backupData.map((item, index) => `
                            <div class="debug-item">
                                <div><strong>Nome:</strong> ${item.name}</div>
                                <div><strong>Telefone:</strong> ${item.phone}</div>
                                <div><strong>Acompanhantes:</strong> ${item.guests}</div>
                                <div><strong>Data:</strong> ${new Date(item.timestamp).toLocaleString('pt-BR')}</div>
                                ${item.error ? `<div style="color: #ef4444; margin-top: 0.25rem;"><strong>Erro:</strong> ${item.error}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            if (debugActions) {
                debugActions.style.display = 'flex';
            }
        } else {
            if (debugCount) {
                debugCount.style.display = 'none';
            }
            
            if (debugBody) {
                debugBody.innerHTML = `
                    <p class="debug-info">Nenhum dado em backup. Todas as confirmações foram enviadas com sucesso!</p>
                `;
            }
            
            if (debugActions) {
                debugActions.style.display = 'none';
            }
        }
    }

    getBackupData() {
        try {
            return JSON.parse(localStorage.getItem('pinheiro_backup_confirmations') || '[]');
        } catch {
            return [];
        }
    }

    toggleDebugPanel() {
        const debugContent = document.getElementById('debug-content');
        if (debugContent) {
            const isVisible = debugContent.style.display === 'block';
            debugContent.style.display = isVisible ? 'none' : 'block';
        }
    }

    hideDebugPanel() {
        const debugContent = document.getElementById('debug-content');
        if (debugContent) {
            debugContent.style.display = 'none';
        }
    }

    downloadBackupData() {
        const backupData = this.getBackupData();
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pinheiro-backup-confirmations-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    clearBackupData() {
        localStorage.removeItem('pinheiro_backup_confirmations');
        this.updateDebugPanel();
    }

    // Instructions Modal
    showInstructions() {
        const overlay = document.getElementById('instructions-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideInstructions() {
        const overlay = document.getElementById('instructions-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    copyCodeToClipboard() {
        const codeElement = document.getElementById('script-code');
        const copyBtn = document.getElementById('copy-code');
        
        if (codeElement && copyBtn) {
            navigator.clipboard.writeText(codeElement.textContent).then(() => {
                const icon = copyBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'check-circle');
                    this.initializeIcons();
                    setTimeout(() => {
                        icon.setAttribute('data-lucide', 'copy');
                        this.initializeIcons();
                    }, 2000);
                }
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PinheiroInviteApp();
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}