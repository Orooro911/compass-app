import Link from "next/link";

export default function LifeRolesPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <Link href="/" className="text-white/70 hover:text-white text-sm mb-6 inline-block">← Back to Dashboard</Link>
      <h1 className="text-2xl font-semibold mb-2">Life Roles</h1>
      <p className="text-white/80">Add and manage your life roles. (Coming soon)</p>
    </main>
  );
}
