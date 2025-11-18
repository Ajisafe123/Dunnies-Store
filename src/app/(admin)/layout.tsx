"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import LogoutModal from "@/components/layout/LogoutModal";
import { getCurrentUser } from "@/services/auth";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    fetchAdmin();
  }, []);

  const avatarUrl = useMemo(() => {
    if (!user) return "";
    if (user.email) {
      return `https://unavatar.io/${encodeURIComponent(user.email)}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.fullName || "Admin"
    )}&background=0f172a&color=fff`;
  }, [user]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div
        className={`fixed inset-0 z-30 bg-black/40 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white/90 backdrop-blur border-b border-purple-100 px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg border border-gray-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800 capitalize">
                Control Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white border border-purple-100 rounded-full px-3 shadow-sm">
              <Search className="w-4 h-4 text-purple-300" />
              <input
                type="search"
                placeholder="Search dashboard"
                className="bg-transparent px-2 py-1 text-sm focus:outline-none"
              />
            </div>
            <button className="relative p-2 text-purple-500 hover:text-purple-700">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 rounded-full border border-purple-100 px-2 py-1 bg-white/80"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user && avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={user.fullName}
                    width={32}
                    height={32}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs text-gray-500">Admin</span>
                <span className="text-sm font-semibold text-gray-800">
                  {user?.fullName || "Team"}
                </span>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
