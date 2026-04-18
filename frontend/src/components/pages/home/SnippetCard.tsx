import Link from "next/link";
import { Snippet } from "@/types/snippet";

interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <Link href={`/snippets/${snippet._id}`} className="group">
      <article className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <h3 className="text-2xl font-semibold tracking-[0.04em] text-[#000000]">
          {snippet.title}
        </h3>
        <p className="text-[#374151] line-clamp-3 mt-4 leading-relaxed">
          {snippet.content}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#374151]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
