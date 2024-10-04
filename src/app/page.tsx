"use client"

import { WavyBackground } from "@/components/ui/wavy-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();

  const placeholders = [
    "میخوام یه پست بخونم",
    "میخوام یه چیزی یادبگیرم",
    "نمی‌دونم",
    "باید یه کاری کنم ولی یادم نمیاد",
    "کمی تا مقداری",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/blog`);
  };

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl font-bold text-center mb-12">
        میدونی چرا اینجایی؟
      </p>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onSubmit={onSubmit}
        onChange={() => {}}
      />
    </WavyBackground>
);
}
