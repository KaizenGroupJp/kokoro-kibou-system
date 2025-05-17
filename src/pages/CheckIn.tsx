
import { useState } from 'react';
import { 
  UserCheck, 
  QrCode, 
  Search, 
  Check, 
  Clock, 
  Plus,
  Users,
  Tag,
  AlertCircle,
  User,
  Calendar,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from "@/hooks/use-toast";

// Mock data for events with check-in
const events = [
  {
    id: 1,
    name: "Culto Dominical",
    date: "2023-05-21",
    time: "10:00",
    location: "Igreja Principal",
    expectedAttendees: 150,
    checkedIn: 0,
    status: "upcoming"
  },
  {
    id: 2,
    name: "Estudo Bíblico",
    date: "2023-05-17",
    time: "19:30",
    location: "Centro Comunitário",
    expectedAttendees: 50,
    checkedIn: 42,
    status: "active"
  },
  {
    id: 3,
    name: "Culto Dominical",
    date: "2023-05-14",
    time: "10:00",
    location: "Igreja Principal",
    expectedAttendees: 150,
    checkedIn: 128,
    status: "completed"
  }
];

// Mock data for members
const members = [
  {
    id: 1,
    name: "Takashi Yamada",
    status: "member",
    portrait: "",
    category: "Adulto",
    lastCheckIn: "2023-05-14",
    streak: 12
  },
  {
    id: 2,
    name: "Maria Silva",
    status: "member",
    portrait: "",
    category: "Adulto",
    lastCheckIn: "2023-05-14",
    streak: 16
  },
  {
    id: 3,
    name: "Hiroshi Tanaka",
    status: "member",
    portrait: "",
    category: "Adulto",
    lastCheckIn: "2023-05-10",
    streak: 0
  },
  {
    id: 4,
    name: "Ana Kimura",
    status: "member",
    portrait: "",
    category: "Adulto",
    lastCheckIn: "2023-05-14",
    streak: 8
  },
  {
    id: 5,
    name: "Carlos Nakamura",
    status: "visitor",
    portrait: "",
    category: "Adulto",
    lastCheckIn: "2023-05-14",
    streak: 1
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    status: "member",
    portrait: "",
    category: "Infantil",
    lastCheckIn: "2023-05-14",
    streak: 10,
    guardian: "Hiroshi Tanaka",
    notes: "Alergia a amendoim"
  },
  {
    id: 7,
    name: "Rodrigo Santos",
    status: "visitor",
    portrait: "",
    category: "Adulto",
    lastCheckIn: null,
    streak: 0
  }
];

// Mock data for attendance history
const attendanceHistory = [
  { 
    date: "2023-05-14", 
    event: "Culto Dominical", 
    totalAttendees: 128,
    categories: {
      "Adulto": 105,
      "Jovem": 12,
      "Infantil": 11
    },
    members: 120,
    visitors: 8
  },
  { 
    date: "2023-05-07", 
    event: "Culto Dominical", 
    totalAttendees: 135,
    categories: {
      "Adulto": 110,
      "Jovem": 13,
      "Infantil": 12
    },
    members: 125,
    visitors: 10
  },
  { 
    date: "2023-04-30", 
    event: "Culto Dominical", 
    totalAttendees: 142,
    categories: {
      "Adulto": 115,
      "Jovem": 14,
      "Infantil": 13
    },
    members: 132,
    visitors: 10
  }
];

// Mock data for checked-in people for the active event
const checkedInPeople = [
  { id: 2, name: "Maria Silva", time: "19:15", type: "member" },
  { id: 4, name: "Ana Kimura", time: "19:20", type: "member" },
  { id: 5, name: "Carlos Nakamura", time: "19:22", type: "visitor" },
  { id: 6, name: "Yuki Tanaka", time: "19:25", type: "member", childGuardian: "Hiroshi Tanaka" }
];

const CheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeEvent, setActiveEvent] = useState(events.find(e => e.status === "active")?.id || null);
  const { toast } = useToast();

  const handleCheckIn = (memberId: number, memberName: string) => {
    toast({
      title: "Check-in realizado",
      description: `${memberName} foi registrado com sucesso.`
    });
  };

  const handleQrCodeScan = () => {
    toast({
      title: "Scanner QR Code ativado",
      description: "Aponte a câmera para o QR code do membro."
    });
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || member.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Em breve</Badge>;
      case "active":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Ativo</Badge>;
      case "completed":
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMemberStatusBadge = (status: string) => {
    switch (status) {
      case "member":
        return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">Membro</Badge>;
      case "visitor":
        return <Badge className="bg-orange-50 text-orange-700 border-orange-200">Visitante</Badge>;
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

  const selectedEvent = events.find(event => event.id === activeEvent);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Sistema de Check-in</h1>
                <p className="text-gray-600">Controle de presença em eventos e cultos</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center" onClick={handleQrCodeScan}>
                  <QrCode size={16} className="mr-2" />
                  Escanear QR Code
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Novo Evento
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Evento Ativo</CardTitle>
                  <CardDescription>
                    {selectedEvent?.status === "active" 
                      ? selectedEvent.name 
                      : "Nenhum evento ativo"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedEvent?.status === "active" ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <Clock size={24} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-ins</p>
                          <p className="text-3xl font-bold">{selectedEvent.checkedIn}/{selectedEvent.expectedAttendees}</p>
                        </div>
                      </div>
                      <div>
                        {getEventStatusBadge(selectedEvent.status)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <Clock size={24} className="text-gray-500" />
                      </div>
                      <p className="text-sm">Nenhum evento ativo no momento</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Presentes Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedEvent?.status === "active" ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                          <UserCheck size={24} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold">{checkedInPeople.length}</p>
                          <p className="text-sm text-gray-500">
                            {checkedInPeople.filter(p => p.type === "member").length} membros, 
                            {' '}{checkedInPeople.filter(p => p.type === "visitor").length} visitantes
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Ver Lista</Button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <UserCheck size={24} className="text-gray-500" />
                      </div>
                      <p className="text-sm">Nenhum check-in registrado hoje</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Próximo Evento</CardTitle>
                </CardHeader>
                <CardContent>
                  {events.filter(e => e.status === "upcoming").length > 0 ? (
                    (() => {
                      const nextEvent = events.find(e => e.status === "upcoming");
                      if (!nextEvent) return null;
                      
                      return (
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <Calendar size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{nextEvent.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(nextEvent.date).toLocaleDateString()}, {nextEvent.time}
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <Calendar size={24} className="text-gray-500" />
                      </div>
                      <p className="text-sm">Nenhum evento agendado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Registro de Check-in</CardTitle>
                        <CardDescription>
                          {selectedEvent?.status === "active" 
                            ? `Registre a presença para: ${selectedEvent.name}`
                            : "Selecione um evento ativo para registrar presença"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Select
                        value={activeEvent?.toString() || ''}
                        onValueChange={(value) => setActiveEvent(parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um evento" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem 
                              key={event.id} 
                              value={event.id.toString()}
                              disabled={event.status === "completed"}
                            >
                              {event.name} ({new Date(event.date).toLocaleDateString()})
                              {' '}{getEventStatusBadge(event.status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                      <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Buscar membros..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="Adulto">Adultos</SelectItem>
                          <SelectItem value="Jovem">Jovens</SelectItem>
                          <SelectItem value="Infantil">Infantil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Último Check-in</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => {
                              const isCheckedIn = checkedInPeople.some(p => p.id === member.id);
                              
                              return (
                                <TableRow key={member.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center">
                                      <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src={member.portrait} alt={member.name} />
                                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div>{member.name}</div>
                                        {member.category === "Infantil" && (
                                          <div className="text-xs text-gray-500">
                                            Responsável: {member.guardian}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{member.category}</Badge>
                                  </TableCell>
                                  <TableCell>{getMemberStatusBadge(member.status)}</TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {member.lastCheckIn ? (
                                      <div className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                        <span>{new Date(member.lastCheckIn).toLocaleDateString()}</span>
                                        {member.streak > 0 && (
                                          <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                                            {member.streak}x
                                          </Badge>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-gray-500">Primeira vez</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      size="sm"
                                      variant={isCheckedIn ? "outline" : "default"}
                                      disabled={!selectedEvent || selectedEvent.status !== "active" || isCheckedIn}
                                      onClick={() => handleCheckIn(member.id, member.name)}
                                      className={isCheckedIn ? "text-green-600 border-green-200" : ""}
                                    >
                                      {isCheckedIn ? (
                                        <>
                                          <Check className="h-4 w-4 mr-1" />
                                          Presente
                                        </>
                                      ) : (
                                        "Check-in"
                                      )}
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-24 text-center">
                                Nenhum resultado encontrado.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Check-ins Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedEvent?.status === "active" ? (
                      checkedInPeople.length > 0 ? (
                        <div className="space-y-4">
                          {checkedInPeople.map((person, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{person.name}</div>
                                  <div className="text-xs text-gray-500 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {person.time}
                                    {person.childGuardian && (
                                      <span className="ml-2 text-indigo-600">Infantil</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <UserCheck className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">Nenhum check-in ainda</p>
                        </div>
                      )
                    ) : (
                      <div className="py-8 text-center">
                        <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Selecione um evento ativo</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Frequência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {attendanceHistory.map((record, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h3 className="font-medium">{record.event}</h3>
                              <p className="text-sm text-gray-500">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-2xl font-bold">{record.totalAttendees}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-indigo-600" />
                              <span>Membros: {record.members}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-orange-600" />
                              <span>Visitantes: {record.visitors}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(record.categories).map(([category, count], catIdx) => (
                              <div key={catIdx} className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center">
                                <Tag className="h-3 w-3 mr-1 text-gray-500" />
                                <span>{category}: {count}</span>
                              </div>
                            ))}
                          </div>
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
    </div>
  );
};

export default CheckIn;
