"use client";

import { useState } from "react";
import { CreditCard, Plus, ShieldCheck, Trash2, Wallet } from "lucide-react";

const savedMethods = [
  {
    id: "pm-visa",
    brand: "Visa",
    last4: "4242",
    name: "Sarah Johnson",
    expiry: "09/28",
    default: true,
  },
  {
    id: "pm-mastercard",
    brand: "Mastercard",
    last4: "3010",
    name: "Sarah Johnson",
    expiry: "04/27",
    default: false,
  },
];

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState(savedMethods);

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
              Payments
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mt-1">
              Wallet & cards
            </h1>
            <p className="text-gray-600 mt-2">
              Manage saved cards, transfers, and pay-later preferences.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-5 py-3 font-semibold hover:bg-purple-700 transition">
            <Plus className="w-4 h-4" />
            Add payment method
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600">
              <Wallet className="w-6 h-6" />
            </span>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Pay with wallet
              </p>
              <p className="text-gray-600 text-sm">
                Fund your Dunnis wallet and enjoy lightning-fast checkout.
              </p>
            </div>
          </div>
          <button className="rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700 transition">
            Top up wallet
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {methods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiry}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-50 text-purple-600">
                  <CreditCard className="w-5 h-5" />
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>Cardholder: {method.name}</p>
                {method.default && (
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {!method.default && (
                  <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                    Make default
                  </button>
                )}
                <button className="text-sm text-gray-500 hover:text-red-500 inline-flex items-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Secure payments
              </p>
              <p className="text-sm text-gray-600">
                PCI-DSS compliant vault, OTP verification, and 3D Secure for all
                cards.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            We never store raw card numbers. Transactions are encrypted end to end,
            and you can remove saved methods anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

