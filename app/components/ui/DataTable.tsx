import { useMemo, useState } from "react";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

type Column = {
  key: string;
  label: string;
};

type Props<T> = {
  data: T[];
  columns: Column[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  onEdit,
  onDelete,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const processedData = useMemo(() => {
    let filtered = data;

    // 🔍 SEARCH
    if (search.trim()) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.key])
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }

    // ↕️ SORT
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortKey, sortOrder, columns]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  return (
    <div className="w-full">
      {/* Card */}
      <div className="overflow-hidden">

        {/* Search */}
        <div className="mb-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-black/10 rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border border-black/10">
            <thead className="bg-pink-600 text-white uppercase tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-4 py-2 font-medium cursor-pointer select-none hover:bg-opacity-90"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown size={12} className="opacity-60" />
                    </div>
                  </th>
                ))}

                <th className="px-4 py-2 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-6 text-gray-400 text-xs"
                  >
                    Loading...
                  </td>
                </tr>
              ) : processedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-6 text-gray-400 text-xs"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                processedData.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-2 text-gray-700 whitespace-nowrap"
                      >
                        {row[col.key]}
                      </td>
                    ))}

                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1.5">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 rounded-md text-blue-600 bg-blue-50
                                   hover:bg-blue-100 transition"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 rounded-md text-red-600 bg-red-50
                                   hover:bg-red-100 transition"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}