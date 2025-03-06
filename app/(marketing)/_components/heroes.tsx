import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center gap-x-20">
        <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:h-[330px] md:w-[330px] mt-5">
          <Image
           src="/document.png"
            fill
            alt="Documents"
            className="object-contain dark:hidden"
          />
           <Image
            src="/document-dark.png"
            fill
            alt="Documents"
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative h-[290px] w-[290px] hidden md:block mt-5">
        <Image
            src="/reading.png"
            fill
            alt="Reading"
            className="object-contain dark:hidden"
          />
          <Image
             src="/reading-dark.png"
            fill
            alt="Reading"
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
};
