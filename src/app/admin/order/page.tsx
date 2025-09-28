"use client"

import OrderCard from "@component/components/admin/OrderCard";
import { Order } from "@component/types";
import { ListCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { orbitron } from "@component/font/font";
import { useModal } from "@component/app/context/ModalContext";
import Loader from "@component/components/common/Loader";
import Error from "@component/components/common/error";

// fetching data from API
const fetcher = (url: string) => axios.get(url).then(res => res.data);


export default function Page() {

    useEffect(() => {
        document.title = "Admin | Orders"
    }, [])


    const {
        data: partners
    } = useSWR("/api/partners", fetcher)

    // Retriving Orders Details
    const {
        data: orders,
        mutate,
        error,
        isLoading,
    } = useSWR<Order[]>("/api/orders", fetcher);


    const {
        isOpen,
        message,
        setMessage,
        openModal,
        closeModal
    } = useModal()


    // Creating Order at Admin 
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const partnerName = formData.get("partner");

        const newOrder: Order = {
            _id: uuidv4(),
            customerName: formData.get("customerName") as string,
            address: formData.get("address") as string,
            partner: partnerName ? (partnerName as string) : null,
            statusHistory: [{ status: formData.get("status") as string, updatedAt: new Date().toISOString() }],
            createdAt: new Date().toISOString(),
            PartnerData: []
        }

        try {
            const res = await axios.post("/api/orders", newOrder);

            if (res.status === 200 || res.status === 201) {
                // Update SWR cache with new order
                mutate([...orders!, newOrder], false);
                setMessage("Order created successfully!");
                e.target.reset();
                setTimeout(closeModal, 1000);
            }
        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.message || "Server error. Try again later.");
        }
    };

    if (!orders || isLoading) return <><Loader /></>;
    if (error) return <><Error error={error} /></>;

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ListCheck />
                        <h1 className={`text-3xl font-semibold ${orbitron.className}`}>Orders</h1>
                    </div>
                    <div>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-1 bg-green-700 text-white px-3 py-2 rounded-md">
                            <Plus size={18} />
                            Order
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Pass all orders array to OrderCard */}
                    <OrderCard orders={orders} />
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
                        {message && <p className="mb-2 text-green-500">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Customer Name</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Partner Name</label>
                                <select
                                    name="partner"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {partners.map((part: any, idx: number) => (
                                        <option key={idx} value={part.PartnerName}>
                                            {part.PartnerName}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Status</label>
                                <select
                                    name="status"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="delivered">Delivered</option>
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
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}