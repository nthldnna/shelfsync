"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-gray-900 relative">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[520px] h-[520px] bg-pink-100/50 blur-3xl rounded-full top-[-160px] left-[-160px]" />
        <div className="absolute w-[520px] h-[520px] bg-rose-100/40 blur-3xl rounded-full bottom-[-180px] right-[-180px]" />
      </div>

      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-5 sm:px-8 py-4 border-b border-gray-100 bg-white/70 backdrop-blur-md z-10">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
            <Image src={logo} alt="ShelfSync" width={18} height={18} />
          </div>

          <span className="text-sm font-medium tracking-tight">
            ShelfSync
          </span>
        </div>

        {/* Nav (hidden on mobile) */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
          <Link href="#" className="hover:text-gray-900 transition">Docs</Link>
          <Link href="#" className="hover:text-gray-900 transition">About</Link>
        </nav>

        {/* CTA */}
        <Link
          href="/signup"
          className="text-sm px-3 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          Sign up
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-6 py-10">

        <div className="w-full max-w-sm">

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm rounded-2xl px-6 sm:px-8 py-8 sm:py-10">

            {/* Heading */}
            <div className="mb-7 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Continue tracking your reading journey 📚
              </p>
            </div>

            {/* Form */}
            <form onSubmit={login} className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <input
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-gray-100
                  focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300
                  transition text-sm placeholder:text-gray-300"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between">
                  <label className="text-xs text-gray-500">Password</label>
                  <Link
                    href="#"
                    className="text-xs text-gray-400 hover:text-pink-500 transition"
                  >
                    Forgot?
                  </Link>
                </div>

                <input
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-gray-100
                  focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300
                  transition text-sm placeholder:text-gray-300"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl text-sm font-medium text-white
                bg-pink-500 hover:bg-pink-600 active:scale-[0.99] transition shadow-sm"
              >
                {loading ? "Signing in..." : "Continue"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="px-3 text-[11px] text-gray-400 uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Signup */}
            <p className="text-sm text-center text-gray-500">
              New to ShelfSync?{" "}
              <Link
                href="/signup"
                className="text-pink-500 font-medium hover:underline"
              >
                Create account
              </Link>
            </p>

            <p className="text-[11px] text-center text-gray-400 mt-4">
              Minimal reading tracker for focused minds
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}