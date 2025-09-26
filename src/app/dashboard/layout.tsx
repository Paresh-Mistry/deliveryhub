"use client";

import { History, Home, Info, Menu, Settings, Tag } from "lucide-react";
import Link from "next/link";
import Navbar from "@component/components/common/Navbar";
import { useState } from "react";

import { Orbitron } from 'next/font/google'
import { usePartner } from "../context/authContext";
const orbitron = Orbitron({ subsets: ["latin"], weight: '400', variable: "--font-inter" })


const SidebarLink = ({
    href,
    icon,
    label,
    isOpen,
}: {
    icon: React.ReactNode;
    href: string;
    label: string;
    isOpen: boolean;
}) => {
    return (
        <Link
            href={href}
            className={`flex gap-3 items-center ${!isOpen && 'justify-center rounded-full'} px-4 py-2 hover:bg-gray-200 transition rounded-r-full cursor-pointer`}
        >
            <div className="">{icon}</div>
            {isOpen && <span className="text-sm">{label}</span>}
        </Link>
    )
}



export default function Sidebarlayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const {partner} = usePartner()

    return (
        <>
            <div className="md:hidden"><Navbar /></div>
            <div className="md:pt-0 pt-16 md:grid grid-cols-[auto_1fr] min-h-screen transition-all duration-300 ease-in-out">
                {/* Sidebar */}
                <aside
                    className={`hidden md:block border-r border-gray-200 bg-gray-100 h-full transition-all duration-300 ease-in-out 
          ${isOpen ? "w-64" : "w-20"} overflow-hidden`}
                >
                    <div className={`flex items-center mb-3 ${isOpen ? 'justify-between bg-white border-b border-gray-200' : 'justify-center'} px-4 py-4`}>
                        <Link href={'/'} className={`${orbitron.className} text-lg font-semibold italic text-blue-600`}>
                            {isOpen && "Deliveryhub"}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <Menu size={20} />
                        </button>
                    </div>

                    <div>
                        {isOpen && <div className="px-4">
                            <h5 className="text-xs">Menu</h5>
                        </div>}

                        <nav className="mt-3 space-y-1">
                            <SidebarLink icon={<Home />} label="Home" isOpen={isOpen} href={'/'} />
                            <SidebarLink icon={<Info />} label="About " isOpen={isOpen} href={'/'} />
                        </nav>
                    </div>

                    {!isOpen && <div className="w-1 h-1 mx-auto mt-5 bg-gray-700 rounded"></div>}

                    <div className="mt-5">
                        {isOpen && <div className="px-4">
                            <h5 className="text-xs">Getting Started</h5>
                        </div>}

                        <nav className="mt-3 space-y-1">
                            <SidebarLink icon={<Tag />} label="Assignment " isOpen={isOpen} href={'/dashboard/partner'} />
                            <SidebarLink icon={<Settings />} label="Settings" isOpen={isOpen} href={'/dashboard/settings'} />
                        </nav>
                    </div>

                </aside>

                {/* Main Content */}
                <section className="bg-gray-50 md:px-8 px-4 py-4 md:py-5">
                    <div className="flex justify-end items-center">
 {
                            partner ?
                                <span>{partner.split(",")[0]}</span>
                                :
                                <Link href={'/auth'} className="font-semi-bold text-sm">Sign in</Link>
                        }                    </div>

                    <div className="mt-4">
                        {children}
                    </div>
                </section>
            </div>
        </>
    );
}
