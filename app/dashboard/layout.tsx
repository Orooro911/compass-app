import { DashboardClient } from "./page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // The dashboard shell is rendered by the client component so it stays mounted
  // across `/dashboard/*` routes.
  return (
    <>
      <DashboardClient />
      {children}
    </>
  );
}

