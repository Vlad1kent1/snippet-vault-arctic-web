interface DetailToolbarProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}

export default function DetailToolbar({
  onBack,
  onEdit,
  onDelete,
  deleting,
}: DetailToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-2xl border border-[#000000] bg-white px-4 py-3 text-sm font-semibold text-[#000000] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
      >
        ← Back to home
      </button>
      <div className="ml-auto flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="rounded-2xl border border-[#000000] bg-white px-5 py-3 text-sm font-semibold text-[#000000] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
