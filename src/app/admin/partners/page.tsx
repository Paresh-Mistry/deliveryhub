"use client"

import axios from "axios";
import { Edit, ListCheck, ListOrdered, Plus, Trash } from "lucide-react";
import { Orbitron } from "next/font/google";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { Partner } from "../../../types/index"
import PartnerCard from "@component/components/admin/PartnerCard";


const orbitron = Orbitron({ subsets: ["latin"], weight: '400', variable: "--font-inter" })

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Page() {

    const {
        data: partners,
        mutate,
        error
    } = useSWR("/api/partners", fetcher)


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contactNo = formData.get("contactNo");

        const newPartners: Partner = {
            _id: uuidv4(),
            partnerName: formData.get("partnerName") as string,
            emailId: formData.get("emailId") as string,
            contactNo: contactNo ? (contactNo as string) : null,
            role: "Partner",
            vehicleType: formData.get("vehicleType") as string,
        };

        try {
            const res = await axios.post("/api/partners", newPartners);

            if (res.status === 200 || res.status === 201) {
                // Update SWR cache with new order
                mutate([...partners!, newPartners], false);
                e.target.reset();
                setTimeout(closeModal, 1000);
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ListCheck />
                    <h1 className={`text-3xl font-semibold ${orbitron.className}`}>Partners</h1>
                </div>
                <div>
                    <button
                        onClick={openModal}
                        className="flex items-center gap-1 bg-green-700 text-white px-3 py-2 rounded-md">
                        <Plus size={18} />
                        Partner
                    </button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PartnerCard partners={partners} />
            </div>

            {
                isOpen && (
                    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
                        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold mb-4">Add New Partner</h2>
                                <label htmlFor="dropzone-file" className="flex items-center justify-center bg-green-700 w-8 h-8 rounded-full">
                                    <Plus className="w-6 text-white" />
                                    <input
                                        type="file"
                                        name="image"
                                        id="dropzone-file"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Partner Name</label>
                                    <input
                                        type="text"
                                        name="partnerName"
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email ID</label>
                                    <input
                                        type="email"
                                        name="emailId"
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Contact Number</label>
                                    <input
                                        type="tel"
                                        name="contactNo"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Vehicle Type</label>
                                    <select
                                        name="vehicleType"
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    >
                                        <option value="pending">Two Wheeler</option>
                                        <option value="assigned">Four Wheeler</option>
                                        <option value="delivered">Tempo</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border rounded hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >

    )
}