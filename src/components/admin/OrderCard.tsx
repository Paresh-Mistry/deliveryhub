import { ArrowUpRight } from "lucide-react";


export default function OrderCard(
    { orderId, partnerName, status }: { orderId: string, partnerName: string, status: string }) {
    const getStatusClasses = () => {
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
        <div className="p-4 rounded-xl shadow bg-white hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">Order #{orderId}</h2>
            <p className="text-sm text-gray-700 mb-4">
                <span className="font-medium">Partner:</span>{" "}
                {partnerName || "Not Assigned"}
            </p>
            <div className="flex justify-between items-center">
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClasses()}`}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <span>
                    <ArrowUpRight />
                </span>
            </div>
        </div>
    );
}
