
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, MoreHorizontal, FileDown, Filter, Mail, User } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

// Sample member data
const members = [
  {
    id: 1,
    name: 'Takashi Yamada',
    email: 'takashi@example.com',
    phone: '+81 90-1234-5678',
    status: 'active',
    memberSince: '2020-03-15',
    baptized: true,
    family: 'Yamada Family',
  },
  {
    id: 2,
    name: 'Maria Silva',
    email: 'mariasilva@example.com',
    phone: '+81 80-8765-4321',
    status: 'active',
    memberSince: '2021-06-10',
    baptized: true,
    family: 'Silva Family',
  },
  {
    id: 3,
    name: 'João Santos',
    email: 'joao@example.com',
    phone: '+81 70-2345-6789',
    status: 'inactive',
    memberSince: '2019-11-22',
    baptized: true,
    family: 'Santos Family',
  },
  {
    id: 4,
    name: 'Hiroshi Tanaka',
    email: 'htanaka@example.com',
    phone: '+81 90-5678-1234',
    status: 'active',
    memberSince: '2022-01-05',
    baptized: false,
    family: 'Tanaka Family',
  },
  {
    id: 5,
    name: 'Ana Oliveira',
    email: 'ana.oliveira@example.com',
    phone: '+81 80-1111-2222',
    status: 'active',
    memberSince: '2021-09-12',
    baptized: true,
    family: 'Oliveira Family',
  },
  {
    id: 6,
    name: 'Yusuke Nakamura',
    email: 'y.nakamura@example.com',
    phone: '+81 70-3333-4444',
    status: 'active',
    memberSince: '2022-04-18',
    baptized: true,
    family: 'Nakamura Family',
  },
  {
    id: 7,
    name: 'Carlos Gomez',
    email: 'carlos.g@example.com',
    phone: '+81 90-5555-6666',
    status: 'inactive',
    memberSince: '2020-08-30',
    baptized: true,
    family: 'Gomez Family',
  },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const filteredMembers = members.filter(member => {
    // Filter by search term
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'active') {
      return matchesSearch && member.status === 'active';
    } else if (activeTab === 'inactive') {
      return matchesSearch && member.status === 'inactive';
    } else if (activeTab === 'baptized') {
      return matchesSearch && member.baptized;
    } else {
      return matchesSearch;
    }
  });

  const handleExport = () => {
    toast({
      title: 'Export started',
      description: 'Member data is being exported to CSV',
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
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Members</h1>
                <p className="text-gray-600">Manage church members and families</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/dashboard/members/new">
                  <Button className="flex items-center">
                    <Plus size={16} className="mr-2" />
                    Add Member
                  </Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Member Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
                      <TabsList>
                        <TabsTrigger value="all">All Members</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        <TabsTrigger value="baptized">Baptized</TabsTrigger>
                      </TabsList>
                      
                      <div className="flex">
                        <Button
                          variant="outline"
                          size="icon"
                          className="mr-2"
                          onClick={() => toast({
                            title: 'Filter options',
                            description: 'Advanced filters would appear here',
                          })}
                        >
                          <Filter size={18} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="mr-2"
                          onClick={handleExport}
                        >
                          <FileDown size={18} />
                        </Button>
                        <div className="relative">
                          <Search size={18} className="absolute left-2.5 top-2.5 text-gray-500" />
                          <Input
                            placeholder="Search members..."
                            className="pl-9 w-full md:w-[240px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <TabsContent value="all" className="space-y-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead className="hidden md:table-cell">Email</TableHead>
                              <TableHead className="hidden md:table-cell">Status</TableHead>
                              <TableHead className="hidden lg:table-cell">Member Since</TableHead>
                              <TableHead className="hidden lg:table-cell">Family</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredMembers.length > 0 ? (
                              filteredMembers.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>
                                    <div className="font-medium">{member.name}</div>
                                    <div className="text-sm text-gray-500 md:hidden">{member.email}</div>
                                    <div className="text-sm text-gray-500 md:hidden">
                                      {member.status === 'active' ? (
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                                      ) : (
                                        <Badge variant="outline" className="text-gray-800">Inactive</Badge>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {member.status === 'active' ? (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-gray-800">Inactive</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="hidden lg:table-cell">{new Date(member.memberSince).toLocaleDateString()}</TableCell>
                                  <TableCell className="hidden lg:table-cell">{member.family}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toast({
                                          title: 'Message sent',
                                          description: `Email notification sent to ${member.name}`,
                                        })}
                                      >
                                        <Mail size={18} />
                                      </Button>
                                      <Link to={`/dashboard/members/${member.id}`}>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                        >
                                          <User size={18} />
                                        </Button>
                                      </Link>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <MoreHorizontal size={18} />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>Edit</DropdownMenuItem>
                                          <DropdownMenuItem>Generate Certificate</DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                  No members found. Try adjusting your search or filters.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="active" className="space-y-4">
                      {/* Same table structure with filtered data */}
                    </TabsContent>
                    <TabsContent value="inactive" className="space-y-4">
                      {/* Same table structure with filtered data */}
                    </TabsContent>
                    <TabsContent value="baptized" className="space-y-4">
                      {/* Same table structure with filtered data */}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
