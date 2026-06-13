"use client";

import { useEffect, useMemo, useState } from "react";

import DataTable from "@/app/components/ui/DataTable";
import CreateModal from "@/app/components/ui/CreateModal";
import UpdateModal from "@/app/components/ui/UpdateModal";
import DeleteModal from "@/app/components/ui/DeleteModal";

import {
  getBorrowedBooks,
  createBorrowedBook,
  updateBorrowedBook,
  deleteBorrowedBook,
  BorrowedBook,
} from "@/lib/modules/borrowed-books";

import { getBooks, Book } from "@/lib/modules/books";
import { getMembers, Member } from "@/lib/modules/members";

export default function BorrowedBooksPage() {
  const [data, setData] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);

  const [bookOptions, setBookOptions] = useState<Book[]>([]);
  const [memberOptions, setMemberOptions] = useState<Member[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<BorrowedBook | null>(null);

  const fetchLookups = async () => {
    try {
      const [books, members] = await Promise.all([getBooks(), getMembers()]);
      setBookOptions(books);
      setMemberOptions(members);
    } catch (err) {
      console.error("Failed to load lookups:", err);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getBorrowedBooks();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLookups();
  }, []);

  const displayData = useMemo(() => {
    const bookMap = Object.fromEntries(bookOptions.map((b) => [b.id, b.title]));
    const memberMap = Object.fromEntries(
      memberOptions.map((m) => [m.id, m.full_name])
    );

    return data.map((item) => ({
      ...item,
      book_id: bookMap[item.book_id] || "—",
      member_id: memberMap[item.member_id] || "—",
    }));
  }, [data, bookOptions, memberOptions]);

  const handleCreate = async (form: any) => {
    await createBorrowedBook(form);

    setIsCreateOpen(false);
    fetchData();
  };

  const handleUpdate = async (form: any) => {
    if (!selected) return;

    await updateBorrowedBook(selected.id, form);

    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected) return;

    await deleteBorrowedBook(selected.id);

    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Borrowed Books</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
        >
          + Add Borrowed Book
        </button>
      </div>

      <DataTable
        data={displayData}
        loading={loading}
        columns={[
          { key: "book_id", label: "Book" },
          { key: "member_id", label: "Borrower" },
          { key: "borrow_date", label: "Borrow Date" },
          { key: "due_date", label: "Due Date" },
          { key: "return_date", label: "Return Date" },
          { key: "status", label: "Status" },
          { key: "notes", label: "Notes" },
        ]}
        onEdit={(row) => {
          setSelected(row);
          setIsUpdateOpen(true);
        }}
        onDelete={(row) => {
          setSelected(row);
          setIsDeleteOpen(true);
        }}
      />

      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Borrowed Book"
        fields={[
          {
            name: "book_id",
            label: "Book",
            type: "select",
            options: bookOptions.map((item) => ({ label: item.title, value: item.id })),
          },
          {
            name: "member_id",
            label: "Borrower",
            type: "select",
            options: memberOptions.map((item) => ({
              label: item.full_name,
              value: item.id,
            })),
          },
          { name: "borrow_date", label: "Borrow Date", type: "date" },
          { name: "due_date", label: "Due Date", type: "date" },
          { name: "return_date", label: "Return Date", type: "date" },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Borrowed", value: "Borrowed" },
              { label: "Returned", value: "Returned" },
              { label: "Overdue", value: "Overdue" },
            ],
          },
          { name: "notes", label: "Notes", type: "text" },
        ]}
        onSubmit={handleCreate}
      />

      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Borrowed Book"
        initialData={selected || {}}
        fields={[
          {
            name: "book_id",
            label: "Book",
            type: "select",
            options: bookOptions.map((item) => ({ label: item.title, value: item.id })),
          },
          {
            name: "member_id",
            label: "Borrower",
            type: "select",
            options: memberOptions.map((item) => ({
              label: item.full_name,
              value: item.id,
            })),
          },
          { name: "borrow_date", label: "Borrow Date", type: "date" },
          { name: "due_date", label: "Due Date", type: "date" },
          { name: "return_date", label: "Return Date", type: "date" },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Borrowed", value: "Borrowed" },
              { label: "Returned", value: "Returned" },
              { label: "Overdue", value: "Overdue" },
            ],
          },
          { name: "notes", label: "Notes", type: "text" },
        ]}
        onSubmit={handleUpdate}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Borrowed Book"
        description={`Are you sure you want to delete this borrowed record?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
