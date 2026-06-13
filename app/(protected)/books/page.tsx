"use client";

import { useEffect, useState } from "react";

import DataTable from "@/app/components/ui/DataTable";
import CreateModal from "@/app/components/ui/CreateModal";
import UpdateModal from "@/app/components/ui/UpdateModal";
import DeleteModal from "@/app/components/ui/DeleteModal";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  Book,
} from "@/lib/modules/books";

export default function BooksPage() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Book | null>(null);

  /* =========================
     FETCH DATA
  ========================= */
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getBooks();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
     CREATE
  ========================= */
  const handleCreate = async (form: any) => {
    await createBook({
      ...form,
      total_copies: Number(form.total_copies),
      available_copies: Number(form.available_copies),
    });

    setIsCreateOpen(false);
    fetchData();
  };

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async (form: any) => {
    if (!selected) return;

    await updateBook(selected.id, {
      ...form,
      total_copies: Number(form.total_copies),
      available_copies: Number(form.available_copies),
    });

    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    if (!selected) return;

    await deleteBook(selected.id);

    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Books
        </h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
        >
          + Add Book
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        data={data}
        loading={loading}
        columns={[
          {
            key: "title",
            label: "Title",
          },
          {
            key: "author",
            label: "Author",
          },
          {
            key: "genre",
            label: "Genre",
          },
          {
            key: "isbn",
            label: "ISBN",
          },
          {
            key: "available_copies",
            label: "Available",
          },
          {
            key: "total_copies",
            label: "Total",
          },
          {
            key: "shelf_location",
            label: "Shelf",
          },
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

      {/* =========================
         CREATE MODAL
      ========================= */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Book"
        fields={[
          {
            name: "title",
            label: "Book Title",
            type: "text",
          },
          {
            name: "author",
            label: "Author",
            type: "text",
          },
          {
            name: "genre",
            label: "Genre",
            type: "text",
          },
          {
            name: "isbn",
            label: "ISBN",
            type: "text",
          },
          {
            name: "total_copies",
            label: "Total Copies",
            type: "number",
          },
          {
            name: "available_copies",
            label: "Available Copies",
            type: "number",
          },
          {
            name: "shelf_location",
            label: "Shelf Location",
            type: "text",
          },
        ]}
        onSubmit={handleCreate}
      />

      {/* =========================
         UPDATE MODAL
      ========================= */}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Book"
        initialData={selected || {}}
        fields={[
          {
            name: "title",
            label: "Book Title",
            type: "text",
          },
          {
            name: "author",
            label: "Author",
            type: "text",
          },
          {
            name: "genre",
            label: "Genre",
            type: "text",
          },
          {
            name: "isbn",
            label: "ISBN",
            type: "text",
          },
          {
            name: "total_copies",
            label: "Total Copies",
            type: "number",
          },
          {
            name: "available_copies",
            label: "Available Copies",
            type: "number",
          },
          {
            name: "shelf_location",
            label: "Shelf Location",
            type: "text",
          },
        ]}
        onSubmit={handleUpdate}
      />

      {/* =========================
         DELETE MODAL
      ========================= */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Book"
        description={`Are you sure you want to delete "${
          selected?.title || ""
        }"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}