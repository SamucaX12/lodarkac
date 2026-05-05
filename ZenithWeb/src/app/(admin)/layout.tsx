import { Sidebar } from "@/components/Sidebar";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-zenith-bg">
      <Sidebar />
      <main className="flex-1 ml-72 p-8">
        {children}
      </main>
    </div>
  );
}
