import { supabase } from "@/lib/supabaseClient";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  total_copies: number;
  available_copies: number;
  shelf_location?: string;
};

/* GET ALL */
export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/* CREATE */
export async function createBook(payload: {
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  total_copies: number;
  available_copies: number;
  shelf_location?: string;
}) {
  const { data, error } = await supabase
    .from("books")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* UPDATE */
export async function updateBook(
  id: string,
  payload: Partial<Book>
) {
  const { data, error } = await supabase
    .from("books")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETE */
export async function deleteBook(id: string) {
  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}