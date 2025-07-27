
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lokasi {
  id: number;
  nama: string;
  detail: string;
}

interface LokasiContextType {
  lokasiList: Lokasi[];
  addLokasi: (lokasi: Omit<Lokasi, 'id'>) => void;
  updateLokasi: (id: number, updatedLokasi: Omit<Lokasi, 'id'>) => void;
  deleteLokasi: (id: number) => void;
}

const LokasiContext = createContext<LokasiContextType | undefined>(undefined);

export const LokasiProvider = ({ children }: { children: ReactNode }) => {
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);

  const addLokasi = (lokasi: Omit<Lokasi, 'id'>) => {
    const newLokasi = { ...lokasi, id: Date.now() };
    setLokasiList(prevList => [...prevList, newLokasi]);
  };

  const updateLokasi = (id: number, updatedLokasi: Omit<Lokasi, 'id'>) => {
    setLokasiList(prevList =>
      prevList.map(lokasi =>
        lokasi.id === id ? { ...lokasi, ...updatedLokasi } : lokasi
      )
    );
  };

  const deleteLokasi = (id: number) => {
    setLokasiList(prevList => prevList.filter(lokasi => lokasi.id !== id));
  };

  return (
    <LokasiContext.Provider value={{ lokasiList, addLokasi, updateLokasi, deleteLokasi }}>
      {children}
    </LokasiContext.Provider>
  );
};

export const useLokasi = () => {
  const context = useContext(LokasiContext);
  if (context === undefined) {
    throw new Error('useLokasi must be used within a LokasiProvider');
  }
  return context;
};
