"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit, ListCheck, Trash } from "lucide-react";
import { Order } from "../../../../types/index"
import OrderTracking from "@component/components/admin/OrderTracking";
import { montserrat, orbitron } from "@component/font/font";
import MiniMap from "@component/components/admin/MapContainer";
import Loader from "@component/components/common/Loader";

const fetcher = (url: string) => axios.get(url).then(res => res.data);


export default function AdminOrderPage({ params }: { params: { orderId: string } }) {


  useEffect(() => {
    document.title = "Partner | Orders Details"
  }, [])


  const unwrappedparams = React.use(params)
  const { orderId } = unwrappedparams;
  const router = useRouter();
  const { data: order, mutate, error, isLoading } = useSWR<Order>(`/api/orders/${orderId}`, fetcher);

  const [status, setStatus] = useState(
    order?.statusHistory?.[order.statusHistory.length - 1]?.status || "pending"
  );
  const [partner, setPartner] = useState(order?.partner);

  if (!order || isLoading) return <><Loader /></>;

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/orders/${orderId}`, { status, partner });
      mutate(res.data, false);
      alert("Order updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    }
  };


  return (
    <main className="space-y-6">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListCheck />
          <h1 className={`text-3xl font-semibold ${orbitron.className}`}>Orders Details</h1>
        </div>
      </div>


      <div className="relative overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Order ID
              </th>
              <td className="px-6 py-3 text-gray-900 text-sm">{order._id}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Customer Name
              </th>
              <td className="px-6 py-3 text-gray-900 text-sm">{order.customerName}</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Address
              </th>
              <td className="px-6 py-3 text-gray-900 text-sm">{order.address}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Partner Name
              </th>
              <td className="md:px-6 px-4 py-3">
                <input
                  type="text"
                  value={partner ?? `${order.partner}`}
                  onChange={(e) => setPartner(e.target.value)}
                  className="md:w-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Status
              </th>
              <td className="md:px-6 px-4 py-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="md:w-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <th className="px-6 py-3 text-left text-sm font-semibold bg-gray-200/40 text-gray-700">
                Created At
              </th>
              <td className="px-6 py-3 text-gray-900 text-sm">{order.createdAt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <button
          onClick={handleUpdate}
          className="px-3 flex border border-green-600 rounded text-green-600 items-center gap-2 py-1"
        >
          <Edit size={18} /> Update
        </button>
      </div>


      <div className="mb-8 space-y-4">
        <h2 className={`${montserrat.className} font-bold`}>Tracking Partner</h2>
        <MiniMap address={order.address} />
      </div>


      <OrderTracking order={order} />
    </main >
  );
}
