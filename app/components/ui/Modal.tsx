export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal box */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
        {title && (
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}