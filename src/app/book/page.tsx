import { MultiStepForm } from "@/components/booking/multi-step-form";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-muted/10 flex flex-col">
      <header className="absolute top-0 w-full p-6 z-10">
        <Link href="/" className="text-xl font-bold tracking-tight">
          we build
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-24">
        <MultiStepForm />
      </main>
    </div>
  );
}
