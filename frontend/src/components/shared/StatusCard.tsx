import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export default function StatusCard({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: StatusCardProps) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F9FA] text-2xl text-[#374151]">
        {icon ?? "ℹ️"}
      </div>
      <h2 className="text-xl font-semibold text-[#000000]">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-[#374151]">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex rounded-2xl border border-[#000000] bg-white px-4 py-3 text-sm font-semibold text-[#000000] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
