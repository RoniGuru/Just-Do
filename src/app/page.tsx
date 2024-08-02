import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const goals = await db.query.goals.findMany();

  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4 text-white">
      {goals.map((goal) => (
        <Link href={`/task/${goal.id}`} key={goal.id}>
          <div className="flex h-48 w-48 flex-col border">{goal.name}</div>
        </Link>
      ))}
    </main>
  );
}
