"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import SnippetModal from "@/components/shared/SnippetModal";
import DetailToolbar from "@/components/pages/snippetsID/DetailToolbar";
import SnippetViewer from "@/components/pages/snippetsID/SnippetViewer";
import StatusCard from "@/components/shared/StatusCard";
import { Snippet } from "@/types/snippet";

export default function SnippetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const id = params.id as string;

  const fetchSnippet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/snippets/${id}`);
      setSnippet(data);
    } catch (err) {
      const error = err as { response?: { status?: number } };
      if (error.response?.status === 404) {
        setError("Snippet not found.");
      } else {
        setError("Failed to load snippet.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchSnippet();
    }
  }, [id, fetchSnippet]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this snippet?")) return;

    try {
      setIsDeleting(true);
      await api.delete(`/snippets/${id}`);
      router.push("/");
    } catch {
      setError("Failed to delete snippet.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleEditSuccess = () => {
    fetchSnippet();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#374151] container mx-auto px-6 py-8">
        <StatusCard
          title="Loading snippet..."
          description="Fetching snippet details now."
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white text-[#374151] container mx-auto px-6 py-8">
        <StatusCard
          title="Unable to load snippet"
          description={error}
          actionLabel="Back to home"
          onAction={handleBack}
        />
      </main>
    );
  }

  if (!snippet) return null;

  return (
    <main className="min-h-screen bg-white text-[#374151] container mx-auto px-6 py-8 max-w-4xl">
      <DetailToolbar
        onBack={handleBack}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={handleDelete}
        deleting={isDeleting}
      />
      <SnippetViewer snippet={snippet} />
      <SnippetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        initialData={snippet}
        mode="edit"
      />
    </main>
  );
}
