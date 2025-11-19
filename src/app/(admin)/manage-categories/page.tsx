const categories = [
  { name: "Gifts & Experiences", products: 42, updated: "Nov 15" },
  { name: "Groceries", products: 58, updated: "Nov 14" },
  { name: "Wellness", products: 21, updated: "Nov 12" },
];

export default function ManageCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">
            Organize product groups and update landing sections.
          </p>
        </div>
        <button className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition">
          Add category
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {category.products} products
                </p>
              </div>
              <span className="text-xs text-gray-400">
                Updated {category.updated}
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                Edit
              </button>
              <button className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition">
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




