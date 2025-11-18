const orders = [
  {
    id: "#ORD-1042",
    customer: "Chiamaka Obi",
    total: "₦89,500",
    payment: "Paid",
    status: "In transit",
    items: 5,
  },
  {
    id: "#ORD-1039",
    customer: "Kelechi James",
    total: "₦152,000",
    payment: "Pending",
    status: "Processing",
    items: 3,
  },
  {
    id: "#ORD-1035",
    customer: "Maya Bello",
    total: "₦64,900",
    payment: "Paid",
    status: "Delivered",
    items: 2,
  },
  {
    id: "#ORD-1027",
    customer: "Bode A.",
    total: "₦34,200",
    payment: "Refunded",
    status: "Cancelled",
    items: 1,
  },
];

export default function ManageOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">
            Track fulfillment, payments, and customer information.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            Export CSV
          </button>
          <button className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition">
            Create order
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Payment</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="text-gray-700">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.payment === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.payment === "Pending"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "In transit"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Processing"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-sm font-semibold text-purple-600">
                      View
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
