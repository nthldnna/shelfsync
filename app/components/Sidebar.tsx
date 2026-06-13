"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import Image from "next/image";
import logo from "@/app/icon.png";
import { createClient } from "@/utils/supabase/client";

export default function Sidebar({ userName }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/books", label: "Books", icon: Library },
    { href: "/borrowed-books", label: "Borrowed", icon: BookOpen },
    { href: "/members", label: "Members", icon: Users },
  ];

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
    setLoading(false);
  };

  const NavItem = ({ item }: any) => {
    const Icon = item.icon;
    const active = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        className={`
          group flex items-center gap-3 px-3 py-2 rounded-xl
          transition-all duration-200 relative
          hover:bg-white/60 hover:shadow-sm
          ${active ? "bg-white shadow-sm text-pink-600 font-medium" : "text-gray-600"}
        `}
      >
        {/* Active indicator */}
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full transition-all
          ${active ? "bg-pink-500" : "bg-transparent group-hover:bg-pink-300"}`}
        />

        <Icon
          size={18}
          className={`${active ? "text-pink-500" : "text-gray-500 group-hover:text-pink-400"}`}
        />

        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-400 to-pink-500 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={28} height={28} />
          <span className="font-semibold text-white">ShelfSync</span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed top-14 left-3 right-3 z-40 bg-white/90 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-xl p-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="mt-3 w-full bg-pink-500 text-white font-medium py-2 rounded-xl shadow-sm hover:bg-pink-600 transition"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col justify-between p-5 bg-white border-r border-pink-100">
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">
            <Image src={logo} alt="logo" width={40} height={40} />
            <div>
              <h2 className="font-bold text-xl text-pink-600">ShelfSync</h2>
              <p className="text-xs text-gray-500">
                Personal Library Tracker
              </p>
            </div>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* USER CARD */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-2xl p-4 text-white shadow-md">
          <p className="text-xs opacity-80">Logged in as</p>
          <p className="font-medium text-sm truncate mb-3">
            {userName ?? "Guest"}
          </p>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-white text-pink-600 hover:bg-pink-600 hover:text-white border border-transparent hover:border-white/30 py-2 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}