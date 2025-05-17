
import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Search,
  Bell,
  MessageSquare,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from "@/hooks/use-toast";

// Mock data for events
const events = [
  {
    id: 1,
    title: "Culto Dominical",
    titleJp: "日曜礼拝",
    date: "2023-05-21",
    time: "10:00 - 12:00",
    location: "Igreja Principal",
    locationJp: "本教会",
    type: "worship",
    description: "Culto dominical com pregação do Pastor José Silva sobre Salmos 23.",
    descriptionJp: "ジョゼ・シルバ牧師による詩篇23篇についての説教がある日曜礼拝。",
    attendees: 120,
    capacity: 150,
    recurring: true
  },
  {
    id: 2,
    title: "Estudo Bíblico",
    titleJp: "聖書の学び",
    date: "2023-05-24",
    time: "19:30 - 21:00",
    location: "Centro Comunitário",
    locationJp: "コミュニティセンター",
    type: "study",
    description: "Estudo sobre o livro de Apocalipse, capítulo 7.",
    descriptionJp: "黙示録第7章についての聖書の学び。",
    attendees: 35,
    capacity: 50,
    recurring: true
  },
  {
    id: 3,
    title: "Reunião do Ministério de Jovens",
    titleJp: "青年部会",
    date: "2023-05-26",
    time: "18:00 - 20:00",
    location: "Centro Comunitário",
    locationJp: "コミュニティセンター",
    type: "meeting",
    description: "Reunião para planejamento do retiro de julho.",
    descriptionJp: "7月の修養会の計画についてのミーティング。",
    attendees: 18,
    capacity: 30,
    recurring: false
  },
  {
    id: 4,
    title: "Celebração do Dia das Mães",
    titleJp: "母の日祝賀会",
    date: "2023-05-14",
    time: "12:30 - 14:00",
    location: "Igreja Principal",
    locationJp: "本教会",
    type: "celebration",
    description: "Almoço especial em celebração ao Dia das Mães.",
    descriptionJp: "母の日を祝う特別なランチ。",
    attendees: 85,
    capacity: 100,
    recurring: false
  },
  {
    id: 5,
    title: "Grupo de Oração",
    titleJp: "祈りの会",
    date: "2023-05-22",
    time: "06:00 - 07:00",
    location: "Igreja Principal",
    locationJp: "本教会",
    type: "prayer",
    description: "Reunião matinal de oração.",
    descriptionJp: "朝の祈祷会。",
    attendees: 12,
    capacity: 30,
    recurring: true
  }
];

// Mock data for messages
const messages = [
  {
    id: 1,
    title: "Programação Semanal",
    recipient: "Todos os Membros",
    sentDate: "2023-05-15",
    status: "sent",
    openRate: 78,
    platform: "whatsapp",
    content: "Olá irmãos! Confira a programação desta semana na igreja..."
  },
  {
    id: 2,
    title: "Aviso sobre Retiro",
    recipient: "Ministério de Jovens",
    sentDate: "2023-05-14",
    status: "sent",
    openRate: 92,
    platform: "whatsapp",
    content: "Informamos que as inscrições para o retiro de julho já estão abertas..."
  },
  {
    id: 3,
    title: "Lembrete Estudo Bíblico",
    recipient: "Grupo de Estudo",
    sentDate: "2023-05-17",
    status: "scheduled",
    scheduledDate: "2023-05-23",
    platform: "email",
    content: "Não se esqueça do nosso estudo bíblico amanhã..."
  },
  {
    id: 4,
    title: "Convite para Celebração",
    recipient: "Novos Convertidos",
    sentDate: "2023-05-10",
    status: "sent",
    openRate: 65,
    platform: "whatsapp",
    content: "É com alegria que convidamos você para nossa celebração..."
  }
];

// Mock data for social media posts
const socialPosts = [
  {
    id: 1,
    title: "Convite para Culto Dominical",
    content: "Venha adorar conosco neste domingo! Tema: O Bom Pastor",
    image: "https://placehold.co/600x400/indigo/white?text=Culto+Dominical",
    platform: "facebook",
    status: "published",
    publishDate: "2023-05-19",
    likes: 45,
    comments: 12,
    shares: 8
  },
  {
    id: 2,
    title: "Versículo da Semana",
    content: "\"Porque Deus amou o mundo de tal maneira...\" João 3:16",
    image: "https://placehold.co/600x400/purple/white?text=João+3:16",
    platform: "instagram",
    status: "published",
    publishDate: "2023-05-17",
    likes: 68,
    comments: 5,
    shares: 15
  },
  {
    id: 3,
    title: "Anúncio de Evento Especial",
    content: "No próximo final de semana teremos nosso encontro de casais...",
    image: "https://placehold.co/600x400/pink/white?text=Encontro+de+Casais",
    platform: "instagram",
    status: "scheduled",
    scheduledDate: "2023-05-22"
  },
  {
    id: 4,
    title: "Testemunho Inspirador",
    content: "Como Deus transformou a vida da irmã Maria após anos de oração...",
    image: "https://placehold.co/600x400/indigo/white?text=Testemunho",
    platform: "facebook",
    status: "draft"
  }
];

// Helper function to group events by date
const groupEventsByDate = (events: any[]) => {
  return events.reduce((acc: {[key: string]: any[]}, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});
};

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeView, setActiveView] = useState('calendar');
  const { toast } = useToast();

  const handleSendNotification = () => {
    toast({
      title: "Notificação enviada",
      description: "A notificação foi enviada para todos os inscritos no evento.",
    });
  };

  // Get all dates for the current month
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Get events for current month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth.getMonth() &&
      eventDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  // Group events by date for list view
  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return <MessageSquare className="text-green-500 h-4 w-4" />;
      case "email":
        return <Bell className="text-blue-500 h-4 w-4" />;
      case "facebook":
        return <Share2 className="text-indigo-600 h-4 w-4" />;
      case "instagram":
        return <Share2 className="text-pink-600 h-4 w-4" />;
      default:
        return <Bell className="text-gray-500 h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
      case "published":
        return <CheckCircle className="text-green-500 h-4 w-4" />;
      case "scheduled":
        return <Clock className="text-orange-500 h-4 w-4" />;
      case "draft":
        return <AlertCircle className="text-gray-500 h-4 w-4" />;
      default:
        return <XCircle className="text-red-500 h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Eventos e Comunicação</h1>
                <p className="text-gray-600">Gerencie calendário de eventos e comunicações da igreja</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center" onClick={handleSendNotification}>
                  <Bell size={16} className="mr-2" />
                  Enviar Notificação
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Novo Evento
                </Button>
              </div>
            </div>

            <Tabs defaultValue="events" className="space-y-4">
              <TabsList>
                <TabsTrigger value="events">Eventos</TabsTrigger>
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
                <TabsTrigger value="social">Mídias Sociais</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-4">
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            const newMonth = new Date(currentMonth);
                            newMonth.setMonth(newMonth.getMonth() - 1);
                            setCurrentMonth(newMonth);
                          }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <h3 className="text-xl font-bold">
                          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </h3>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            const newMonth = new Date(currentMonth);
                            newMonth.setMonth(newMonth.getMonth() + 1);
                            setCurrentMonth(newMonth);
                          }}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <Button 
                          variant={activeView === 'calendar' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setActiveView('calendar')}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Calendário
                        </Button>
                        <Button 
                          variant={activeView === 'list' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setActiveView('list')}
                        >
                          <List className="h-4 w-4 mr-1" />
                          Lista
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activeView === 'calendar' ? (
                      <div className="grid grid-cols-7 gap-1">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
                          <div key={`header-${i}`} className="text-center text-sm font-medium p-2">
                            {day}
                          </div>
                        ))}
                        
                        {/* Empty cells for days before the first day of month */}
                        {Array.from({
                          length: daysInMonth[0].getDay()
                        }).map((_, i) => (
                          <div key={`empty-start-${i}`} className="p-2 border rounded-md bg-gray-50"></div>
                        ))}

                        {daysInMonth.map((date, i) => {
                          const dateString = date.toISOString().split('T')[0];
                          const dayEvents = events.filter(event => event.date === dateString);
                          const isToday = new Date().toISOString().split('T')[0] === dateString;
                          
                          return (
                            <div 
                              key={`day-${i}`}
                              className={`p-2 border rounded-md min-h-[100px] ${
                                isToday ? 'bg-indigo-50 border-indigo-200' : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div className="font-medium text-sm mb-1">
                                {date.getDate()}
                              </div>
                              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                <div
                                  key={`event-${eventIndex}`}
                                  className={`text-xs p-1 rounded mb-1 truncate ${
                                    event.type === 'worship' ? 'bg-indigo-100 text-indigo-800' :
                                    event.type === 'study' ? 'bg-blue-100 text-blue-800' :
                                    event.type === 'prayer' ? 'bg-purple-100 text-purple-800' :
                                    event.type === 'meeting' ? 'bg-orange-100 text-orange-800' :
                                    'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  +{dayEvents.length - 3} mais
                                </div>
                              )}
                            </div>
                          );
                        })}
                        
                        {/* Empty cells for days after the last day of month */}
                        {Array.from({
                          length: 6 - daysInMonth[daysInMonth.length - 1].getDay()
                        }).map((_, i) => (
                          <div key={`empty-end-${i}`} className="p-2 border rounded-md bg-gray-50"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {sortedDates.map(date => {
                          const dateEvents = groupedEvents[date];
                          return (
                            <div key={date} className="space-y-2">
                              <h3 className="font-medium text-lg">
                                {new Date(date).toLocaleDateString('pt-BR', { 
                                  weekday: 'long', 
                                  day: 'numeric', 
                                  month: 'long' 
                                })}
                              </h3>
                              <div className="space-y-2">
                                {dateEvents.map((event) => (
                                  <Card key={event.id} className="overflow-hidden">
                                    <div className="border-l-4 border-indigo-600 pl-4 p-4">
                                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div>
                                          <h4 className="font-bold text-lg">{event.title}</h4>
                                          <p className="text-sm text-gray-500">{event.titleJp}</p>
                                          <div className="mt-2 space-y-1">
                                            <div className="flex items-center text-sm">
                                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                              <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                              <span>{event.location} ({event.locationJp})</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                              <Users className="h-4 w-4 mr-2 text-gray-500" />
                                              <span>
                                                {event.attendees}/{event.capacity} participantes
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                                          <Badge
                                            className={
                                              event.type === 'worship' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100' :
                                              event.type === 'study' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                              event.type === 'prayer' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
                                              event.type === 'meeting' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                                              'bg-green-100 text-green-800 hover:bg-green-100'
                                            }
                                          >
                                            {event.type === 'worship' ? 'Culto' :
                                              event.type === 'study' ? 'Estudo' :
                                              event.type === 'prayer' ? 'Oração' :
                                              event.type === 'meeting' ? 'Reunião' :
                                              'Celebração'
                                            }
                                          </Badge>
                                          <div className="mt-4 flex">
                                            <Button size="sm" variant="outline">Detalhes</Button>
                                            <Button size="sm" className="ml-2">Check-in</Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                    <CardDescription>Confira os eventos programados para os próximos dias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events
                        .filter(event => new Date(event.date) >= new Date())
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .slice(0, 3)
                        .map((event) => (
                          <div key={event.id} className="flex flex-col md:flex-row md:items-center md:justify-between border-b last:border-0 pb-4 last:pb-0">
                            <div className="flex items-start">
                              <div className="mr-4 w-12 h-12 bg-indigo-100 rounded-md flex flex-col items-center justify-center">
                                <span className="font-bold text-indigo-700">
                                  {new Date(event.date).getDate()}
                                </span>
                                <span className="text-xs text-indigo-600">
                                  {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-500">{event.titleJp}</p>
                                <div className="mt-1 flex items-center text-sm">
                                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                  <span className="text-gray-600">{event.time}</span>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                  <span className="text-gray-600">{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex">
                              <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4 mr-2" />
                                Notificar
                              </Button>
                              <Button size="sm" className="ml-2">
                                <Users className="h-4 w-4 mr-2" />
                                Check-in
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">Ver Todos os Eventos</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Mensagens e Notificações</CardTitle>
                        <CardDescription>Gerencie comunicações com os membros da igreja</CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Mensagem
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <Card key={message.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  {getPlatformIcon(message.platform)}
                                  <h3 className="ml-2 text-lg font-medium">{message.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Para: {message.recipient}
                                </p>
                                
                                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                                  <p className="text-sm">
                                    {message.content}...
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-end">
                                <div className="flex items-center">
                                  {getStatusIcon(message.status)}
                                  <span className="ml-1 text-sm capitalize">
                                    {message.status === "scheduled" ? "Agendada" : 
                                      message.status === "sent" ? "Enviada" : message.status}
                                  </span>
                                </div>
                                
                                {message.openRate !== undefined && (
                                  <div className="mt-2 text-sm text-gray-600">
                                    Taxa de abertura: {message.openRate}%
                                  </div>
                                )}
                                
                                <div className="mt-2 text-sm text-gray-600">
                                  {message.status === "scheduled" 
                                    ? `Agendada para: ${new Date(message.scheduledDate).toLocaleDateString()}`
                                    : `Enviada em: ${new Date(message.sentDate).toLocaleDateString()}`}
                                </div>
                                
                                <div className="mt-4 flex">
                                  <Button variant="outline" size="sm">
                                    Ver Detalhes
                                  </Button>
                                  {message.status === "scheduled" && (
                                    <Button variant="outline" size="sm" className="ml-2">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      Editar
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Mídias Sociais</CardTitle>
                        <CardDescription>Gerenciar conteúdo para as redes sociais da igreja</CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Publicação
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {socialPosts.map((post) => (
                        <Card key={post.id}>
                          <div className="p-1">
                            <div className="rounded-md overflow-hidden mb-4 aspect-[16/9] bg-gray-100">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="px-4">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  className={
                                    post.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                                    post.platform === 'instagram' ? 'bg-pink-100 text-pink-800' :
                                    'bg-gray-100 text-gray-800'
                                  }
                                >
                                  {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                                </Badge>
                                <div className="flex items-center">
                                  {getStatusIcon(post.status)}
                                  <span className="ml-1 text-sm capitalize">
                                    {post.status === "published" ? "Publicado" : 
                                      post.status === "scheduled" ? "Agendado" : 
                                      post.status === "draft" ? "Rascunho" : post.status}
                                  </span>
                                </div>
                              </div>
                              
                              <h3 className="font-bold mb-2">{post.title}</h3>
                              <p className="text-sm text-gray-600 mb-4">{post.content}</p>
                              
                              {post.status === "published" ? (
                                <div className="flex justify-between text-sm text-gray-600 mb-4">
                                  <div className="flex space-x-4">
                                    <span>{post.likes} curtidas</span>
                                    <span>{post.comments} comentários</span>
                                    <span>{post.shares} compartilhamentos</span>
                                  </div>
                                  <span>
                                    {new Date(post.publishDate).toLocaleDateString()}
                                  </span>
                                </div>
                              ) : post.status === "scheduled" ? (
                                <div className="text-sm text-gray-600 mb-4">
                                  Agendado para: {new Date(post.scheduledDate).toLocaleDateString()}
                                </div>
                              ) : null}
                              
                              <div className="flex justify-end space-x-2 mb-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                {post.status !== "published" && (
                                  <Button size="sm">
                                    {post.status === "scheduled" ? "Reprogramar" : "Publicar"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
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

export default Events;
