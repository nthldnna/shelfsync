"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Package,
  TrendingUp,
  Shield,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import logo from "@/app/icon.png";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "features", label: "FEATURES" },
  { id: "why-us", label: "WHY US" },
  { id: "contact", label: "CONTACT" },
];

export default function Home() {
  const [isLoggedIn] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      let current = "home";

      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          current = id;
        }
      }

      setActive(current);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="relative min-h-screen font-[var(--font-outfit)]"
      style={{
        background: `
          radial-gradient(circle at top, rgba(236,72,153,0.12), transparent 45%),
          radial-gradient(circle at bottom, rgba(244,114,182,0.12), transparent 45%),
          #fff1f6
        `,
      }}
    >
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-md border-b border-pink-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src={logo} alt="ShelfSync" width={32} height={32} />
            <h1 className="font-bold text-xl text-pink-600">ShelfSync</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <div className="flex items-center rounded-full px-1 py-1 bg-pink-100/60">
              {navItems.map(({ id, label }) => {
                const isActive = active === id;

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setActive(id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-pink-500/70 hover:text-pink-600"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#ec4899" : "transparent",
                      boxShadow: isActive
                        ? "0 8px 20px rgba(236,72,153,0.25)"
                        : "none",
                    }}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="hidden md:flex px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 transition shadow-md"
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </a>

            <MobileMenu active={active} setActive={setActive} />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
            <Zap size={14} className="text-pink-500" />
            <span className="text-xs font-medium text-pink-600">
              Smart Library Tracker
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-pink-600 leading-tight">
            Your Personal Library
            <span className="block bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              Made Beautiful
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-pink-900/60 max-w-2xl mx-auto">
            Track books, manage borrowing, and organize your library in a
            simple, elegant system designed for students and readers.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/signup"
              className="px-8 py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg hover:shadow-2xl transition hover:-translate-y-0.5"
            >
              Get Started <ArrowRight size={18} />
            </a>

            <a
              href="#features"
              className="px-8 py-3.5 rounded-xl font-semibold border-2 border-pink-200 bg-white/60 backdrop-blur hover:bg-white transition text-pink-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-16">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Book Tracking",
                desc: "Track borrowed and available books in real-time.",
              },
              {
                icon: TrendingUp,
                title: "Insights",
                desc: "See your reading habits and library growth.",
              },
              {
                icon: Shield,
                title: "Secure System",
                desc: "Safe and reliable data management.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/70 border border-pink-100 hover:shadow-xl transition hover:-translate-y-1"
              >
                <f.icon className="text-pink-500 mb-4" size={28} />
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  {f.title}
                </h3>
                <p className="text-pink-900/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-28 bg-pink-50/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-pink-600 mb-8">
              Why ShelfSync?
            </h2>

            <div className="space-y-5">
              {[
                "Simple and intuitive interface",
                "Perfect for students and book lovers",
                "Fast and lightweight system",
                "Modern and clean UI experience",
              ].map((t, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="text-pink-500" />
                  <p className="text-pink-900/70">{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-80 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white text-center p-8 shadow-xl">
            <div>
              <TrendingUp size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Grow Your Reading Habit</h3>
              <p className="text-white/80 text-sm">
                Organize your library effortlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 text-center">
        <h2 className="text-4xl font-bold text-pink-600 mb-6">
          Ready to Start?
        </h2>

        <p className="text-pink-900/60 max-w-xl mx-auto mb-10">
          Join ShelfSync and start managing your library smarter today.
        </p>

        <a
          href="/signup"
          className="px-8 py-4 rounded-xl text-white font-semibold bg-pink-500 hover:bg-pink-600 transition shadow-lg"
        >
          Get Started Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-pink-100 bg-white/60 text-center text-pink-900/60 text-sm">
        © 2026 ShelfSync. All rights reserved.
      </footer>
    </main>
  );
}

/* MOBILE MENU */
function MobileMenu({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg bg-pink-100"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-3 w-56 bg-white border border-pink-100 rounded-2xl shadow-xl p-3">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => {
                  setActive(id);
                  setOpen(false);
                }}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  active === id
                    ? "bg-pink-500 text-white"
                    : "text-pink-600 hover:bg-pink-50"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}