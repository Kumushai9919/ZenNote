"use client";

import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation"; // ✅ Import useParams
import { api } from "@/convex/_generated/api";
import { Toolbar } from "@/components/toolbar";

const DocumentIdPage = () => {
  const params = useParams(); // ✅ Get params dynamically
  const documentId = params?.documentId as Id<"documents">; // ✅ Extract documentId safely

  const document = useQuery(api.documents.getById, {
    documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
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
