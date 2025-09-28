"use client";

import { orbitron } from "@component/font/font";
import { usePartner } from "@component/app/context/AuthContext";
import Image from "next/image";
import image from "../../../../public/globe.svg"
import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
    const { partner } = usePartner();

    if (!partner) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">No partner data available.</p>
            </div>
        );
    }

    useEffect(() => {
        document.title = "Partner | Profile"
    }, [])

    return (
        <div className="space-y-6">
            <h1 className={`text-2xl font-bold text-gray-800 ${orbitron.className}`}>
                Partner Profile
            </h1>

            <div className="flex bg-gray-200 rounded-full px-3 py-2 items-start gap-7">
                <div>
                    <Image alt="" width={100} src={image}></Image>
                </div>
                <div className="pt-2 space-y-0.5">
                    <h1 className="text-2xl">{partner.PartnerName}</h1>
                    <h1>{partner.email}</h1>
                    <h1><Phone className="inline-flex mr-1.5" size={18} />{partner.phone}</h1>
                </div>
            </div>

            <div className="space-y-3 px-3">
                <div className="">
                    <h1 className="text-2xl">Contact</h1>
                </div>
                <div className="pt-2 flex gap-3">
                    <Link href={`mailto:${partner.email}`}>
                        <Mail className="text-red-600" />
                    </Link>
                    <Link href={`sms:${partner.phone}`}>
                        <Phone className="text-green-900" />
                    </Link>
                    <Link href={`https://wa.me/:${partner.phone}`}>
                        <MessageCircle className="text-green-500" />
                    </Link>
                </div>
            </div>

        </div>
    );
}
