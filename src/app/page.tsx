import { db } from "~/server/db";
import HomePageClient from "./_components/HomePageClient";
import { auth } from "@clerk/nextjs/server";
import LogIn from "./login/page";

export default async function HomePage() {
  return (
    <div>
      <HomePageClient />
    </div>
  );
}
