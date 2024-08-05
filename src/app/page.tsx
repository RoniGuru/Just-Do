import { db } from "~/server/db";
import HomePageClient from "./_components/HomePageClient";

export default async function HomePage() {
  return (
    <div>
      <HomePageClient />
    </div>
  );
}
