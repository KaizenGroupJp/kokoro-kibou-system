
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, Baby, Heart, AlertTriangle } from 'lucide-react';

// Sample data for children
const children = [
  {
    id: 1,
    name: 'Ana Tanaka',
    age: 8,
    classroom: 'Sala Alegria',
    parent: 'Maria Tanaka',
    specialNeeds: false,
    allergies: ['Amendoim'],
    attendance: '85%',
  },
  {
    id: 2,
    name: 'Pedro Suzuki',
    age: 6,
    classroom: 'Sala Esperança',
    parent: 'João Suzuki',
    specialNeeds: true,
    specialNeedsDetails: 'TDAH',
    allergies: [],
    attendance: '92%',
  },
  {
    id: 3,
    name: 'Isabela Santos',
    age: 4,
    classroom: 'Sala Fé',
    parent: 'Carlos Santos',
    specialNeeds: false,
    allergies: ['Lactose'],
    attendance: '78%',
  },
  {
    id: 4,
    name: 'Lucas Kimura',
    age: 10,
    classroom: 'Sala Amor',
    parent: 'Laura Kimura',
    specialNeeds: false,
    allergies: [],
    attendance: '95%',
  },
  {
    id: 5,
    name: 'Sophia Oliveira',
    age: 7,
    classroom: 'Sala Alegria',
    parent: 'Paulo Oliveira',
    specialNeeds: true,
    specialNeedsDetails: 'Autismo leve',
    allergies: ['Glúten'],
    attendance: '88%',
  },
];

// Sample data for classrooms
const classrooms = [
  {
    id: 1,
    name: 'Sala Alegria',
    ageRange: '7-9 anos',
    capacity: 15,
    currentEnrollment: 12,
    teacher: 'Fernanda Yamamoto',
    assistant: 'Ricardo Mori',
  },
  {
    id: 2,
    name: 'Sala Esperança',
    ageRange: '5-6 anos',
    capacity: 12,
    currentEnrollment: 8,
    teacher: 'André Nakamura',
    assistant: 'Julia Lima',
  },
  {
    id: 3,
    name: 'Sala Fé',
    ageRange: '3-4 anos',
    capacity: 10,
    currentEnrollment: 9,
    teacher: 'Mariana Costa',
    assistant: 'Eduardo Tanaka',
  },
  {
    id: 4,
    name: 'Sala Amor',
    ageRange: '10-12 anos',
    capacity: 18,
    currentEnrollment: 14,
    teacher: 'Roberto Sato',
    assistant: 'Cristina Pereira',
  },
];

const ChildrenMinistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('children');

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Ministério Infantil</h1>
                <p className="text-gray-600">Gerenciamento de crianças, salas e atividades</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Adicionar Criança
                </Button>
              </div>
            </div>

            <Tabs defaultValue="children" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
                <TabsList>
                  <TabsTrigger value="children">Crianças</TabsTrigger>
                  <TabsTrigger value="classrooms">Salas</TabsTrigger>
                  <TabsTrigger value="curriculum">Currículo</TabsTrigger>
                  <TabsTrigger value="events">Eventos</TabsTrigger>
                </TabsList>

                <div className="relative">
                  <Search size={18} className="absolute left-2.5 top-2.5 text-gray-500" />
                  <Input
                    placeholder={activeTab === 'children' ? "Buscar crianças..." : "Buscar salas..."}
                    className="pl-9 w-full md:w-[240px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="children">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Crianças</CardTitle>
                    <CardDescription>
                      Gerenciamento de crianças no ministério infantil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead className="hidden md:table-cell">Idade</TableHead>
                            <TableHead className="hidden md:table-cell">Sala</TableHead>
                            <TableHead className="hidden lg:table-cell">Responsável</TableHead>
                            <TableHead className="hidden lg:table-cell">Freq.</TableHead>
                            <TableHead>Necessidades</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredChildren.length > 0 ? (
                            filteredChildren.map((child) => (
                              <TableRow key={child.id}>
                                <TableCell>
                                  <div className="font-medium">{child.name}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{child.age} anos</TableCell>
                                <TableCell className="hidden md:table-cell">{child.classroom}</TableCell>
                                <TableCell className="hidden lg:table-cell">{child.parent}</TableCell>
                                <TableCell className="hidden lg:table-cell">{child.attendance}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-1">
                                    {child.specialNeeds && (
                                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                        <AlertTriangle size={12} className="mr-1" /> 
                                        Especial
                                      </Badge>
                                    )}
                                    {child.allergies.length > 0 && (
                                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                        <AlertTriangle size={12} className="mr-1" /> 
                                        Alergia
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">Detalhes</Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8">
                                Nenhuma criança encontrada. Ajuste sua pesquisa.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classrooms">
                <Card>
                  <CardHeader>
                    <CardTitle>Salas do Ministério Infantil</CardTitle>
                    <CardDescription>
                      Gerenciamento de salas e equipes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {filteredClassrooms.map(classroom => (
                        <Card key={classroom.id} className="overflow-hidden">
                          <CardHeader className="bg-primary/10 pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{classroom.name}</CardTitle>
                              <Badge>{classroom.ageRange}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Capacidade:</span>
                                <span>{classroom.currentEnrollment} / {classroom.capacity}</span>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(classroom.currentEnrollment / classroom.capacity) * 100}%` }}
                                ></div>
                              </div>

                              <div className="pt-2">
                                <p className="text-sm font-medium">Equipe</p>
                                <div className="flex flex-col space-y-1 mt-1">
                                  <div className="flex items-center">
                                    <Heart size={14} className="mr-2 text-rose-500" />
                                    <span className="text-sm">{classroom.teacher}</span>
                                    <Badge className="ml-2" variant="outline">Professor</Badge>
                                  </div>
                                  <div className="flex items-center">
                                    <Heart size={14} className="mr-2 text-rose-500" />
                                    <span className="text-sm">{classroom.assistant}</span>
                                    <Badge className="ml-2" variant="outline">Auxiliar</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button size="sm" variant="outline" className="mr-2">
                                  <Calendar size={14} className="mr-1" />
                                  Cronograma
                                </Button>
                                <Button size="sm">Detalhes</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Currículo e Materiais</CardTitle>
                    <CardDescription>
                      Planejamento de aulas e recursos didáticos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-center py-12 text-muted-foreground">
                        Funcionalidade em desenvolvimento. Em breve você poderá gerenciar o currículo e materiais didáticos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Especiais</CardTitle>
                    <CardDescription>
                      Planejamento de eventos para o ministério infantil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-center py-12 text-muted-foreground">
                        Funcionalidade em desenvolvimento. Em breve você poderá gerenciar eventos especiais para crianças.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenMinistry;
