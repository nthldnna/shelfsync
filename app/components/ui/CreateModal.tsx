import { useState } from "react";
import Modal from "./Modal";

export default function CreateModal({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
}: any) {
  const [form, setForm] = useState<any>({});

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">

        {fields.map((f: any) => (
          <div key={f.name}>
            <label className="text-sm text-gray-600">
              {f.label}
            </label>

            {/* =========================
                SELECT FIELD
            ========================= */}
            {f.type === "select" ? (
              <select
                className="w-full mt-1 px-3 py-2 border border-black/10 rounded-lg   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                value={form[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              >
                <option value="">Select {f.label}</option>

                {f.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full mt-1 px-3 py-2 border border-black/10 rounded-lg   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                type={f.type || "text"}
                value={form[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </div>
        ))}

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose} className="px-4 py-2 btn-main rounded-xl font-semibold
              shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 btn-sub rounded-xl font-semibold
              shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}