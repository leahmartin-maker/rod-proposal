
import Image from "next/image";
import { getRodTableData } from "../lib/getRodTableData";

export default async function Home() {
  let rodData = [];
  let error = null;
  try {
    rodData = await getRodTableData();
  } catch (e) {
    error = e;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Supabase 'specials' Table Data
          </h1>
          {error && (
            <div className="text-red-500">Error: {error.message}</div>
          )}
          <pre className="max-w-md text-xs bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(rodData, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}
