"use client";

import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";
import type { OutputData } from "@editorjs/editorjs";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: unknown; // Change from OutputData to unknown
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const normalizeContent = (content: unknown): OutputData => {
  if (!content) return { blocks: [] };

  // If already in correct format
  if (typeof content === "object" && content !== null && "blocks" in content) {
    return content as OutputData;
  }

  // If it's a JSON string
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === "object" && "blocks" in parsed) {
        return parsed as OutputData;
      }
    } catch {
      // Fall through to empty return
    }
  }

  return { blocks: [] };
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  const normalizedContent = normalizeContent(content);

  if (!normalizedContent.blocks.length) {
    return <div className="text-gray-500">No content available</div>;
  }

  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={normalizedContent}
    />
  );
};

export default EditorOutput;
