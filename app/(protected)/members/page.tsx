"use client";

import { useEffect, useState } from "react";

import DataTable from "@/app/components/ui/DataTable";
import CreateModal from "@/app/components/ui/CreateModal";
import UpdateModal from "@/app/components/ui/UpdateModal";
import DeleteModal from "@/app/components/ui/DeleteModal";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  Member,
} from "@/lib/modules/members";

export default function MembersPage() {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Member | null>(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getMembers();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (form: any) => {
    await createMember(form);

    setIsCreateOpen(false);
    fetchData();
  };

  const handleUpdate = async (form: any) => {
    if (!selected) return;

    await updateMember(selected.id, form);

    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected) return;

    await deleteMember(selected.id);

    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Members</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
        >
          + Add Member
        </button>
      </div>

      <DataTable
        data={data}
        loading={loading}
        columns={[
          { key: "full_name", label: "Full Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
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
        title="Add Member"
        fields={[
          { name: "full_name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "text" },
        ]}
        onSubmit={handleCreate}
      />

      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Member"
        initialData={selected || {}}
        fields={[
          { name: "full_name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "text" },
        ]}
        onSubmit={handleUpdate}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Member"
        description={`Are you sure you want to delete "${selected?.full_name || ""}"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
