import { supabase } from "@/lib/supabaseClient";

export type Member = {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  created_at?: string;
};

/* GET ALL */
export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/* CREATE */
export async function createMember(payload: {
  full_name: string;
  email?: string;
  phone?: string;
}) {
  const { data, error } = await supabase
    .from("members")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* UPDATE */
export async function updateMember(id: string, payload: Partial<Member>) {
  const { data, error } = await supabase
    .from("members")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETE */
export async function deleteMember(id: string) {
  const { error } = await supabase
    .from("members")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}
