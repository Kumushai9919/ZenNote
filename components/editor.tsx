"use client";

import { useEffect } from "react";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

  const Editor = ({
  onChange,
  initialContent,
  editable = true,
}: EditorProps) => {
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
        editor.off("change", handleChange);
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
      />
      {!editable && (
        <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
      )}
    </div>
  ); 
};

export default Editor;


// "use client";

// import { useEffect } from "react";
// import { PartialBlock } from "@blocknote/core";
// import { BlockNoteView } from "@blocknote/mantine";
// import { useCreateBlockNote } from "@blocknote/react";
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/mantine/style.css";
// import { useTheme } from "next-themes";
// import { useEdgeStore } from "@/lib/edgestore";

// interface EditorProps {
//   onChange: (value: string) => void;
//   initialContent?: string;
//   editable?: boolean;
// }

// export const Editor = ({
//   onChange,
//   initialContent,
//   editable = true,
// }: EditorProps) => {
//   const { resolvedTheme } = useTheme();
//   const { edgestore } = useEdgeStore();

//   const handleUpload = async (file: File) => {
//     const response = await edgestore.publicFiles.upload({
//       file,
//     });
//     return response.url;
//   };

//   const editor = useCreateBlockNote({
//     initialContent: initialContent
//       ? (JSON.parse(initialContent) as PartialBlock[])
//       : undefined,
//     upload: handleUpload,
//   });

//   useEffect(() => {
//     if (editor) {
//       const handleChange = () => {
//         onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
//       };

//       editor.onChange(handleChange);

//       return () => {
//         editor.off("change", handleChange);
//       };
//     }
//   }, [editor, onChange]);

//   return (
//     <div>
//       <BlockNoteView
//         editor={editor}
//         theme={resolvedTheme === "dark" ? "dark" : "light"}
//         onChange={() =>
//           onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
//         }
//       />
//       {!editable && (
//         <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
//       )}
//     </div>
//   );
// };
