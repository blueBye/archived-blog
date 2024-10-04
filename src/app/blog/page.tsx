/* eslint-disable */
import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";


const contentSource = "/content/posts";

// Function to get all files recursively from a directory
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

function getRelativeFilePath(filePath: string, contentSource: string): string {
  return filePath
    .replace(path.join(process.cwd(), contentSource), "") // Remove contentSource directory from path
    .replace(/\.mdx$/, "") // Remove .mdx extension
    .split(path.sep) // Split into segments
    .filter(Boolean) // Remove empty segments
    .join("/"); // Join the segments back into a URL-friendly slug
}

// Function to extract frontmatter from an MDX file
async function extractFrontmatter(filePath: string) {
  const source = fs.readFileSync(filePath, "utf8");

  const { frontmatter } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeSlug],
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: true,
    },
    // Empty components list as we're only concerned with the frontmatter
    components: {},
  });

  return {
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    previewImage: frontmatter.previewImage as string,
    filePath,
  };
}

export default async function DocsListPage() {
  // Get all MDX files from the content source
  const files = getFilesRecursively(path.join(process.cwd(), contentSource));

  // Extract frontmatter for each file
  const fileDataPromises = files.map(async (file) => {
    return await extractFrontmatter(file);
  });

  const fileData = await Promise.all(fileDataPromises);

  // Render the list of titles and descriptions
  return (
    <div className='w-full flex flex-col items-center py-16'>
      <div className='max-w-3xl flex flex-col gap-8'>
        <h1 className='text-4xl font-bold'>Posts</h1>

        <BentoGrid className="max-w-4xl mx-auto">
          {fileData.map((file, i) => (
            <BentoGridItem
              key={file.filePath}
              title={<Link href={`/blog/${getRelativeFilePath(file.filePath, contentSource)}`}>{file.title}</Link>}
              description={file.description}
              header={<Image width={200} height={200} src={file.previewImage} alt={"header"} />}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

