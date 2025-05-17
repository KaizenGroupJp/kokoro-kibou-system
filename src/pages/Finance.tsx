
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Banknote, Download, Plus, TrendingUp, TrendingDown, Info } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from '@/hooks/use-toast';

// Sample financial data
const transactions = [
  {
    id: 1,
    date: '2023-05-14',
    description: 'Sunday Offering',
    category: 'Offering',
    amount: '¥125,000',
    type: 'income',
  },
  {
    id: 2,
    date: '2023-05-12',
    description: 'Monthly Tithe - Tanaka Family',
    category: 'Tithe',
    amount: '¥80,000',
    type: 'income',
  },
  {
    id: 3,
    date: '2023-05-10',
    description: 'Youth Event Sponsorship',
    category: 'Donation',
    amount: '¥50,000',
    type: 'income',
  },
  {
    id: 4,
    date: '2023-05-09',
    description: 'Electricity Bill',
    category: 'Utilities',
    amount: '¥28,500',
    type: 'expense',
  },
  {
    id: 5,
    date: '2023-05-07',
    description: 'Pastor Salary',
    category: 'Salary',
    amount: '¥320,000',
    type: 'expense',
  },
  {
    id: 6,
    date: '2023-05-05',
    description: 'Building Rent',
    category: 'Rent',
    amount: '¥200,000',
    type: 'expense',
  },
  {
    id: 7,
    date: '2023-05-02',
    description: 'Mission Trip Fundraiser',
    category: 'Fundraising',
    amount: '¥175,000',
    type: 'income',
  },
  {
    id: 8,
    date: '2023-05-01',
    description: 'Office Supplies',
    category: 'Supplies',
    amount: '¥15,200',
    type: 'expense',
  },
];

const monthlyFinanceData = [
  {
    month: 'Jan',
    income: 780000,
    expenses: 650000,
  },
  {
    month: 'Feb',
    income: 820000,
    expenses: 630000,
  },
  {
    month: 'Mar',
    income: 750000,
    expenses: 640000,
  },
  {
    month: 'Apr',
    income: 810000,
    expenses: 650000,
  },
  {
    month: 'May',
    income: 850000,
    expenses: 620000,
  },
];

const incomeByCategory = [
  { name: 'Tithe', value: 450000 },
  { name: 'Offerings', value: 280000 },
  { name: 'Donations', value: 80000 },
  { name: 'Fundraising', value: 175000 },
];

const expensesByCategory = [
  { name: 'Salaries', value: 320000 },
  { name: 'Rent', value: 200000 },
  { name: 'Utilities', value: 35000 },
  { name: 'Supplies', value: 25000 },
  { name: 'Missions', value: 40000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(value);
};

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timePeriod, setTimePeriod] = useState('month');
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: 'Report download started',
      description: 'Your financial report is being generated',
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Financial Management</h1>
                <p className="text-gray-600">Track income, expenses, and financial reports</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={handleDownloadReport}
                >
                  <Download size={16} className="mr-2" />
                  Download Report
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  New Transaction
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Income</p>
                      <p className="text-3xl font-bold mt-1">¥850,000</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <TrendingUp size={24} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">5.2%</span>
                    <span className="text-gray-500 ml-1">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                      <p className="text-3xl font-bold mt-1">¥620,000</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <TrendingDown size={24} className="text-red-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingDown size={16} className="text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">2.1%</span>
                    <span className="text-gray-500 ml-1">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Net Balance</p>
                      <p className="text-3xl font-bold mt-1">¥230,000</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Banknote size={24} className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">15.3%</span>
                    <span className="text-gray-500 ml-1">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Financial Overview</CardTitle>
                      <CardDescription>Income and expenses over time</CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Select defaultValue={timePeriod} onValueChange={setTimePeriod}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyFinanceData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="income"
                          stroke="#4ade80"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Income"
                        />
                        <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} name="Expenses" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Income by Category</CardTitle>
                  <CardDescription>Breakdown of income sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={incomeByCategory}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="value" fill="#4ade80" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                  <CardDescription>Breakdown of expense categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={expensesByCategory}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="value" fill="#f43f5e" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>View and manage financial transactions</CardDescription>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button variant="outline">View All Transactions</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell className="hidden md:table-cell">{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-right">{transaction.amount}</TableCell>
                          <TableCell className="text-center">
                            {transaction.type === 'income' ? (
                              <span className="inline-flex items-center text-green-600">
                                <TrendingUp size={16} className="mr-1" /> Income
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-red-600">
                                <TrendingDown size={16} className="mr-1" /> Expense
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-600 flex items-center">
                  <Info size={16} className="mr-1" />
                  Transactions are in Japanese Yen (¥)
                </div>
                <Button variant="outline" onClick={handleDownloadReport}>Export Transactions</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
