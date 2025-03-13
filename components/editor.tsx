"use client";

import { useEffect } from "react";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/shadcn/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  // ✅ Correct upload function
  const uploadFile = async (file: File): Promise<string> => {
    try {
      const response = await edgestore.publicFiles.upload({ file });
      return response.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return ""; // Ensure it always returns a string to avoid crashes
    }
  };

  // ✅ Use `uploadFile` instead of `upload`
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile, // ✅ Correct usage
  });

  useEffect(() => {
    if (editor) {
      const handleChange = () => {
        onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
      };

      editor.onChange(handleChange);

      return () => {
        editor.off("create", handleChange);
      };
    }
  }, [editor, onChange]);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() =>
          onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        }
        style={{
          backgroundColor: `var(--popover)`, 
          color: `var(--foreground)`,
        }}
      />
      {!editable && <div className="fixed inset-0  " />}
    </div>
  );
};
export default Editor;
