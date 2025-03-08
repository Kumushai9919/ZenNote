"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import * as React from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  console.log("EdgeStore contents:", edgestore); // ✅ Debugging

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-semibold">
            Cover Image
          </DialogTitle>{" "}
          {/* ✅ Correct way */}
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          onChange={onChange}
          value={file}
          disabled={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
