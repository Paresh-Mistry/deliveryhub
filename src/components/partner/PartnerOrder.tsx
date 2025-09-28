"use client";
import useSWR from "swr";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Loader from "../common/Loader";
import Error from "../common/error";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then(res => res.data);

export default function PartnerOrders() {
  const { data:order, error, isLoading } = useSWR("/api/partners/orders", fetcher);

  if (isLoading) return <div className="mt-3"><Loader/></div>;
  if (error) return <><Error error={error}/></>;

  const orders = order?.orders ?? [];

  return (
    <>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order: any, idx: number) => (
          <div
            key={order._id || idx}
            className="p-4 relative border-l-3 border-blue-500 shadow bg-white hover:shadow-lg transition mb-4"
          >
            <div className="absolute top-0 right-0 py-1 px-2 text-xs mb-2">{idx + 1}</div>
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-medium">Customer Name:</span>{" "}
              {order.customerName || "Not Assigned"}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm px-2 rounded-2xl">
                {order.statusHistory?.at(-1)?.status || "Not Assigned"}
              </span>
              <Link href={`/dashboard/partner/${order._id}`}>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
