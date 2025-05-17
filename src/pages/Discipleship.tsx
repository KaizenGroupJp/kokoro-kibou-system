
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, User, MoreHorizontal, Search, Plus, GraduationCap, Calendar, Check, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for discipleship
const membersData = [
  {
    id: 1,
    name: "Takashi Yamada",
    email: "takashi@example.com",
    phone: "+81 90-1234-5678",
    assigned: "Pr. João Silva",
    startDate: "2023-01-15",
    lastMeeting: "2023-05-10",
    stage: "foundations",
    progress: 75,
    classes: [
      { id: 1, name: "Bases da Fé", completed: true },
      { id: 2, name: "Vida Cristã", completed: true },
      { id: 3, name: "Estudo Bíblico", completed: true },
      { id: 4, name: "Oração", completed: false }
    ]
  },
  {
    id: 2,
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "+81 80-8765-4321",
    assigned: "Diac. Ana Oliveira",
    startDate: "2023-02-20",
    lastMeeting: "2023-05-15",
    stage: "growth",
    progress: 40,
    classes: [
      { id: 1, name: "Bases da Fé", completed: true },
      { id: 2, name: "Vida Cristã", completed: true },
      { id: 3, name: "Estudo Bíblico", completed: false },
      { id: 4, name: "Oração", completed: false }
    ]
  },
  {
    id: 3,
    name: "João Santos",
    email: "joao@example.com",
    phone: "+81 70-2345-6789",
    assigned: "Pr. João Silva",
    startDate: "2022-11-05",
    lastMeeting: "2023-05-01",
    stage: "leadership",
    progress: 90,
    classes: [
      { id: 1, name: "Bases da Fé", completed: true },
      { id: 2, name: "Vida Cristã", completed: true },
      { id: 3, name: "Estudo Bíblico", completed: true },
      { id: 4, name: "Liderança", completed: true }
    ]
  }
];

// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: "Fundamentos da Fé",
    description: "Um curso introdutório sobre os princípios básicos da fé cristã",
    lessons: 6,
    duration: "6 semanas",
    level: "Iniciante",
    students: 12,
    teacher: "Pr. João Silva",
    materials: ["Bíblia", "Apostila"],
    image: "https://images.unsplash.com/photo-1523939158338-1708c91782e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
  },
  {
    id: 2,
    title: "Vida Cristã Prática",
    description: "Como viver os princípios bíblicos no dia a dia",
    lessons: 8,
    duration: "8 semanas",
    level: "Intermediário",
    students: 8,
    teacher: "Diac. Ana Oliveira",
    materials: ["Bíblia", "Apostila", "Livro de Referência"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
  },
  {
    id: 3,
    title: "Formação de Líderes",
    description: "Preparando líderes para servirem na igreja",
    lessons: 10,
    duration: "10 semanas",
    level: "Avançado",
    students: 5,
    teacher: "Pr. João Silva",
    materials: ["Bíblia", "Apostila", "Livros de Referência", "Material Audiovisual"],
    image: "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
  }
];

const Discipleship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('members');
  const { toast } = useToast();

  const filteredMembers = membersData.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageLabel = (stage) => {
    switch (stage) {
      case 'foundations':
        return { label: 'Fundamentos', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'growth':
        return { label: 'Crescimento', color: 'bg-green-100 text-green-800 border-green-200' };
      case 'leadership':
        return { label: 'Liderança', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: stage, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const handleAddMember = () => {
    toast({
      title: "Adicionar discípulo",
      description: "Formulário para adicionar novo discípulo seria aberto aqui.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Discipulado</h2>
            <p className="text-muted-foreground mt-1">
              Gerenciamento do programa de discipulado da igreja
            </p>
          </div>
          <Button onClick={handleAddMember}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Discípulo
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="members">
              <User className="mr-2 h-4 w-4" />
              Discípulos
            </TabsTrigger>
            <TabsTrigger value="courses">
              <Book className="mr-2 h-4 w-4" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="mentors">
              <Users className="mr-2 h-4 w-4" />
              Mentores
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <CardTitle>Discípulos</CardTitle>
                  <div className="relative w-full sm:w-auto max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar discípulo..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Estágio</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Última Reunião</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => {
                        const stage = getStageLabel(member.stage);
                        
                        return (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">
                              {member.name}
                              <div className="text-xs text-muted-foreground">{member.email}</div>
                            </TableCell>
                            <TableCell>{member.assigned}</TableCell>
                            <TableCell>
                              <Badge className={stage.color}>{stage.label}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={member.progress} className="w-[60px]" />
                                <span className="text-xs text-muted-foreground">{member.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(member.lastMeeting).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                  <DropdownMenuItem>Agendar Reunião</DropdownMenuItem>
                                  <DropdownMenuItem>Atualizar Progresso</DropdownMenuItem>
                                  <DropdownMenuItem>Editar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Nenhum discípulo encontrado com esses filtros.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Estatísticas
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total de Discípulos</span>
                      <span className="text-xl font-bold">{membersData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Fundamentos</span>
                      <span className="font-semibold">{membersData.filter(m => m.stage === 'foundations').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Crescimento</span>
                      <span className="font-semibold">{membersData.filter(m => m.stage === 'growth').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Liderança</span>
                      <span className="font-semibold">{membersData.filter(m => m.stage === 'leadership').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Próximas Reuniões
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Takashi Yamada</p>
                        <p className="text-sm text-muted-foreground">com Pr. João Silva</p>
                      </div>
                      <Badge variant="outline">Hoje, 15:00</Badge>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Maria Silva</p>
                        <p className="text-sm text-muted-foreground">com Diac. Ana Oliveira</p>
                      </div>
                      <Badge variant="outline">Amanhã, 10:00</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">João Santos</p>
                        <p className="text-sm text-muted-foreground">com Pr. João Silva</p>
                      </div>
                      <Badge variant="outline">24/05, 14:30</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Ver Todas</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Progresso Recente
                    <Check className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Takashi Yamada</p>
                        <p className="text-sm text-muted-foreground">Completou "Estudo Bíblico"</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+25%</Badge>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Maria Silva</p>
                        <p className="text-sm text-muted-foreground">Completou "Vida Cristã"</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+20%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">João Santos</p>
                        <p className="text-sm text-muted-foreground">Completou "Liderança"</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+15%</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Ver Histórico</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coursesData.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge>{course.level}</Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <Book className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.lessons} aulas</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.students} alunos</span>
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.teacher}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Materiais:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.materials.map((material, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Ver Detalhes</Button>
                    <Button>Gerenciar</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mentors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mentores</CardTitle>
                <CardDescription>Lista de mentores ativos no programa de discipulado</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Discípulos</TableHead>
                      <TableHead>Especialidades</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Pr. João Silva</TableCell>
                      <TableCell>joao.silva@example.com</TableCell>
                      <TableCell>8 discípulos</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="bg-blue-50">Fundamentos</Badge>
                          <Badge variant="outline" className="bg-purple-50">Liderança</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Discípulos</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Adicionar Discípulo</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Diac. Ana Oliveira</TableCell>
                      <TableCell>ana.oliveira@example.com</TableCell>
                      <TableCell>5 discípulos</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="bg-green-50">Crescimento</Badge>
                          <Badge variant="outline" className="bg-yellow-50">Família</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Discípulos</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Adicionar Discípulo</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carlos Suzuki</TableCell>
                      <TableCell>carlos@example.com</TableCell>
                      <TableCell>3 discípulos</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="bg-blue-50">Fundamentos</Badge>
                          <Badge variant="outline" className="bg-orange-50">Jovens</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Discípulos</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Adicionar Discípulo</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Mentor
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Discipleship;
