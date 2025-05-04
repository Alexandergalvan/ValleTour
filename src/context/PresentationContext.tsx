import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface PresentationContextType {
  presentationMode: boolean;
  togglePresentationMode: () => void;
  setPresentationMode: (enabled: boolean) => void;
  presentationInterval: number;
  setPresentationInterval: (seconds: number) => void;
  customRoutes: string[] | null;
  setCustomRoutes: (routes: string[] | null) => void;
  hotkey: string;
  setHotkey: (key: string) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

interface PresentationProviderProps {
  children: ReactNode;
}

export const PresentationProvider: React.FC<PresentationProviderProps> = ({ children }) => {
  const [presentationMode, setPresentationMode] = useState(false);
  const [presentationInterval, setPresentationInterval] = useState(8);
  const [customRoutes, setCustomRoutes] = useState<string[] | null>(null);
  const [hotkey, setHotkey] = useState('p');

  const togglePresentationMode = () => {
    setPresentationMode((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === hotkey.toLowerCase()) {
        const activeElement = document.activeElement as HTMLElement;
        const isTextField = activeElement.tagName === 'INPUT' || 
                            activeElement.tagName === 'TEXTAREA' || 
                            activeElement.isContentEditable;
        
        if (!isTextField) {
          togglePresentationMode();
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotkey]);

  const value = {
    presentationMode,
    togglePresentationMode,
    setPresentationMode,
    presentationInterval,
    setPresentationInterval,
    customRoutes,
    setCustomRoutes,
    hotkey,
    setHotkey,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentationMode = (): PresentationContextType => {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentationMode debe usarse dentro de un PresentationProvider');
  }
  return context;
};

export default PresentationContext; 