"use client"

import { useState } from "react";

interface CodeBlockProps {
  children: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="relative my-4">
      <button
        className="absolute right-2 top-2 bg-gray-800 text-white text-sm px-2 py-1 rounded"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className={`language-${language} p-4 rounded-md border-solid`}>
        <code>{children}</code>
      </pre>
    </div>
  );
};