"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Dunnis Stores");
  const [supportEmail, setSupportEmail] = useState("support@dunnis.store");
  const [phone, setPhone] = useState("+234 800 000 0000");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin settings</h1>
        <p className="text-gray-600">
          Update storefront metadata, contact info, and alerts.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Store name
          </label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 mt-1 p-3 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Support email
            </label>
            <input
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 mt-1 p-3 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Hotline
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 mt-1 p-3 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
        <button className="rounded-full bg-purple-600 text-white px-6 py-3 font-semibold hover:bg-purple-700 transition">
          Save settings
        </button>
      </div>
    </div>
  );
}


