import { useState, type ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-youtube-dark">
      <Header onMenuClick={toggleSidebar} />
      <div className="pt-14">
        {showSidebar && <Sidebar isOpen={isSidebarOpen} />}
        <main className={`${showSidebar ? (isSidebarOpen ? 'md:ml-60' : 'md:ml-18') : ''} transition-all duration-300`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
