"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type Region = 'north_america' | 'europe_australia';
export type SecuringMethod = 'indirect' | 'direct';

interface RegionContextType {
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  securingMethod: SecuringMethod;
  setSecuringMethod: (method: SecuringMethod) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

interface RegionProviderProps {
  children: ReactNode;
}

export function RegionProvider({ children }: RegionProviderProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region>('north_america');
  const [securingMethod, setSecuringMethod] = useState<SecuringMethod>('indirect');

  return (
    <RegionContext.Provider value={{ 
      selectedRegion, 
      setSelectedRegion, 
      securingMethod, 
      setSecuringMethod 
    }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
