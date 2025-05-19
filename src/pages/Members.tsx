
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Search, Plus, MoreHorizontal, FileDown, Filter, Mail, User, UserCog, Heart, Calendar, ShieldCheck } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

// Enhanced sample member data with roles and family relations
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
    photo: 'https://i.pravatar.cc/150?img=33',
    roles: ['financial', 'secretary'],
    familyMembers: [
      { id: 8, name: 'Yuki Yamada', relation: 'spouse' },
      { id: 9, name: 'Haruto Yamada', relation: 'child', age: 10 },
    ],
    allergies: [],
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
    photo: 'https://i.pravatar.cc/150?img=5',
    roles: ['children_ministry_teacher'],
    familyMembers: [
      { id: 10, name: 'Ricardo Silva', relation: 'spouse' },
      { id: 11, name: 'Laura Silva', relation: 'child', age: 7 },
      { id: 12, name: 'Pedro Silva', relation: 'child', age: 5 },
    ],
    allergies: [],
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
    photo: 'https://i.pravatar.cc/150?img=68',
    roles: [],
    familyMembers: [],
    allergies: [],
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
    photo: 'https://i.pravatar.cc/150?img=41',
    roles: ['financial'],
    familyMembers: [
      { id: 13, name: 'Akiko Tanaka', relation: 'spouse' },
    ],
    allergies: ['Penicilina'],
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
    photo: 'https://i.pravatar.cc/150?img=16',
    roles: ['children_ministry_teacher'],
    familyMembers: [],
    allergies: ['Amendoim', 'Frutos do mar'],
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
    photo: 'https://i.pravatar.cc/150?img=60',
    roles: [],
    familyMembers: [],
    allergies: [],
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
    photo: 'https://i.pravatar.cc/150?img=11',
    roles: [],
    familyMembers: [],
    allergies: ['Glúten'],
  },
];

// Define available roles
const availableRoles = [
  { id: 'financial', name: 'Financeiro', description: 'Acesso ao módulo financeiro' },
  { id: 'secretary', name: 'Secretário', description: 'Funções administrativas e de secretaria' },
  { id: 'children_ministry_teacher', name: 'Professor Min. Infantil', description: 'Acesso ao módulo do ministério infantil' },
  { id: 'admin', name: 'Administrador', description: 'Acesso completo ao sistema' },
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
    } else if (activeTab === 'with_roles') {
      return matchesSearch && member.roles.length > 0;
    } else if (activeTab === 'with_allergies') {
      return matchesSearch && member.allergies.length > 0;
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
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
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
                      <TabsList className="flex-wrap">
                        <TabsTrigger value="all">All Members</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        <TabsTrigger value="baptized">Baptized</TabsTrigger>
                        <TabsTrigger value="with_roles">With Roles</TabsTrigger>
                        <TabsTrigger value="with_allergies">With Allergies</TabsTrigger>
                      </TabsList>
                      
                      <div className="flex flex-wrap gap-2">
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
                              <TableHead className="hidden lg:table-cell">Roles</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredMembers.length > 0 ? (
                              filteredMembers.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                        <img 
                                          src={member.photo} 
                                          alt={member.name} 
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-gray-500 md:hidden">{member.email}</div>
                                        <div className="text-sm text-gray-500 md:hidden">
                                          {member.status === 'active' ? (
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                                          ) : (
                                            <Badge variant="outline" className="text-gray-800">Inactive</Badge>
                                          )}
                                        </div>
                                      </div>
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
                                  <TableCell className="hidden lg:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                      {member.roles.map(role => {
                                        const roleInfo = availableRoles.find(r => r.id === role);
                                        if (!roleInfo) return null;
                                        
                                        return (
                                          <Badge key={role} variant="outline" className="bg-blue-50 border-blue-200">
                                            {role === 'financial' && <CreditCard size={12} className="mr-1" />}
                                            {role === 'secretary' && <Mail size={12} className="mr-1" />}
                                            {role === 'children_ministry_teacher' && <Heart size={12} className="mr-1" />}
                                            {role === 'admin' && <ShieldCheck size={12} className="mr-1" />}
                                            {roleInfo.name}
                                          </Badge>
                                        );
                                      })}
                                      {member.allergies.length > 0 && (
                                        <Badge variant="outline" className="bg-red-50 border-red-200 text-red-800">
                                          Alergias
                                        </Badge>
                                      )}
                                    </div>
                                  </TableCell>
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
                                          <Link to={`/dashboard/members/edit/${member.id}`}>
                                            <DropdownMenuItem>
                                              <UserCog className="mr-2 h-4 w-4" />
                                              Edit Member
                                            </DropdownMenuItem>
                                          </Link>
                                          <Link to={`/dashboard/member-card/${member.id}`}>
                                            <DropdownMenuItem>
                                              <User className="mr-2 h-4 w-4" />
                                              Member Card
                                            </DropdownMenuItem>
                                          </Link>
                                          <Link to={`/dashboard/baptism-certificate/${member.id}`}>
                                            <DropdownMenuItem>
                                              <Calendar className="mr-2 h-4 w-4" />
                                              Baptism Certificate
                                            </DropdownMenuItem>
                                          </Link>
                                          <DropdownMenuSeparator />
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
                    <TabsContent value="with_roles" className="space-y-4">
                      {/* Same table structure with filtered data */}
                    </TabsContent>
                    <TabsContent value="with_allergies" className="space-y-4">
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
