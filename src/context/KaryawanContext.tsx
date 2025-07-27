
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Karyawan {
  id: number;
  nama: string;
  nik: string;
  jabatan: string;
  lokasiId: number;
}

interface KaryawanContextType {
  karyawanList: Karyawan[];
  addKaryawan: (karyawan: Omit<Karyawan, 'id'>) => void;
  // updateKaryawan: (id: number, updatedKaryawan: Omit<Karyawan, 'id'>) => void;
  // deleteKaryawan: (id: number) => void;
}

const KaryawanContext = createContext<KaryawanContextType | undefined>(undefined);

export const KaryawanProvider = ({ children }: { children: ReactNode }) => {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem('karyawanList');
      if (item) {
        setKaryawanList(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem('karyawanList', JSON.stringify(karyawanList));
      } catch (error) {
        console.error(error);
      }
    }
  }, [karyawanList, isClient]);


  const addKaryawan = (karyawan: Omit<Karyawan, 'id'>) => {
    const newKaryawan = { ...karyawan, id: Date.now() };
    setKaryawanList(prevList => [...prevList, newKaryawan]);
  };

  return (
    <KaryawanContext.Provider value={{ karyawanList, addKaryawan }}>
      {children}
    </KaryawanContext.Provider>
  );
};

export const useKaryawan = () => {
  const context = useContext(KaryawanContext);
  if (context === undefined) {
    throw new Error('useKaryawan must be used within a KaryawanProvider');
  }
  return context;
};
