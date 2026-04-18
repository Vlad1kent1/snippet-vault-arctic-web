import { Snippet } from "@/types/snippet";

interface SnippetViewerProps {
  snippet: Snippet;
}

export default function SnippetViewer({ snippet }: SnippetViewerProps) {
  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-[0.04em] text-[#000000]">
            {snippet.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#374151]">
            <span className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-1 capitalize text-[#374151]">
              {snippet.type}
            </span>
            {snippet.createdAt && (
              <span>
                Created: {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
            )}
            {snippet.updatedAt && snippet.updatedAt !== snippet.createdAt && (
              <span>
                Updated: {new Date(snippet.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-[#000000]">Content</h2>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 whitespace-pre-wrap text-[#374151]">
          {snippet.content}
        </div>
      </section>

      {snippet.tags.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#000000]">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#374151]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
