"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function LogIn({}: Props) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("signed in", isSignedIn);
    if (isSignedIn) {
      router.push("/");
    }
  });
  return <div>Please Log in </div>;
}
