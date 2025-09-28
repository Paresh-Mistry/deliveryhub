// components/OrderCard.tsx
import { ArrowUpRight } from "lucide-react";
import type { Order } from "../../types/index"
import Link from "next/link";

export default function OrderCard({ orders }: { orders: Order[] }) {

    const getStatusClasses = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "assigned":
                return "bg-blue-100 text-blue-800";
            case "picked_up":
                return "bg-orange-100 text-orange-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            {orders.map(order => (
                <div
                    key={order._id}
                    className="p-4 rounded-xl shadow bg-white hover:shadow-lg transition mb-4"
                >
                    <h2 className="text-sm mb-2">
                        Order #{order._id}
                    </h2>
                    <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Partner:</span>{" "}
                        {order.partner || "Not Assigned"}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className={`text-sm px-2 rounded-2xl ${getStatusClasses(order.statusHistory?.at(-1)?.status + "")}`}>
                            {order.statusHistory?.at(-1)?.status || "Not Assigned"}
                        </span>
                        <Link href={`/admin/order/${order._id}`}>
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
