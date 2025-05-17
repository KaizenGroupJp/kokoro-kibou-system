
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Users,
  Banknote,
  FileText,
  Home,
  Warehouse,
  Calendar,
  BookOpen,
  Baby,
  Check,
  ChartBar,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Membros', icon: Users, path: '/dashboard/members' },
    { name: 'Finanças', icon: Banknote, path: '/dashboard/finance' },
    { name: 'Min.Infantil', icon: Baby, path: '/dashboard/children-ministry' },
    { name: 'Propiedades', icon: Warehouse, path: '/dashboard/assets' },
    { name: 'Documentos', icon: FileText, path: '/dashboard/documents' },
    { name: 'Calendário', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Discipulado', icon: BookOpen, path: '/dashboard/discipleship' },
    { name: 'Check-in', icon: Check, path: '/dashboard/checkin' },
    { name: 'Relatórios', icon: ChartBar, path: '/dashboard/reports' },
    { name: 'Configuração', icon: Settings, path: '/dashboard/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-sidebar z-50 shadow-lg transition-all duration-300 ${
          collapsed ? 'w-[70px]' : 'w-[250px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & toggle */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            {!collapsed && (
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Church Manager" className="w-8 h-8" />
                <span className="text-lg font-bold text-sidebar-foreground">CM<span className="text-indigo-600">JP</span></span>
              </Link>
            )}
            {collapsed && (
              <Link to="/" className="flex justify-center w-full">
                <img src="/logo.svg" alt="Church Manager" className="w-8 h-8" />
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={toggleSidebar}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-md px-3 py-2 transition-colors ${
                      isActive(item.path)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <item.icon size={20} className={collapsed ? 'mx-auto' : 'mr-3'} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="outline"
              className={`w-full flex items-center justify-${collapsed ? 'center' : 'start'}`}
            >
              <LogOut size={18} className={collapsed ? '' : 'mr-2'} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
