import type { ReactNode } from 'react';
import SideNav from '@/ui/dashboard/sidenav';

// Signed-out visitors are redirected in src/middleware/auth.ts, before this
// renders. See the README for why a redirect here would not be enough.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
