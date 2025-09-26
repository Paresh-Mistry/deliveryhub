"use client"

import { orbitron } from "@component/app/admin/layout"
import PartnerOrders from "@component/components/partner/PartnerOrder"
import { ListCheck, Plus } from "lucide-react"

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListCheck />
          <h1 className={`text-3xl font-semibold ${orbitron.className}`}>Assigned Orders</h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Pass all orders array to OrderCard */}
        <PartnerOrders/>
      </div>
    </div>
  )
}