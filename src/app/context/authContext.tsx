"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Partner {
  _id: string;
  PartnerName: string;
  email?: string;
  phone?: string;
  vehicleType?: string;
}

interface PartnerContextType {
  partner: Partner | null;
  login: (partner: Partner, token: string) => void;
  logout: () => void;
}


const PartnerContext = createContext<PartnerContextType>({
  partner: null,
  login: () => { },
  logout: () => { },
});

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [partner, setPartner] = useState<Partner | null>(null);

  // On mount, restore partner name from localStorage
  useEffect(() => {
    const savedPartner = localStorage.getItem("partner");
    if (savedPartner) {
      setPartner(JSON.parse(savedPartner));
    }
    console.log("Restored Partner from Storage: ", savedPartner)
  }, []);

  // Called when partner logs in successfully
  const login = (partner: Partner, token: string) => {
    setPartner(partner);

    console.log("Logging in Partner : ", partner)

    // persist only partnerName, not token (server already sets httpOnly cookie)
    localStorage.setItem("partner", JSON.stringify(partner));
    document.cookie = `partnerToken=${token}; path=/`;

  };

  // Logout clears both state + storage
  const router = useRouter()
  const logout = () => {
    setPartner(null);
    localStorage.removeItem("partner");
    document.cookie = "partnerToken=; Max-Age=0; path=/";
    fetch("/api/partners/auth/logout", { method: "POST" });
    router.push("/auth");  // optional
  };

  return (
    <PartnerContext.Provider value={{ partner, login, logout }}>
      {children}
    </PartnerContext.Provider>
  );
}

export const usePartner = () => useContext(PartnerContext);
