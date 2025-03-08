"use client";

import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation"; // ✅ Import useParams
import { api } from "@/convex/_generated/api";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton"; 
import dynamic from "next/dynamic";
import { useMemo } from "react";


const DocumentIdPage = () => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {ssr: false}),  []);  

  const params = useParams(); 
  const documentId = params?.documentId as Id<"documents">;  

  const update = useMutation(api.documents.update);
  const onChange = (content: string) => {
    update({ id: documentId, content });
  };

  const document = useQuery(api.documents.getById, {
    documentId,
  });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;

// "use client";

// import { useQuery } from "convex/react";
// import { Id } from "@/convex/_generated/dataModel";
// import { useParams } from "next/navigation";
// import { api } from "@/convex/_generated/api";
// import { Toolbar } from "@/components/toolbar";

// interface DocumentIdPageProps {
//   params: {
//     documentId: Id<"documents">;
//   };
// }

// const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
//   const document = useQuery(api.documents.getById, {
//     documentId: params.documentId,
//   });

//   if (document === undefined) {
//     return <div>Loading...</div>;
//   }

//   if(document === null) {
//     return <div>Document not found</div>
//     }

//   return (
//   <div className="pb-40">
//     <div className="h-[35vh]" />
//     <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
//         <Toolbar initialData={document}/>
//     </div>

//     </div>);
// };

// export default DocumentIdPage;
