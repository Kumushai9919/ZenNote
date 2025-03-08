"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10">
        Where Focus Fuels Creativity. Welcome to
        <span className="underline"> ZenNote</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium mt-5">
        ZenNote is the connected workspace where <br />
        your thoughts become creative
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center mt-5 mb-10">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild className="mt-10">
          <Link href="/documents">
            Enter ZenNote <img src="/zen.png" alt="" />
            {/* <ArrowRight className="h-4 w-4 ml-2" /> */}
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" >
          <Button className="mt-10">
            Get ZenNote free <img src="/zen.png" alt="" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
