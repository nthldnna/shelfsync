"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";

import Link from "next/link";
import { BookOpen, Users, BookMarked, Library } from "lucide-react";

import {
  getDashboardStats,
  getBorrowTrend,
  getGenreDistribution,
  getTopBooks,
  getMemberActivity,
} from "@/lib/modules/dashboard";

const COLORS = ["#ec4899", "#f472b6", "#f9a8d4", "#fb7185", "#be185d"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [borrowTrend, setBorrowTrend] = useState<any[]>([]);
  const [genreChart, setGenreChart] = useState<any[]>([]);
  const [topBooks, setTopBooks] = useState<any[]>([]);
  const [memberActivity, setMemberActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, trend, genre, top, activity] = await Promise.all([
        getDashboardStats(),
        getBorrowTrend(),
        getGenreDistribution(),
        getTopBooks(),
        getMemberActivity(),
      ]);

      setStats(s);
      setBorrowTrend(trend);
      setGenreChart(genre);
      setTopBooks(top);
      setMemberActivity(activity);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-5 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-pink-600 mt-3">
            ShelfSync Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Track books, members, and reading activity.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-pink-500 font-bold">Books</p>
            <p className="text-2xl font-bold">
              {loading ? "—" : stats?.totalBooks || 0}
            </p>
          </div>

          <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-pink-500 font-bold">Members</p>
            <p className="text-2xl font-bold">
              {loading ? "—" : stats?.totalMembers || 0}
            </p>
          </div>

          <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-pink-500 font-bold">Borrowed</p>
            <p className="text-2xl font-bold">
              {loading ? "—" : stats?.totalBorrowed || 0}
            </p>
          </div>

          <div className="bg-rose-500 text-white border border-pink-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold">Overdue</p>
            <p className="text-2xl font-bold">
              {loading ? "—" : stats?.overdue || 0}
            </p>
          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <Link href="/books">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition">
              <BookOpen className="text-white" />
              <p className="text-sm mt-2 font-medium">Books</p>
            </div>
          </Link>

          <Link href="/borrowed">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition">
              <BookMarked className="text-white" />
              <p className="text-sm mt-2 font-medium">Borrowed</p>
            </div>
          </Link>

          <Link href="/members">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition">
              <Users className="text-white" />
              <p className="text-sm mt-2 font-medium">Members</p>
            </div>
          </Link>

          <Link href="/library">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition">
              <Library className="text-white" />
              <p className="text-sm mt-2 font-medium">Library</p>
            </div>
          </Link>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* BORROW TREND */}
          <div className="bg-white border border-pink-100 rounded-2xl p-5">
            <h2 className="text-sm font-medium mb-4">Borrow Trends</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={borrowTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="borrowed"
                  stroke="#ec4899"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="returned"
                  stroke="#f472b6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GENRE DISTRIBUTION */}
          <div className="bg-white border border-pink-100 rounded-2xl p-5">
            <h2 className="text-sm font-medium mb-4">Genre Distribution</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genreChart}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {genreChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* TOP BOOKS */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5">
          <h2 className="text-sm font-medium mb-4">Top Borrowed Books</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBooks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="title"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />

              <Bar dataKey="quantity" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}