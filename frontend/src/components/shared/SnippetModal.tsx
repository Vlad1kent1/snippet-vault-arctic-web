"use client";

import { useState, useEffect } from "react";
import { CreateSnippetData, Snippet } from "@/types/snippet";
import api from "@/lib/api";

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Snippet | null;
  mode: "create" | "edit";
}

export default function SnippetModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  mode,
}: SnippetModalProps) {
  const [formData, setFormData] = useState<CreateSnippetData>({
    title: "",
    content: "",
    tags: [],
    type: "note",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          title: initialData.title,
          content: initialData.content,
          tags: initialData.tags,
          type: initialData.type,
        });
      } else {
        setFormData({
          title: "",
          content: "",
          tags: [],
          type: "note",
        });
      }
      setError(null);
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: formData.type,
        tags:
          formData.tags.length > 0
            ? formData.tags[0]
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item)
            : [],
      };

      if (mode === "create") {
        await api.post("/snippets", payload);
      } else if (mode === "edit" && initialData) {
        await api.patch(`/snippets/${initialData._id}`, payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      const error = err as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (error.response?.status === 400) {
        setError(error.response.data?.message || "Validation error");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTagsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: value ? [value] : [],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold tracking-[0.04em] text-[#000000]">
            {mode === "create" ? "Create Snippet" : "Edit Snippet"}
          </h2>

          {error && (
            <div className="mb-4 rounded-2xl border border-[#E5E7EB] bg-white p-3 text-sm text-[#000000]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#374151]">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 h-32 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="react, javascript, api"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as "link" | "note" | "command",
                  }))
                }
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#374151] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                required
              >
                <option value="link">Link</option>
                <option value="note">Note</option>
                <option value="command">Command</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-[#000000] bg-white px-4 py-3 text-sm font-semibold text-[#000000] transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : mode === "create"
                    ? "Create"
                    : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
