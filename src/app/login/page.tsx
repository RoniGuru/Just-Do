"use client";
import React from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogIn() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex h-full items-center justify-center text-2xl font-bold text-white">
      <SignInButton>
        <button className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
