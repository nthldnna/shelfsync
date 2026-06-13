import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}