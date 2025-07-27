
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Karyawan {
  id: number;
  nama: string;
  nik: string;
  jabatan: string;
  lokasiId: number;
  username: string;
  password?: string;
}

// For adding/updating, password can be optional.
type KaryawanInput = Omit<Karyawan, 'id' | 'password'> & { password?: string };

interface KaryawanContextType {
  karyawanList: Karyawan[];
  addKaryawan: (karyawan: KaryawanInput) => void;
  updateKaryawan: (id: number, updatedKaryawan: KaryawanInput) => void;
  deleteKaryawan: (id: number) => void;
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
      } else {
        // Add default admin user if no list exists
        const adminUser: Karyawan = {
          id: 1,
          nama: 'ADMIN',
          nik: '0000',
          jabatan: 'ADMIN',
          lokasiId: 0,
          username: 'admin',
          password: 'admin'
        };
        setKaryawanList([adminUser]);
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


  const addKaryawan = (karyawan: KaryawanInput) => {
    const newKaryawan: Karyawan = { ...karyawan, id: Date.now(), password: karyawan.password! };
    setKaryawanList(prevList => [...prevList, newKaryawan]);
  };
  
  const updateKaryawan = (id: number, updatedKaryawan: KaryawanInput) => {
    setKaryawanList(prevList =>
      prevList.map(karyawan => {
        if (karyawan.id === id) {
          // If password is not provided or empty, keep the old one
          const newPassword = updatedKaryawan.password || karyawan.password;
          return { ...karyawan, ...updatedKaryawan, password: newPassword };
        }
        return karyawan;
      })
    );
  };

  const deleteKaryawan = (id: number) => {
    setKaryawanList(prevList => prevList.filter(karyawan => karyawan.id !== id));
  };


  return (
    <KaryawanContext.Provider value={{ karyawanList, addKaryawan, updateKaryawan, deleteKaryawan }}>
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
