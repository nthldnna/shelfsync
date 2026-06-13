import { supabase } from "@/lib/supabaseClient";

export type BorrowedBook = {
  id: string;
  book_id: string;
  member_id: string;
  borrow_date: string;
  due_date: string;
  return_date?: string | null;
  status: "Borrowed" | "Returned" | "Overdue";
  notes?: string;
  created_at?: string;
  updated_at?: string;
  books?: { title?: string } | null;
  members?: { full_name?: string } | null;
};

/* GET ALL */
export async function getBorrowedBooks(): Promise<BorrowedBook[]> {
  const { data, error } = await supabase
    .from("borrowed_books")
    .select("*, books(title), members(full_name)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/* CREATE */
export async function createBorrowedBook(payload: {
  book_id: string;
  member_id: string;
  borrow_date?: string;
  due_date: string;
  return_date?: string | null;
  status?: "Borrowed" | "Returned" | "Overdue";
  notes?: string;
}) {
  const { data, error } = await supabase
    .from("borrowed_books")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* UPDATE */
export async function updateBorrowedBook(
  id: string,
  payload: Partial<BorrowedBook>
) {
  const { data, error } = await supabase
    .from("borrowed_books")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETE */
export async function deleteBorrowedBook(id: string) {
  const { error } = await supabase
    .from("borrowed_books")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}
