import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-14">
        {showSidebar && <Sidebar />}
        <main className={showSidebar ? 'ml-64' : ''}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
