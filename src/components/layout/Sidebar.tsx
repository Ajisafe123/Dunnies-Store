"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Tags,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/manage-products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/manage-orders",
    icon: ClipboardList,
  },
  {
    label: "Categories",
    href: "/manage-categories",
    icon: Tags,
  },
  {
    label: "Users",
    href: "/manage-users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/admin-settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-72 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white flex flex-col border-r border-purple-950">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-2">
          Dunnis Admin
        </p>
        <h1 className="text-2xl font-bold">Control Center</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 border-t border-white/10 text-xs text-gray-400">
        © {new Date().getFullYear()} Dunnis Stores
      </div>
    </aside>
  );
}
