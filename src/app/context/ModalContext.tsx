"use client";
import { createContext, useContext, useState, ReactNode } from "react";


const ModalContext = createContext({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => { },
    message: "",
    setMessage: (message: string) => { },
    openModal: () => { },
    closeModal: () => { },
});



export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setloading] = useState(false)

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setMessage("");
    };


    return (
        <ModalContext.Provider 
            value={{
                isOpen,
                setIsOpen,
                message,
                setMessage,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
