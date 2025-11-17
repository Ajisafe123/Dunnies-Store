import { Truck, Shield, Award, Clock } from 'lucide-react'

export default function FeaturesBar() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Delivery", desc: "Orders over ₦50,000", color: "purple" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected", color: "green" },
            { icon: Award, title: "Best Quality", desc: "Premium products", color: "blue" },
            { icon: Clock, title: "24/7 Support", desc: "Always here to help", color: "orange" },
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center shrink-0`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}