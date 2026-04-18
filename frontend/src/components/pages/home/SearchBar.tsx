import TagSelector from "./TagSelector";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tagFilter: string;
  onTagChange: (value: string) => void;
  availableTags: string[];
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  tagFilter,
  onTagChange,
  availableTags,
}: SearchBarProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <label
            className="text-sm font-medium text-[#374151]"
            htmlFor="snippet-search"
          >
            Search snippets
          </label>
        </div>
        <input
          id="snippet-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search snippets..."
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
        />
      </div>
      <TagSelector
        tag={tagFilter}
        availableTags={availableTags}
        onTagChange={onTagChange}
      />
    </section>
  );
}
