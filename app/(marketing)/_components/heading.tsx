"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Where Ideas Come to Life. Welcome to
        <span className="underline"> Potion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Potion is the connected workspace where <br />
        your thoughts become creative
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center mt-5">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Potion <span> 🧪</span>
            {/* <ArrowRight className="h-4 w-4 ml-2" /> */}
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Potion free<span> 🧪</span>
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
