import Link from 'next/link'

const categories = [
  { name: "Birthday Gifts", icon: "Cake", color: "from-pink-400 to-pink-600", href: "/gifts/birthday" },
  { name: "Wedding Gifts", icon: "Bouquet", color: "from-purple-400 to-purple-600", href: "/gifts/wedding" },
  { name: "Jewelry", icon: "Gem", color: "from-blue-400 to-blue-600", href: "/categories/jewelry" },
  { name: "Home Decor", icon: "Home", color: "from-teal-400 to-teal-600", href: "/categories/decor" },
  { name: "Fresh Produce", icon: "LeafyGreen", color: "from-green-400 to-green-600", href: "/groceries/produce" },
  { name: "Dairy & Eggs", icon: "Milk", color: "from-yellow-400 to-yellow-600", href: "/groceries/dairy" },
  { name: "Bakery", icon: "Bread", color: "from-orange-400 to-orange-600", href: "/groceries/bakery" },
  { name: "Beverages", icon: "SoftDrink", color: "from-red-400 to-red-600", href: "/groceries/beverages" },
]

export default function CategoriesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Explore our wide range of products</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500">200+ Items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}