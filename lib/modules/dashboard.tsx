import { supabase } from "@/lib/supabaseClient";

/* =========================
   DASHBOARD STATS
========================= */
export async function getDashboardStats() {
  const [books, members, borrowed] = await Promise.all([
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("members").select("*", { count: "exact", head: true }),
    supabase.from("borrowed_books").select("borrow_date, return_date"),
  ]);

  const rows = borrowed.data || [];

  const totalBorrowed = rows.length;
  const currentlyBorrowed = rows.filter((b) => !b.return_date).length;
  const totalReturned = rows.filter((b) => b.return_date).length;
  const today = new Date();

  const overdue = rows.filter((b) => {
    return !b.return_date && new Date(b.borrow_date) < today;
  }).length;

  return {
    totalBooks: books.count || 0,
    totalMembers: members.count || 0,
    totalBorrowed,
    currentlyBorrowed,
    totalReturned,
    overdue
  };
}

/* =========================
   BORROW ACTIVITY CHART
========================= */
export async function getBorrowChartData() {
  const { data } = await supabase
    .from("borrowed_books")
    .select("borrowed_at, returned_at")
    .order("borrowed_at", { ascending: true });

  const map: Record<string, any> = {};

  (data || []).forEach((r) => {
    const date = new Date(r.borrowed_at).toLocaleDateString();

    if (!map[date]) {
      map[date] = { date, borrowed: 0, returned: 0 };
    }

    map[date].borrowed += 1;

    if (r.returned_at) {
      const returnDate = new Date(r.returned_at).toLocaleDateString();

      if (!map[returnDate]) {
        map[returnDate] = { date: returnDate, borrowed: 0, returned: 0 };
      }

      map[returnDate].returned += 1;
    }
  });

  return Object.values(map);
}

/* =========================
   CATEGORY DISTRIBUTION
========================= */
export async function getCategoryDistribution() {
  const { data } = await supabase
    .from("books")
    .select("category_id, categories(name)")
    .limit(100);

  const map: Record<string, number> = {};

  (data || []).forEach((b: any) => {
    const name = b.categories?.name || "Unknown";
    map[name] = (map[name] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

/* =========================
   TOP BOOKS
========================= */
export async function getTopBooks() {
  const { data } = await supabase
    .from("borrowed_books")
    .select("book_id, books(title)");

  const map: Record<string, number> = {};

  (data || []).forEach((b: any) => {
    const title = b.books?.title || "Unknown";
    map[title] = (map[title] || 0) + 1;
  });

  return Object.entries(map)
    .map(([title, count]) => ({ title, quantity: count }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
}

/* =========================
   MEMBERS DISTRIBUTION
========================= */
export async function getMemberActivity() {
  const { data } = await supabase
    .from("borrowed_books")
    .select("member_id, members(full_name)");

  const map: Record<string, number> = {};

  (data || []).forEach((r: any) => {
    const name = r.members?.full_name || "Unknown";
    map[name] = (map[name] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    member_name: name,
    count: value,
  }));
}

export async function getBorrowTrend() {
  const { data } = await supabase
    .from("borrowed_books")
    .select("borrow_date, return_date")
    .order("borrow_date", { ascending: true });

  const map: Record<string, any> = {};

  (data || []).forEach((row) => {
    const date = new Date(row.borrow_date).toLocaleDateString();

    if (!map[date]) {
      map[date] = { date, borrowed: 0, returned: 0 };
    }

    map[date].borrowed += 1;

    if (row.return_date) {
      const rDate = new Date(row.return_date).toLocaleDateString();

      if (!map[rDate]) {
        map[rDate] = { date: rDate, borrowed: 0, returned: 0 };
      }

      map[rDate].returned += 1;
    }
  });

  return Object.values(map);
}

export async function getGenreDistribution() {
  const { data } = await supabase
    .from("books")
    .select("genre");

  const map: Record<string, number> = {};

  (data || []).forEach((b: any) => {
    const genre = b.genre || "Unknown";
    map[genre] = (map[genre] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}