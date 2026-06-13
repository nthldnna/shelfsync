"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setLoading(true);

    if (!email || !password || !confirmPassword || !name) {
      setPasswordError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setPasswordError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
      });
    }

    alert("Check your email for confirmation!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex lg:flex-row flex-col bg-[#fcfcfd] text-gray-900 relative overflow-hidden pt-16">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-5 sm:px-8 py-4 border-b border-gray-100 bg-white/70 backdrop-blur-md z-20">

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
          href="/login"
          className="text-sm px-3 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          Login
        </Link>
      </header>

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[520px] h-[520px] bg-pink-100/50 blur-3xl rounded-full top-[-160px] left-[-160px]" />
        <div className="absolute w-[520px] h-[520px] bg-rose-100/40 blur-3xl rounded-full bottom-[-180px] right-[-180px]" />
      </div>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative">

        <div className="text-center max-w-md px-10">

          <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
            <Image src={logo} alt="ShelfSync" width={22} height={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Build your reading space
          </h1>

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Track books, organize your shelf, and keep your reading journey simple and focused.
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <div>• Minimal personal bookshelf</div>
            <div>• Clean reading tracker</div>
            <div>• Fast distraction-free UI</div>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <div className="w-full max-w-sm">

          {/* CARD (LOGIN-STYLE FIXED CENTERING) */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm rounded-2xl px-8 py-10">

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create account
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Start building your personal bookshelf 📚
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={signup} className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-xs text-gray-500">Full name</label>
                <input
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-gray-100
                  focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300
                  transition text-sm placeholder:text-gray-300"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <label className="text-xs text-gray-500">Password</label>
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
                <p className="text-[11px] text-gray-400 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs text-gray-500">Confirm password</label>
                <input
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-gray-100
                  focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300
                  transition text-sm placeholder:text-gray-300"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error */}
              {passwordError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm text-red-600">{passwordError}</p>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium text-white
                bg-pink-500 hover:bg-pink-600 active:scale-[0.99] transition shadow-sm"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Login link */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-500 font-medium hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}