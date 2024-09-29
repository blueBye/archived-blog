import {GlobeDemo} from "@/components/hero/globe";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <GlobeDemo/>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-opacity-35 drop-shadow-lg rounded-xl bg-white/20 backdrop-blur-sm border border-gray-500 shadow-lg ring-1 ring-black/5 px-8 py-12 flex-col flex gap-16 content-center">
          <p className="font-bold text-4xl text-center">
            شاید بهترین وبلاگ؟
          </p>
        </div>
      </main>
    </div>
);
}
