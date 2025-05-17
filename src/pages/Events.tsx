
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Users,
  User,
  Check,
  X,
  Plus,
  ChevronDown,
  Search,
  MoreHorizontal,
  MapPin,
  Clock,
  Filter,
  CalendarRange
} from 'lucide-react';

// Mock data for events
const eventsData = [
  {
    id: 1,
    title: "Culto Dominical",
    date: "2025-05-18",
    time: "10:00 - 12:00",
    location: "Salão Principal",
    type: "culto",
    attendees: 120,
    description: "Culto dominical com pregação e louvor",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Estudo Bíblico",
    date: "2025-05-21",
    time: "19:30 - 21:00",
    location: "Sala 3",
    type: "estudo",
    attendees: 35,
    description: "Estudo sobre o livro de Romanos",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Reunião de Líderes",
    date: "2025-05-20",
    time: "18:00 - 19:30",
    location: "Sala de Conferência",
    type: "reuniao",
    attendees: 15,
    description: "Planejamento trimestral de atividades",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Ensaio do Coral",
    date: "2025-05-19",
    time: "19:00 - 21:00",
    location: "Salão Principal",
    type: "ensaio",
    attendees: 25,
    description: "Preparação para apresentação no próximo domingo",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Grupo de Jovens",
    date: "2025-05-22",
    time: "20:00 - 22:00",
    location: "Sala Multiuso",
    type: "jovens",
    attendees: 45,
    description: "Encontro semanal de jovens com louvor e edificação",
    status: "upcoming"
  },
  {
    id: 6,
    title: "Culto de Oração",
    date: "2025-05-14",
    time: "19:00 - 20:30",
    location: "Sala de Oração",
    type: "culto",
    attendees: 30,
    description: "Momento de intercessão e oração comunitária",
    status: "past"
  },
  {
    id: 7,
    title: "Conferência Missionária",
    date: "2025-06-05",
    time: "18:00 - 21:00",
    location: "Salão Principal",
    type: "conferencia",
    attendees: 0,
    description: "Conferência anual com foco em missões",
    status: "upcoming"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredEvents = eventsData.filter(event => {
    // Filter by search term
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'upcoming') {
      return matchesSearch && event.status === 'upcoming';
    } else if (activeTab === 'past') {
      return matchesSearch && event.status === 'past';
    } else {
      return matchesSearch;
    }
  });

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'culto': return 'bg-blue-100 text-blue-800';
      case 'estudo': return 'bg-green-100 text-green-800';
      case 'reuniao': return 'bg-purple-100 text-purple-800';
      case 'ensaio': return 'bg-yellow-100 text-yellow-800';
      case 'jovens': return 'bg-pink-100 text-pink-800';
      case 'conferencia': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeName = (type) => {
    switch (type) {
      case 'culto': return 'Culto';
      case 'estudo': return 'Estudo';
      case 'reuniao': return 'Reunião';
      case 'ensaio': return 'Ensaio';
      case 'jovens': return 'Jovens';
      case 'conferencia': return 'Conferência';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
                <p className="text-muted-foreground mt-1">
                  Gerencie os eventos da igreja
                </p>
              </div>
              <Link to="/dashboard/new-event">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Evento
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                  <TabsTrigger value="past">Passados</TabsTrigger>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar eventos..."
                    className="pl-10 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Lista de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evento</TableHead>
                      <TableHead>Data e Hora</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {new Date(event.date).toLocaleDateString('pt-BR')}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                {event.time}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getEventTypeColor(event.type)}`}>
                              {getEventTypeName(event.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                              {event.attendees || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Link to={`/dashboard/calendar`}>
                                <Button variant="ghost" size="sm">
                                  <CalendarRange className="h-4 w-4" />
                                </Button>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                  <DropdownMenuItem>Editar</DropdownMenuItem>
                                  <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nenhum evento encontrado. Tente ajustar sua busca ou filtros.
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
                  <CardTitle className="text-lg">Visão Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total de Eventos</span>
                      <span className="font-bold">{eventsData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Próximos Eventos</span>
                      <span className="font-bold">{eventsData.filter(e => e.status === 'upcoming').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Participantes Esperados</span>
                      <span className="font-bold">
                        {eventsData.filter(e => e.status === 'upcoming').reduce((acc, curr) => acc + curr.attendees, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
                  
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximo Evento</CardTitle>
                </CardHeader>
                <CardContent>
                  {eventsData.filter(e => e.status === 'upcoming').length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-lg">{eventsData.filter(e => e.status === 'upcoming')[0].title}</h3>
                        <Badge className={`${getEventTypeColor(eventsData.filter(e => e.status === 'upcoming')[0].type)} mt-2`}>
                          {getEventTypeName(eventsData.filter(e => e.status === 'upcoming')[0].type)}
                        </Badge>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(eventsData.filter(e => e.status === 'upcoming')[0].date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {eventsData.filter(e => e.status === 'upcoming')[0].time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {eventsData.filter(e => e.status === 'upcoming')[0].location}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Não há eventos próximos agendados.
                    </p>
                  )}
                </CardContent>
              </Card>
                
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Link to="/dashboard/new-event">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Novo Evento
                      </Button>
                    </Link>
                    <Link to="/dashboard/calendar">
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Ver Calendário
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Gerenciar Participantes
                    </Button>
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

export default Events;
