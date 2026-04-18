export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: "link" | "note" | "command";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSnippetData {
  title: string;
  content: string;
  tags: string[];
  type: "link" | "note" | "command";
}

export interface UpdateSnippetData {
  title?: string;
  content?: string;
  tags?: string[];
  type?: "link" | "note" | "command";
}
