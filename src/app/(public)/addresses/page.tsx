"use client";

import { useState } from "react";
import { MapPin, Edit2, Plus, Trash2, Home, Building } from "lucide-react";

const mockAddresses = [
  {
    id: "addr-home",
    label: "Home",
    recipient: "Sarah Johnson",
    phone: "+234 801 234 5678",
    line1: "12a Harvey Street",
    line2: "Lekki Phase 1",
    city: "Lagos",
    default: true,
    icon: Home,
  },
  {
    id: "addr-office",
    label: "Office",
    recipient: "Sarah Johnson",
    phone: "+234 801 111 2233",
    line1: "5th Floor, Nova Towers",
    line2: "Victoria Island",
    city: "Lagos",
    default: false,
    icon: Building,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
              Addresses
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mt-1">
              Saved locations
            </h1>
            <p className="text-gray-600 mt-2">
              Store delivery spots for home, office, and your favorite recipients.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-5 py-3 font-semibold hover:bg-purple-700 transition">
            <Plus className="w-4 h-4" />
            Add new address
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => {
            const Icon = address.icon || MapPin;
            return (
              <div
                key={address.id}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-50 text-purple-600">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {address.label}
                      </p>
                      {address.default && (
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button className="hover:text-purple-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setAddresses((prev) =>
                          prev.filter((item) => item.id !== address.id)
                        )
                      }
                      className="hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">{address.recipient}</p>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <p>{address.city}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>

                {!address.default && (
                  <button className="self-start text-sm font-semibold text-purple-600 hover:text-purple-700">
                    Set as default
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

