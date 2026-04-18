import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Snippet } from "./schemas/snippet.schema";
import { CreateSnippetDto } from "./dto/create-snippet.dto";
import { UpdateSnippetDto } from "./dto/update-snippet.dto";

type SnippetFilters = {
  $or?: Array<
    | { title: { $regex: string; $options: string } }
    | { content: { $regex: string; $options: string } }
  >;
  tags?: { $regex: string; $options: string };
};

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<Snippet>,
  ) {}

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const newSnippet = new this.snippetModel(createSnippetDto);
    return newSnippet.save();
  }

  async findAll(query: {
    q?: string;
    tag?: string;
    page?: string;
    limit?: string;
  }): Promise<{
    items: Snippet[];
    total: number;
    page: number;
    pages: number;
  }> {
    const { q, tag, page = "1", limit = "10" } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const filters: SnippetFilters = {};

    const searchValue = q?.trim();
    if (searchValue) {
      const escapedQuery = this.escapeRegex(searchValue);
      filters.$or = [
        { title: { $regex: escapedQuery, $options: "i" } },
        { content: { $regex: escapedQuery, $options: "i" } },
      ];
    }

    const tagValue = tag?.trim();
    if (tagValue) {
      const escapedTag = this.escapeRegex(tagValue);
      filters.tags = { $regex: escapedTag, $options: "i" };
    }

    const [items, total] = await Promise.all([
      this.snippetModel
        .find(filters as any)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .exec(),
      this.snippetModel.countDocuments(filters as any),
    ]);

    return {
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    };
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return snippet;
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
    const updated = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
