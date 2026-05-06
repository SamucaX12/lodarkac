import { Sidebar } from "@/components/Sidebar";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#020202]">
      <Sidebar />
      <main className="flex-1 ml-72 p-10 min-h-screen overflow-y-auto">
        {/* SUBTLE BACKGROUND GLOW */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[160px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-72 w-[600px] h-[600px] bg-violet-600/[0.03] blur-[160px] pointer-events-none -z-10" />
        
        {children}
      </main>
    </div>
  );
}
