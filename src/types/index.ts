import type { MarkdownLayoutProps } from "astro";

export type CommandArgsType = { [key: string]: string };

export type BlogProps = MarkdownLayoutProps<{
  title: string;
  author: string;
  pubDate: string;
  updatedOn?: string;
  description: string;
  authorSocialLink?: string;
  tags: string[];
}>;
