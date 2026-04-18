import { Snippet } from "@/types/snippet";
import SnippetCard from "./SnippetCard";
import StatusCard from "@/components/shared/StatusCard";

interface SnippetListProps {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
}

export default function SnippetList({
  snippets,
  loading,
  error,
}: SnippetListProps) {
  if (loading) {
    return (
      <StatusCard
        title="Loading snippets..."
        description="Fetching the latest entries now."
      />
    );
  }

  if (error) {
    return <StatusCard title="Unable to load snippets" description={error} />;
  }

  if (snippets.length === 0) {
    return (
      <StatusCard
        title="No snippets found"
        description="Try a different search term or clear the tag filter."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} />
      ))}
    </div>
  );
}
