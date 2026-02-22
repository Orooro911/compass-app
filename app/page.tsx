import Compass from "./Compass";
import Link from "next/link";

const MODULES = [
  { id: "life-roles", title: "Life Roles", description: "Your fixed identities—job title, parent, friend, volunteer, business owner.", href: "/life-roles" },
  { id: "shared-growth", title: "Shared Growth", description: "The people you share your life with—partner, family, colleagues.", href: "/shared-growth" },
  { id: "situations", title: "Situations", description: "Meaningful situations to work through strategically with the Compass.", href: "/situations" },
];

function ModuleCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-white/20 bg-white/5 p-5 text-left transition-colors hover:bg-white/10 hover:border-white/30"
    >
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <p className="text-sm text-white/80 leading-relaxed">{description}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#0b0b0c] text-white flex flex-col lg:flex-row lg:justify-center lg:items-center"
      style={{ padding: "min(2vh, 24px)" }}
    >
      {/* Left: Compass (desktop) | Top (mobile) */}
      <div className="flex-none flex items-center justify-center lg:min-w-0">
        <div className="w-full max-w-full flex justify-center">
          <Compass />
        </div>
      </div>

      {/* Spacer — desktop only */}
      <div className="hidden lg:block flex-none w-[200px] shrink-0" />

      {/* Right: Module cards */}
      <div className="flex-none flex flex-col justify-center gap-4 pt-6 lg:pt-0 lg:max-w-md">
        {MODULES.map((m) => (
          <ModuleCard key={m.id} title={m.title} description={m.description} href={m.href} />
        ))}
      </div>
    </main>
  );
}
