"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PartnerContextType {
  partner: string | null;
  login: (partnerName: string, token: string) => void;
  logout: () => void;
}

const PartnerContext = createContext<PartnerContextType>({
  partner: null,
  login: () => {},
  logout: () => {},
});

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [partner, setPartner] = useState<string | null>(null);

  // ✅ On mount, read partner name from cookies (or localStorage)
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc: any, c) => {
      const [k, v] = c.split("=");
      acc[k] = v;
      return acc;
    }, {});

    const partnerName = localStorage.getItem("partnerName"); // save name also
    if (cookies.partnerToken && partnerName) {
      setPartner(partnerName);
    }
  }, []);

  const login = (partnerName: string, token: string) => {
    setPartner(partnerName);
    document.cookie = `partnerToken=${token}; path=/`;
    localStorage.setItem("partnerName", partnerName); // 🔑 persist name
  };

  const logout = () => {
    setPartner(null);
    document.cookie = "partnerToken=; max-age=0; path=/";
    localStorage.removeItem("partnerName");
  };

  return (
    <PartnerContext.Provider value={{ partner, login, logout }}>
      {children}
    </PartnerContext.Provider>
  );
}

export const usePartner = () => useContext(PartnerContext);
