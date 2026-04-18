"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import api from "@/lib/api";
import SnippetModal from "@/components/shared/SnippetModal";
import SearchBar from "@/components/pages/home/SearchBar";
import SnippetList from "@/components/pages/home/SnippetList";
import { Snippet } from "@/types/snippet";

export default function HomePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSnippets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/snippets", {
        params: { q: debouncedQuery, tag: tagFilter },
      });
      setSnippets(data.items);
    } catch (err) {
      console.error("Error fetching snippets", err);
      setError("Unable to load snippets.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, tagFilter]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    snippets.forEach((snippet) =>
      snippet.tags.forEach((tag) => tagSet.add(tag)),
    );
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [snippets]);

  return (
    <main className="min-h-screen bg-white text-[#374151] container mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-[0.08em] text-[#000000]">
          Snippet Vault
        </h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-2xl border border-[#000000] bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          Create Snippet
        </button>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tagFilter={tagFilter}
        onTagChange={setTagFilter}
        availableTags={availableTags}
      />

      <div className="mt-10">
        <SnippetList snippets={snippets} loading={loading} error={error} />
      </div>

      <SnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchSnippets}
        mode="create"
      />
    </main>
  );
}
