
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, User, MoreHorizontal, Search, Plus, AlertTriangle, Hearts, Baby, Tags, Cake, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for children
const childrenData = [
  {
    id: 1,
    name: "Ana Silva",
    age: 6,
    classroom: "Cordeirinhos",
    guardians: "Maria e João Silva",
    specialNeeds: true,
    allergies: ["Amendoim", "Leite"],
    specialNeedsDetails: "TDAH",
    birthdate: "2019-03-15"
  },
  {
    id: 2,
    name: "Pedro Santos",
    age: 8,
    classroom: "Exploradores",
    guardians: "Laura Santos",
    specialNeeds: false,
    allergies: [],
    birthdate: "2017-07-22"
  },
  {
    id: 3,
    name: "Mariana Tanaka",
    age: 4,
    classroom: "Cordeirinhos",
    guardians: "Hiroshi e Aiko Tanaka",
    specialNeeds: false,
    allergies: ["Chocolate"],
    birthdate: "2021-01-10"
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    age: 9,
    classroom: "Conquistadores",
    guardians: "Carlos Oliveira",
    specialNeeds: true,
    allergies: [],
    specialNeedsDetails: "Deficiência visual parcial",
    birthdate: "2016-05-30"
  },
  {
    id: 5,
    name: "Sophia Yamada",
    age: 7,
    classroom: "Exploradores",
    guardians: "Takashi e Juliana Yamada",
    specialNeeds: false,
    allergies: ["Morango", "Kiwi"],
    birthdate: "2018-11-08"
  }
];

// Mock data for classrooms
const classroomData = [
  {
    id: 1,
    name: "Cordeirinhos",
    ageRange: "3-5 anos",
    capacity: 15,
    currentEnrollment: 8,
    teachers: ["Ana Beatriz", "Carlos Mello"],
    location: "Sala 101",
    description: "Crianças pequenas aprendem através de brincadeiras e histórias bíblicas simples."
  },
  {
    id: 2,
    name: "Exploradores",
    ageRange: "6-8 anos",
    capacity: 20,
    currentEnrollment: 12,
    teachers: ["Mariana Costa", "Roberto Gomes"],
    location: "Sala 102",
    description: "Atividades dinâmicas com foco em valores bíblicos e interação em grupo."
  },
  {
    id: 3,
    name: "Conquistadores",
    ageRange: "9-11 anos",
    capacity: 20,
    currentEnrollment: 14,
    teachers: ["Paulo Siqueira", "Juliana Nakamura"],
    location: "Sala 103",
    description: "Estudo bíblico mais aprofundado com projetos e atividades temáticas."
  }
];

const ChildrenMinistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('children');
  const [filterSpecialNeeds, setFilterSpecialNeeds] = useState<string>('all');
  const [filterClassroom, setFilterClassroom] = useState<string>('all');
  const { toast } = useToast();

  const filteredChildren = childrenData.filter(child => {
    // Filter by search term
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by special needs
    const matchesSpecialNeeds = 
      filterSpecialNeeds === 'all' || 
      (filterSpecialNeeds === 'yes' && child.specialNeeds) || 
      (filterSpecialNeeds === 'no' && !child.specialNeeds);
    
    // Filter by classroom
    const matchesClassroom = 
      filterClassroom === 'all' || 
      child.classroom === filterClassroom;
    
    return matchesSearch && matchesSpecialNeeds && matchesClassroom;
  });

  const handleAddChild = () => {
    toast({
      title: "Adicionar criança",
      description: "Formulário para adicionar nova criança seria aberto aqui.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ministério Infantil</h2>
            <p className="text-muted-foreground mt-1">
              Gerenciamento de crianças, salas e necessidades especiais
            </p>
          </div>
          <Button onClick={handleAddChild}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Criança
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="children">
              <User className="mr-2 h-4 w-4" />
              Crianças
            </TabsTrigger>
            <TabsTrigger value="classrooms">
              <MapPin className="mr-2 h-4 w-4" />
              Salas
            </TabsTrigger>
            <TabsTrigger value="specialNeeds">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Necessidades Especiais
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="children" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <CardTitle>Lista de Crianças</CardTitle>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <Select
                        value={filterClassroom}
                        onValueChange={setFilterClassroom}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrar por sala" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as salas</SelectItem>
                          <SelectItem value="Cordeirinhos">Cordeirinhos</SelectItem>
                          <SelectItem value="Exploradores">Exploradores</SelectItem>
                          <SelectItem value="Conquistadores">Conquistadores</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Select
                        value={filterSpecialNeeds}
                        onValueChange={setFilterSpecialNeeds}
                      >
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Filtrar por necessidades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="yes">Com necessidades especiais</SelectItem>
                          <SelectItem value="no">Sem necessidades especiais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar criança..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>Sala</TableHead>
                      <TableHead>Responsáveis</TableHead>
                      <TableHead>Necessidades Especiais</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChildren.length > 0 ? (
                      filteredChildren.map((child) => (
                        <TableRow key={child.id}>
                          <TableCell className="font-medium">{child.name}</TableCell>
                          <TableCell>{child.age} anos</TableCell>
                          <TableCell>{child.classroom}</TableCell>
                          <TableCell>{child.guardians}</TableCell>
                          <TableCell>
                            {child.specialNeeds ? (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Sim
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                Não
                              </Badge>
                            )}
                            {child.allergies.length > 0 && (
                              <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-300">
                                Alergias
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Nenhuma criança encontrada com esses filtros.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="classrooms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classroomData.map((classroom) => (
                <Card key={classroom.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {classroom.name}
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {classroom.ageRange}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {classroom.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{classroom.location}</span>
                        </div>
                        <Badge>
                          {classroom.currentEnrollment}/{classroom.capacity} crianças
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Professores:</h4>
                        <div className="flex flex-wrap gap-2">
                          {classroom.teachers.map((teacher, index) => (
                            <Badge key={index} variant="outline">
                              {teacher}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">Ver Crianças</Button>
                    <Button size="sm">Gerenciar</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="specialNeeds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crianças com Necessidades Especiais</CardTitle>
                <CardDescription>
                  Lista de crianças com necessidades especiais e alergias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                      Necessidades Especiais
                    </h3>
                    {childrenData.filter(child => child.specialNeeds).map((child) => (
                      <Card key={child.id} className="mb-4 border-l-4 border-l-yellow-400">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="font-medium">{child.name}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Cake className="mr-1 h-4 w-4" />
                                <span>{child.age} anos</span>
                                <span className="mx-2">•</span>
                                <Tags className="mr-1 h-4 w-4" />
                                <span>{child.classroom}</span>
                              </div>
                              <p className="text-sm mt-2">
                                <span className="font-medium">Necessidade:</span> {child.specialNeedsDetails}
                              </p>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {childrenData.filter(child => child.specialNeeds).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        Nenhuma criança com necessidades especiais registrada.
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <Baby className="mr-2 h-5 w-5 text-red-500" />
                      Crianças com Alergias
                    </h3>
                    {childrenData.filter(child => child.allergies.length > 0).map((child) => (
                      <Card key={child.id} className="mb-4 border-l-4 border-l-red-400">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="font-medium">{child.name}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Cake className="mr-1 h-4 w-4" />
                                <span>{child.age} anos</span>
                                <span className="mx-2">•</span>
                                <Tags className="mr-1 h-4 w-4" />
                                <span>{child.classroom}</span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {child.allergies.map((allergy, index) => (
                                  <Badge key={index} variant="outline" className="bg-red-50">
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {childrenData.filter(child => child.allergies.length > 0).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        Nenhuma criança com alergias registrada.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChildrenMinistry;
