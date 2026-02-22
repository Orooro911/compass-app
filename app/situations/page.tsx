import Link from "next/link";

export default function SituationsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <Link href="/" className="text-white/70 hover:text-white text-sm mb-6 inline-block">← Back to Dashboard</Link>
      <h1 className="text-2xl font-semibold mb-2">Situations</h1>
      <p className="text-white/80">Add and work through meaningful situations. (Coming soon)</p>
    </main>
  );
}
