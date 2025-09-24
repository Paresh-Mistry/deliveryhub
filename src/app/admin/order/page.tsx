"use client"

import OrderCard from "@component/components/admin/OrderCard";
import { ListCheck, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

type Order = {
  orderId: string;
  customerName: string;
  address: string;
  partnerName?: string | null;
  status: string;
};

export default function Page() {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setMessage("");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newOrder: Order = {
            orderId: formData.get("orderId") as string,
            customerName: formData.get("customerName") as string,
            address: formData.get("address") as string,
            partnerName: formData.get("partnerName") as string || null,
            status: formData.get("status") as string,
        };

        try {
            const res = await axios.post("/api/orders", newOrder);

            if (res.status === 201) {
                setOrders(prev => [...prev, newOrder]);
                setMessage("Order created successfully!");
                e.target.reset();
            }
        } catch (error: any) {
            console.error(error);
            if (error.response) {
                setMessage(error.response.data.message || "Failed to create order.");
            } else {
                setMessage("Server error. Try again later.");
            }
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ListCheck />
                        <h1 className="text-3xl font-semibold">Order</h1>
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
                    {orders.map((o) => (
                        <OrderCard
                            key={o.orderId}
                            orderId={o.orderId}
                            customerName={o.customerName}
                            partnerName={o.partnerName || ""}
                            status={o.status}
                        />
                    ))}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 backdrop-saturate-150 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
                        {message && <p className="mb-2 text-green-500">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Order ID</label>
                                <input
                                    type="text"
                                    name="orderId"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
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
                                <input
                                    type="text"
                                    name="partnerName"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
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
    )
}
