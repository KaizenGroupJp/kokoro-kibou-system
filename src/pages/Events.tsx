import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';

import {
  Calendar,
  Users,
  User,
  Check,
  X,
  Plus,
  ChevronDown,
  Search
} from 'lucide-react';

const Events = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        </div>
        <p className="text-muted-foreground">
          Here are your events
        </p>
      </div>
    </div>
  );
};

export default Events;
