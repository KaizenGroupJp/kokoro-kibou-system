
import { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Search, 
  Plus, 
  CheckCircle,
  Clock,
  Award,
  BookCheck,
  ChartBar,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from "@/hooks/use-toast";

// Mock data for volunteers
const volunteers = [
  {
    id: 1,
    name: "Takashi Yamada",
    ministry: "Louvor",
    role: "Líder de Louvor",
    skills: ["Violão", "Vocal", "Composição"],
    status: "active",
    availability: ["Domingo", "Quarta"],
    hoursThisMonth: 28,
    portrait: ""
  },
  {
    id: 2,
    name: "Maria Silva",
    ministry: "Infantil",
    role: "Professora",
    skills: ["Ensino", "Criatividade", "Música"],
    status: "active",
    availability: ["Domingo", "Sábado"],
    hoursThisMonth: 36,
    portrait: ""
  },
  {
    id: 3,
    name: "João Santos",
    ministry: "Mídia",
    role: "Operador de Som",
    skills: ["Áudio", "Informática"],
    status: "active",
    availability: ["Domingo", "Quarta", "Sexta"],
    hoursThisMonth: 22,
    portrait: ""
  },
  {
    id: 4,
    name: "Hiroshi Tanaka",
    ministry: "Recepção",
    role: "Recepcionista",
    skills: ["Comunicação", "Hospitalidade"],
    status: "inactive",
    availability: ["Domingo"],
    hoursThisMonth: 8,
    portrait: ""
  },
  {
    id: 5,
    name: "Ana Kimura",
    ministry: "Louvor",
    role: "Pianista",
    skills: ["Piano", "Teclado", "Teoria Musical"],
    status: "active",
    availability: ["Domingo", "Quarta", "Sábado"],
    hoursThisMonth: 32,
    portrait: ""
  }
];

// Mock data for volunteer schedules
const schedules = [
  {
    id: 1,
    date: "2023-05-21",
    event: "Culto Dominical",
    positions: [
      { role: "Líder de Louvor", volunteer: "Takashi Yamada", status: "confirmed" },
      { role: "Pianista", volunteer: "Ana Kimura", status: "confirmed" },
      { role: "Operador de Som", volunteer: "João Santos", status: "confirmed" },
      { role: "Recepcionista", volunteer: "Hiroshi Tanaka", status: "pending" }
    ]
  },
  {
    id: 2,
    date: "2023-05-24",
    event: "Culto de Oração",
    positions: [
      { role: "Líder de Oração", volunteer: "Pastor Silva", status: "confirmed" },
      { role: "Pianista", volunteer: "Ana Kimura", status: "confirmed" },
      { role: "Operador de Som", volunteer: null, status: "open" }
    ]
  },
  {
    id: 3,
    date: "2023-05-28",
    event: "Culto Dominical",
    positions: [
      { role: "Líder de Louvor", volunteer: null, status: "open" },
      { role: "Pianista", volunteer: "Ana Kimura", status: "pending" },
      { role: "Operador de Som", volunteer: "João Santos", status: "confirmed" },
      { role: "Recepcionista", volunteer: "Maria Silva", status: "confirmed" }
    ]
  }
];

// Mock data for courses
const courses = [
  {
    id: 1,
    name: "Fundamentos da Fé",
    nameJp: "信仰の基礎",
    description: "Curso básico sobre os fundamentos da fé cristã",
    instructor: "Pastor José Silva",
    duration: 8, // weeks
    enrolledStudents: 15,
    maxStudents: 20,
    status: "active",
    completionRate: 65,
    nextSession: "2023-05-20"
  },
  {
    id: 2,
    name: "Liderança Cristã",
    nameJp: "クリスチャンリーダーシップ",
    description: "Desenvolvimento de habilidades de liderança baseadas em princípios bíblicos",
    instructor: "Pastor Roberto Tanaka",
    duration: 12, // weeks
    enrolledStudents: 8,
    maxStudents: 15,
    status: "active",
    completionRate: 42,
    nextSession: "2023-05-23"
  },
  {
    id: 3,
    name: "Estudo do Antigo Testamento",
    nameJp: "旧約聖書の研究",
    description: "Estudo aprofundado dos livros do Antigo Testamento",
    instructor: "Dra. Sakura Yamamoto",
    duration: 16, // weeks
    enrolledStudents: 12,
    maxStudents: 25,
    status: "upcoming",
    completionRate: 0,
    nextSession: "2023-06-04"
  },
  {
    id: 4,
    name: "Discipulado Básico",
    nameJp: "基本的な弟子訓練",
    description: "Introdução ao discipulado cristão para novos convertidos",
    instructor: "Pastor José Silva",
    duration: 6, // weeks
    enrolledStudents: 10,
    maxStudents: 10,
    status: "completed",
    completionRate: 100,
    nextSession: null
  }
];

// Mock data for students
const students = [
  {
    id: 1,
    name: "Hiroshi Sato",
    courses: [1, 2],
    progress: {
      1: 75, // course id: progress percentage
      2: 50
    },
    attendance: 92,
    certificates: ["Batismo", "Membresia"]
  },
  {
    id: 2,
    name: "Mariana Tanaka",
    courses: [1, 3],
    progress: {
      1: 100,
      3: 0
    },
    attendance: 88,
    certificates: ["Membresia", "Fundamentos da Fé"]
  },
  {
    id: 3,
    name: "Carlos Nakamura",
    courses: [1, 2],
    progress: {
      1: 60,
      2: 35
    },
    attendance: 78,
    certificates: ["Batismo"]
  }
];

const Volunteers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinistry, setFilterMinistry] = useState('all');
  const [activeTab, setActiveTab] = useState('volunteers');
  const { toast } = useToast();

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificado sendo gerado",
      description: "O certificado será baixado em alguns segundos.",
    });
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          volunteer.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          volunteer.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinistry = filterMinistry === 'all' || volunteer.ministry === filterMinistry;
    return matchesSearch && matchesMinistry;
  });

  const ministriesList = [...new Set(volunteers.map(vol => vol.ministry))];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Inativo</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Em Breve</Badge>;
      case "completed":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">Concluído</Badge>;
      case "confirmed":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Confirmado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case "open":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Aberto</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Voluntários e Educação</h1>
                <p className="text-gray-600">Gestão de voluntários, escalas e formação espiritual</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Gerar Escala
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Novo Voluntário
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Voluntários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Users size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{volunteers.length}</p>
                      <p className="text-sm text-gray-500">
                        {volunteers.filter(v => v.status === 'active').length} ativos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cursos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <BookOpen size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">
                        {courses.filter(c => c.status === 'active').length}
                      </p>
                      <p className="text-sm text-gray-500">
                        {courses.filter(c => c.status === 'active').reduce((sum, c) => sum + c.enrolledStudents, 0)} alunos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Próxima Escala</CardTitle>
                </CardHeader>
                <CardContent>
                  {schedules.length > 0 ? (
                    (() => {
                      const nextSchedule = [...schedules]
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                      
                      return (
                        <div className="flex items-center">
                          <div className="bg-green-100 p-3 rounded-full mr-4">
                            <Calendar size={24} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{nextSchedule.event}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(nextSchedule.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <Calendar size={24} className="text-gray-600" />
                      </div>
                      <p className="text-sm">Nenhuma escala agendada</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="volunteers">Voluntários</TabsTrigger>
                <TabsTrigger value="schedule">Escalas</TabsTrigger>
                <TabsTrigger value="courses">Cursos e Discipulado</TabsTrigger>
                <TabsTrigger value="students">Alunos</TabsTrigger>
              </TabsList>

              <TabsContent value="volunteers">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                      <div>
                        <CardTitle>Lista de Voluntários</CardTitle>
                        <CardDescription>Gerencie todos os voluntários da igreja</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            type="search"
                            placeholder="Buscar voluntários..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Select
                          value={filterMinistry}
                          onValueChange={setFilterMinistry}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ministério" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos os Ministérios</SelectItem>
                            {ministriesList.map((ministry) => (
                              <SelectItem key={ministry} value={ministry}>
                                {ministry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Ministério</TableHead>
                            <TableHead className="hidden md:table-cell">Função</TableHead>
                            <TableHead className="hidden md:table-cell">Habilidades</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden lg:table-cell">Disponibilidade</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredVolunteers.map((volunteer) => (
                            <TableRow key={volunteer.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={volunteer.portrait} alt={volunteer.name} />
                                    <AvatarFallback>{getInitials(volunteer.name)}</AvatarFallback>
                                  </Avatar>
                                  {volunteer.name}
                                </div>
                              </TableCell>
                              <TableCell>{volunteer.ministry}</TableCell>
                              <TableCell className="hidden md:table-cell">{volunteer.role}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  {volunteer.skills.slice(0, 2).map((skill, idx) => (
                                    <Badge key={idx} variant="outline">{skill}</Badge>
                                  ))}
                                  {volunteer.skills.length > 2 && (
                                    <Badge variant="outline">+{volunteer.skills.length - 2}</Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="text-sm">
                                  {volunteer.availability.join(', ')}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">Ver Detalhes</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Escala de Voluntários</CardTitle>
                    <CardDescription>
                      Gerencie as escalas de serviço para os próximos eventos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {schedules.map((schedule) => (
                        <div key={schedule.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium">{schedule.event}</h3>
                              <p className="text-sm text-gray-500">
                                {new Date(schedule.date).toLocaleDateString('pt-BR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Plus size={14} className="mr-1" />
                                  Adicionar Posição
                                </Button>
                                <Button size="sm">
                                  <Calendar size={14} className="mr-1" />
                                  Escalar
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-md border overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Função</TableHead>
                                  <TableHead>Voluntário</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {schedule.positions.map((position, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="font-medium">{position.role}</TableCell>
                                    <TableCell>
                                      {position.volunteer ? (
                                        <div className="flex items-center">
                                          <Avatar className="h-6 w-6 mr-2">
                                            <AvatarFallback>
                                              {getInitials(position.volunteer)}
                                            </AvatarFallback>
                                          </Avatar>
                                          {position.volunteer}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500">Não designado</span>
                                      )}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(position.status)}</TableCell>
                                    <TableCell className="text-right">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        disabled={position.status === "open"}
                                      >
                                        {position.status === "open" ? "Designar" : "Alterar"}
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Cursos e Treinamentos</CardTitle>
                        <CardDescription>
                          Gerencie programas de discipulado e formação espiritual
                        </CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button className="flex items-center">
                          <Plus size={16} className="mr-2" />
                          Novo Curso
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courses.map((course) => (
                        <Card key={course.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-lg">{course.name}</h3>
                                <p className="text-sm text-gray-500">{course.nameJp}</p>
                              </div>
                              {getStatusBadge(course.status)}
                            </div>

                            <p className="text-sm text-gray-600 mt-2">
                              {course.description}
                            </p>
                            
                            <div className="mt-4 space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Instrutor</span>
                                  <span className="font-medium">{course.instructor}</span>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Duração</span>
                                  <span className="font-medium">{course.duration} semanas</span>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Alunos</span>
                                  <span className="font-medium">{course.enrolledStudents}/{course.maxStudents}</span>
                                </div>
                                <Progress value={(course.enrolledStudents / course.maxStudents) * 100} className="h-1" />
                              </div>
                              
                              {course.status === "active" && (
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progresso do Curso</span>
                                    <span className="font-medium">{course.completionRate}%</span>
                                  </div>
                                  <Progress value={course.completionRate} className="h-1" />
                                </div>
                              )}
                              
                              {course.nextSession && (
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                  <span className="text-gray-600">
                                    Próxima aula: {new Date(course.nextSession).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center">
                              <Button variant="outline" size="sm">
                                <BookCheck className="h-4 w-4 mr-2" /> Materiais
                              </Button>
                              
                              <Button size="sm">
                                {course.status === "upcoming" ? "Abrir Inscrições" : 
                                 course.status === "completed" ? "Ver Relatório" : 
                                 "Gerenciar Curso"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Alunos e Discípulos</CardTitle>
                        <CardDescription>
                          Acompanhe o progresso e desenvolvimento dos alunos
                        </CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Buscar alunos..."
                          className="pl-8 w-[250px]"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {students.map((student) => (
                      <Card key={student.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <div className="flex items-center mb-4">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-lg">{student.name}</h3>
                              </div>
                              
                              <div className="space-y-2 mb-6">
                                <div className="flex items-center text-sm">
                                  <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>
                                    {student.courses.length} curso{student.courses.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>Frequência: {student.attendance}%</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                  <Award className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>
                                    {student.certificates.length} certificado{student.certificates.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Certificados:</h4>
                                {student.certificates.map((cert, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                                    <div className="flex items-center">
                                      <Award className="h-4 w-4 text-indigo-600 mr-2" />
                                      <span className="text-sm">{cert}</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={handleDownloadCertificate}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="md:w-2/3 md:pl-6 md:border-l mt-6 md:mt-0">
                              <h4 className="font-medium mb-3">Progresso nos Cursos</h4>
                              <div className="space-y-6">
                                {student.courses.map(courseId => {
                                  const course = courses.find(c => c.id === courseId);
                                  if (!course) return null;
                                  
                                  const progress = student.progress[courseId] || 0;
                                  
                                  return (
                                    <div key={courseId} className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span className="font-medium">{course.name}</span>
                                        <span>{progress}%</span>
                                      </div>
                                      <Progress value={progress} className="h-2" />
                                      <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>{course.instructor}</span>
                                        <span>
                                          {progress === 100 ? (
                                            <span className="flex items-center text-green-600">
                                              <CheckCircle className="h-3 w-3 mr-1" />
                                              Concluído
                                            </span>
                                          ) : (
                                            <span>
                                              Em andamento
                                            </span>
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div className="flex justify-end mt-6">
                                <Button variant="outline" size="sm" className="mr-2">
                                  <ChartBar className="h-4 w-4 mr-2" />
                                  Relatório
                                </Button>
                                <Button size="sm">Ver Detalhes</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default Volunteers;
