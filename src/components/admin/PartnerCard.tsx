// components/OrderCard.tsx
import { Edit, Phone, Trash } from "lucide-react";
import { Partner } from "../../types/index"

export default function PartnerCard({ partners }: { partners: Partner[] }) {

    return (
        <>
            {partners?.map((partner: any) => (
                <div
                    key={partner._id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-xl">{partner?.PartnerName}</h2>
                        <p className="text-gray-600">{partner.emailId}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <span
                            className={`text-xs flex items-center gap-1 font-semibold py-1 rounded-full`}>
                            <Phone size={15}/>
                            {partner.contactNo}
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}
