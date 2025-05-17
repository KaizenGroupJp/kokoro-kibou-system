
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Users, Banknote, Calendar, Bell, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

const recentMembers = [
  { id: 1, name: 'Takashi Yamada', date: '2023-05-15', type: 'New Member' },
  { id: 2, name: 'Maria Silva', date: '2023-05-14', type: 'Baptism' },
  { id: 3, name: 'João Santos', date: '2023-05-12', type: 'New Member' },
  { id: 4, name: 'Hiroshi Tanaka', date: '2023-05-10', type: 'Transfer In' },
];

const upcomingEvents = [
  { id: 1, name: 'Sunday Service', date: '2023-05-21', time: '10:00' },
  { id: 2, name: 'Prayer Meeting', date: '2023-05-23', time: '19:00' },
  { id: 3, name: 'Youth Group', date: '2023-05-25', time: '18:30' },
  { id: 4, name: 'Leadership Meeting', date: '2023-05-26', time: '19:30' },
];

const membershipData = [
  {
    name: 'Jan',
    new: 4,
    total: 120,
  },
  {
    name: 'Feb',
    new: 7,
    total: 127,
  },
  {
    name: 'Mar',
    new: 5,
    total: 132,
  },
  {
    name: 'Apr',
    new: 8,
    total: 140,
  },
  {
    name: 'May',
    new: 12,
    total: 152,
  },
];

const attendanceData = [
  { name: 'Adult Service', value: 120 },
  { name: 'Children', value: 45 },
  { name: 'Youth', value: 28 },
  { name: 'Online', value: 35 },
];

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#0ea5e9'];

const financialData = {
  income: {
    amount: '¥850,000',
    change: '+5.2%',
    positive: true,
  },
  expenses: {
    amount: '¥620,000',
    change: '+2.1%',
    positive: false,
  },
  balance: {
    amount: '¥230,000',
    change: '+15.3%',
    positive: true,
  },
};

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-600">{currentDate}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center bg-white rounded-md p-2">
                <Bell size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">You have 5 notifications</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Members</p>
                      <p className="text-3xl font-bold mt-1">152</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Users size={24} className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">8.2%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monthly Income</p>
                      <p className="text-3xl font-bold mt-1">¥850,000</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Banknote size={24} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">5.2%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                      <p className="text-3xl font-bold mt-1">8</p>
                    </div>
                    <div className="bg-sakura-100 p-3 rounded-full">
                      <Calendar size={24} className="text-sakura-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-500">Next: Sunday Service (May 21)</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>Membership Growth</CardTitle>
                  <CardDescription>Monthly member growth for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={membershipData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="new" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Service Attendance</CardTitle>
                  <CardDescription>Last Sunday's attendance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={(entry) => entry.name}
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Member Activity</CardTitle>
                    <CardDescription>New and updated member records</CardDescription>
                  </div>
                  <Link to="/dashboard/members" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    View all <ChevronRight size={16} />
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.type}</p>
                        </div>
                        <p className="text-sm text-gray-500">{member.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Scheduled events for the next 7 days</CardDescription>
                  </div>
                  <Link to="/dashboard/calendar" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    View all <ChevronRight size={16} />
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                        </div>
                        <Link to={`/dashboard/calendar/${event.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                          Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
