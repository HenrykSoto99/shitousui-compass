import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main content */}
      <main className="lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
}
