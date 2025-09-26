"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePartner } from "../context/authContext";

export default function PartnerLogin() {
  const { login } = usePartner();
  const router = useRouter();

  const [open, setOpen] = useState(true); // show popup on render
  const [partnerName, setPartnerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/partners/auth", { partnerName });

      console.log(res.data)

      if (res.data.success) {
        // use partnerName as fallback token if res.data.token is missing
        const token = res.data.token || `${partnerName}-token`;

        login(partnerName, token); // context login sets cookie + state
        console.log("Assigned Token:", token);

        setOpen(false);

        // always use absolute path
        router.push("/dashboard/partner");
      } else {
        setError(res.data.message || "Invalid login");
      }
    } catch (err: any) {
      console.error("Login Error: ", err);
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Partner Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Partner Name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
