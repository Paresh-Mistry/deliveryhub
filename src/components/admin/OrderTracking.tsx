import { montserrat } from "@component/font/font";
import { Order } from "@component/types";
import { Check, Clock } from "lucide-react";

export default function OrderTracking({ order }: { order: Order }) {
    return (
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-8 rounded-lg">
                    <h3 className={`${montserrat.className} font-bold`}>Order history</h3>

                <ol className="relative ms-6 border-s border-gray-200 dark:border-gray-700">

                    {order.statusHistory?.map((entry: any, idx: any) => (
                        <li className="mb-10 ms-8" key={idx}>
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 dark:ring-gray-700">
                                {entry.status == "pending" ? <Clock size={16} /> : <Check size={16} />}
                            </span>
                            <h4 className="mb-0.5 text-base font-semibold text-gray-900">
                                {entry.status}
                            </h4>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(entry.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ol>

            </div>
        </div>
    )
}
