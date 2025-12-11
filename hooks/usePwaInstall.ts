
import { useState, useEffect } from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<IBeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Verifica se já está rodando como PWA (standalone)
    const checkIsInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           (window.navigator as any).standalone === true; // iOS fallback
      setIsInstalled(isStandalone);
    };

    checkIsInstalled();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkIsInstalled);

    // Captura o evento de instalação (Chrome/Android/Edge)
    const handler = (e: Event) => {
      e.preventDefault(); 
      setDeferredPrompt(e as IBeforeInstallPromptEvent);
      setIsSupported(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkIsInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  return { isSupported, isInstalled, installApp, isIOS };
};
