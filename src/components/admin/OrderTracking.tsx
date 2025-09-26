import { Order } from "@component/types";
import { Check, Clock } from "lucide-react";

export default function OrderTracking({ order }: { order: Order }) {
    return (
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-8 rounded-lg">
                <h3 className="text-xl font-thin">Order history</h3>

                <ol className="relative ms-6 border-s border-gray-200 dark:border-gray-700">

                    {order.statusHistory?.map((entry: any, idx: any) => (
                        <li className="mb-10 ms-8" key={idx}>
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 dark:ring-gray-700">
                                {entry.status == "pending" ? <Clock size={16} /> : <Check size={16} />}
                            </span>
                            <h4 className="mb-0.5 text-base font-semibold text-gray-900">
                                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1, entry.status.length).toLowerCase()}
                            </h4>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(entry.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ol>

                <div className="gap-4 sm:flex sm:items-center justify-end">
                    <button
                        type="button"
                        className="w-full md:w-fit rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    >
                        Cancel the order
                    </button>
                </div>
            </div>
        </div>
    )
}
