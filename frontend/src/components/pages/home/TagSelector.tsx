interface TagSelectorProps {
  tag: string;
  availableTags: string[];
  onTagChange: (value: string) => void;
}

export default function TagSelector({
  tag,
  availableTags,
  onTagChange,
}: TagSelectorProps) {
  const normalizedSearch = tag.trim().toLowerCase();
  const filteredTags = availableTags
    .filter((item) => item.toLowerCase().includes(normalizedSearch))
    .slice(0, 8);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label
          className="text-sm font-medium text-[#374151]"
          htmlFor="tag-filter"
        >
          Filter by tag
        </label>
        {tag && (
          <button
            type="button"
            onClick={() => onTagChange("")}
            className="rounded-2xl border border-[#000000] bg-white px-3 py-2 text-xs font-semibold text-[#000000] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            Clear
          </button>
        )}
      </div>

      <input
        id="tag-filter"
        type="text"
        value={tag}
        onChange={(e) => onTagChange(e.target.value)}
        placeholder="Type tag name..."
        className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
      />

      {filteredTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filteredTags
            .reverse()
            .slice(0, 5)
            .map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => onTagChange(suggestion)}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
