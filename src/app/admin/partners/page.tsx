import OrderCard from "@component/components/admin/OrderCard";
import { Edit, ListCheck, ListOrdered, Trash } from "lucide-react";


const partners = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Active" },
];



export default function Page() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <ListCheck />
                <h1 className="text-3xl font-semibold">Partners</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{partner.name}</h2>
                            <p className="text-gray-600">{partner.email}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                                {partner.status}
                            </span>
                            <div className="flex justify-end gap-4">
                                <button className=""><Edit size={16} /></button>
                                <button className=""><Trash size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}