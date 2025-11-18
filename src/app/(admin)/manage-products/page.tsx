const products = [
  {
    name: "Luxury Gift Basket",
    sku: "GIF-104",
    price: "₦79,900",
    stock: "32 units",
    status: "Live",
  },
  {
    name: "Premium Coffee Kit",
    sku: "KIT-238",
    price: "₦99,900",
    stock: "Low stock",
    status: "Live",
  },
  {
    name: "Daily Essentials Pack",
    sku: "GRO-182",
    price: "₦25,900",
    stock: "54 units",
    status: "Draft",
  },
];

export default function ManageProducts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">
            Manage inventory, pricing, and catalog visibility.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            Bulk actions
          </button>
          <button className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition">
            Add product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">SKU</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Inventory</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.sku} className="text-gray-700">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "Live"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-sm font-semibold text-purple-600">
                      Edit
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Archive
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
