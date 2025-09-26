"use client";

import { useEffect, useState } from "react";

interface Order {
    _id: string;
    customerName: string;
    address: string;
    statusHistory: { status: string; updatedAt: string }[];
    createdAt: string;
}

export default function PartnerOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders/partners", {
                    method: "GET",
                    credentials: "include", // include cookies
                });
                const data = await res.json();
                if (res.ok) {
                    console.log(data)
                    setOrders(data);
                }
            } catch (error) {
                console.error("Error fetching partner orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500 mt-6">Loading orders...</p>;
    }

    if (orders.length === 0) {
        return <p className="text-center text-gray-500 mt-6">No assigned orders.</p>;
    }

    return (
        <>
            {orders.map((order) => {
                // const latestStatus =
                //     order.statusHistory[order.statusHistory.length - 1];
                return (
                    <div
                        key={order._id}
                        className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {order.customerName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Address:</span> {order.address}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Created:</span>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        {/* <p
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${latestStatus.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : latestStatus.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {latestStatus.status.toUpperCase()}
                        </p> */}
                    </div>
                );
            })}
        </>
    );
}
