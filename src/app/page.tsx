import { db } from "~/server/db";
import HomePageClient from "./_components/HomePageClient";
import { auth } from "@clerk/nextjs/server";
import LogIn from "./_components/LogIn";

export default async function HomePage() {
  const user = auth();

  return <div>{user.userId ? <HomePageClient /> : <LogIn />}</div>;
}
