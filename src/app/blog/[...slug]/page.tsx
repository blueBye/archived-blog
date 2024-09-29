/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";
import { CodeBlock } from "@/components/mdx/codeBlock";

export const runtime = "nodejs";
export const dynamic = "force-static";
import { useMDXComponents } from "@/hooks/mdxComponents";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github.css";

const contentSource = "/content/posts";

function getFilesRecursively(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path.join(directory, file.name));

  const folders = entries.filter((folder) => folder.isDirectory());

  for (const folder of folders) {
    files.push(...getFilesRecursively(path.join(directory, folder.name)));
  }

  return files;
}

export function generateStaticParams() {
  // Recursively fetch all files in the content directory
  const files = getFilesRecursively(path.join(process.cwd(), contentSource));

  // Return the files array with the slug (filename without extension)
  return files.map((file) => ({
    slug: file
      .replace(path.join(process.cwd(), contentSource), "")
      .replace(/\.mdx$/, "")
      .split(path.sep)
      .filter(Boolean), // Remove any empty segments
  }));
}


interface Params {
  params: {
    slug: string[];
  };
}

export default async function DocsPage({ params }: Params) {
  // Read the MDX file from the content source directory
  const source = fs.readFileSync(
    path.join(process.cwd(), contentSource, params.slug.join("/")) + ".mdx",
    "utf8",
  );

  // MDX accepts a list of React components
  const components = useMDXComponents({
    code: ({ children, className }: any) => {
      const language = className?.replace("language-", "") || "plaintext";
      return <CodeBlock language={language}>{children}</CodeBlock>;
    },
  });

  // We compile the MDX content with the frontmatter, components, and plugins
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeSlug],
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: true,
    },
    components,
  });

  const pageTitle = frontmatter.title as string;
  const pageAuthors = frontmatter.authors as string;
  const pageDescription = frontmatter.description as string;

  // Render the page
  return (
    <div className='w-screen h-screen bg-gray-100 text-black flex flex-col items-center'>

      <div className='max-w-3xl pt-8'>
        <h1 className='text-4xl font-bold'>
          {pageTitle}
        </h1>
        <h1>{pageAuthors}</h1>
        ---
        <p>{pageDescription}</p>
        <div>
          {content}
        </div>
      </div>
    </div>
  );
}