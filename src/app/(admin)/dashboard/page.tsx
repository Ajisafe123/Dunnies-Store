const stats = [
  { label: "Products live", value: "126", trend: "+8 this week", color: "text-violet-600" },
  { label: "Orders pending", value: "42", trend: "12 awaiting fulfillment", color: "text-blue-600" },
  { label: "Revenue (7d)", value: "₦4.8M", trend: "+14% vs last week", color: "text-emerald-600" },
  { label: "New customers", value: "87", trend: "+23% MoM", color: "text-amber-600" },
];

const recentOrders = [
  {
    id: "#ORD-1042",
    customer: "Chiamaka Obi",
    total: "₦89,500",
    status: "In transit",
    date: "Nov 18",
  },
  {
    id: "#ORD-1039",
    customer: "Kelechi James",
    total: "₦152,000",
    status: "Processing",
    date: "Nov 17",
  },
  {
    id: "#ORD-1035",
    customer: "Maya Bello",
    total: "₦64,900",
    status: "Delivered",
    date: "Nov 16",
  },
];

const bestSellers = [
  { name: "Luxury Gift Basket", units: 42, revenue: "₦3.3M" },
  { name: "Premium Coffee Kit", units: 28, revenue: "₦2.1M" },
  { name: "Wellness Gift Set", units: 33, revenue: "₦1.8M" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard overview</h1>
        <p className="text-gray-600">
          Monitor live store metrics, fulfillment, and customer sentiment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Live orders
              </h2>
              <p className="text-sm text-gray-500">
                Last updated a few seconds ago
              </p>
            </div>
            <button className="text-sm font-semibold text-purple-600">
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-gray-500">{order.customer}</p>
                </div>
                <p className="font-semibold text-gray-900">{order.total}</p>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {order.status}
                </span>
                <p className="text-gray-400">{order.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Best sellers
            </h2>
            <button className="text-sm text-gray-500">Last 30 days</button>
          </div>
          <div className="space-y-4">
            {bestSellers.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.units} units</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
