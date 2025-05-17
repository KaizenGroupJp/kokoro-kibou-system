
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample events data
const events = [
  {
    id: 1,
    title: "Culto Dominical",
    start: new Date(2025, 4, 18, 10, 0),
    end: new Date(2025, 4, 18, 12, 0),
    location: "Salão Principal",
    type: "culto",
    attendees: 120
  },
  {
    id: 2,
    title: "Estudo Bíblico",
    start: new Date(2025, 4, 21, 19, 30),
    end: new Date(2025, 4, 21, 21, 0),
    location: "Sala 3",
    type: "estudo",
    attendees: 35
  },
  {
    id: 3,
    title: "Reunião de Líderes",
    start: new Date(2025, 4, 20, 18, 0),
    end: new Date(2025, 4, 20, 19, 30),
    location: "Sala de Conferência",
    type: "reuniao",
    attendees: 15
  },
  {
    id: 4,
    title: "Ensaio do Coral",
    start: new Date(2025, 4, 19, 19, 0),
    end: new Date(2025, 4, 19, 21, 0),
    location: "Salão Principal",
    type: "ensaio",
    attendees: 25
  },
  {
    id: 5,
    title: "Grupo de Jovens",
    start: new Date(2025, 4, 22, 20, 0),
    end: new Date(2025, 4, 22, 22, 0),
    location: "Sala Multiuso",
    type: "jovens",
    attendees: 45
  },
  {
    id: 6,
    title: "Culto de Oração",
    start: new Date(2025, 4, 15, 19, 0),
    end: new Date(2025, 4, 15, 20, 30),
    location: "Sala de Oração",
    type: "culto",
    attendees: 30
  },
  {
    id: 7,
    title: "Conferência Missionária",
    start: new Date(2025, 5, 5, 18, 0),
    end: new Date(2025, 5, 5, 21, 0),
    location: "Salão Principal",
    type: "conferencia",
    attendees: 150
  }
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { toast } = useToast();

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  // Filter events based on search and filter type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || event.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const eventsByDate = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(event.start, date));
  };

  const hasEventsOnDate = (date: Date) => {
    return events.some(event => isSameDay(event.start, date));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'culto': return 'bg-blue-100 text-blue-700';
      case 'estudo': return 'bg-green-100 text-green-700';
      case 'reuniao': return 'bg-purple-100 text-purple-700';
      case 'ensaio': return 'bg-yellow-100 text-yellow-700';
      case 'jovens': return 'bg-pink-100 text-pink-700';
      case 'conferencia': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeName = (type: string) => {
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

  const handleExportCalendar = () => {
    toast({
      title: "Calendário exportado",
      description: "O calendário foi exportado com sucesso.",
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
                <h2 className="text-3xl font-bold tracking-tight">Calendário</h2>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border rounded-md p-1 bg-background">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('month')}
                    className={view === 'month' ? 'bg-muted' : ''}
                  >
                    Mês
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('week')}
                    className={view === 'week' ? 'bg-muted' : ''}
                  >
                    Semana
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('day')}
                    className={view === 'day' ? 'bg-muted' : ''}
                  >
                    Dia
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('list')}
                    className={view === 'list' ? 'bg-muted' : ''}
                  >
                    Lista
                  </Button>
                </div>
                <Link to="/dashboard/new-event">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Evento
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-xl font-semibold min-w-[140px] text-center">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 flex-wrap md:flex-nowrap gap-2 md:gap-0">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="culto">Cultos</SelectItem>
                    <SelectItem value="estudo">Estudos</SelectItem>
                    <SelectItem value="reuniao">Reuniões</SelectItem>
                    <SelectItem value="ensaio">Ensaios</SelectItem>
                    <SelectItem value="jovens">Jovens</SelectItem>
                    <SelectItem value="conferencia">Conferências</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Buscar eventos..." 
                    className="pl-8 w-full md:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={handleExportCalendar}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {/* Left side - Calendar */}
              <div className={`${view === 'month' || view === 'list' ? 'lg:col-span-3' : 'lg:col-span-7'}`}>
                <Card>
                  <CardContent className="p-6">
                    <CalendarComponent 
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="rounded-md border shadow pointer-events-auto"
                      modifiers={{
                        hasEvent: (date) => hasEventsOnDate(date),
                      }}
                      modifiersClassNames={{
                        hasEvent: "bg-primary/10 font-bold",
                      }}
                      disabled={(date) => date < subMonths(new Date(), 3)}
                    />

                    <div className="mt-4 flex justify-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary/10 mr-1" />
                        <span className="text-xs text-muted-foreground">Com eventos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-background border mr-1" />
                        <span className="text-xs text-muted-foreground">Sem eventos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
                    
              {/* Right side - Events list */}
              {(view === 'month' || view === 'list') && (
                <div className="lg:col-span-4">
                  <Card>
                    <CardHeader className="pb-3">
                      {view === 'month' ? (
                        <CardTitle className="flex items-center">
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          Eventos em {format(date, 'dd/MM/yyyy')}
                        </CardTitle>
                      ) : (
                        <CardTitle className="flex items-center">
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          Próximos Eventos
                        </CardTitle>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {view === 'month' ? (
                          // Show events for selected date in month view
                          eventsByDate(date).length > 0 ? (
                            eventsByDate(date).map(event => (
                              <Card key={event.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedEvent(event)}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{event.title}</h4>
                                      <div className="text-sm text-muted-foreground">
                                        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                                      </div>
                                      <div className="text-sm text-muted-foreground">{event.location}</div>
                                    </div>
                                    <Badge className={`${getEventTypeColor(event.type)}`}>
                                      {getEventTypeName(event.type)}
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-center py-4">
                              Nenhum evento agendado para esta data.
                            </p>
                          )
                        ) : (
                          // Show all upcoming events in list view
                          filteredEvents.sort((a, b) => a.start.getTime() - b.start.getTime()).map(event => (
                            <Card key={event.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedEvent(event)}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="text-sm text-muted-foreground">
                                      {format(event.start, 'dd/MM/yyyy')}
                                    </div>
                                    <h4 className="font-medium">{event.title}</h4>
                                    <div className="text-sm text-muted-foreground">
                                      {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{event.location}</div>
                                  </div>
                                  <Badge className={`${getEventTypeColor(event.type)}`}>
                                    {getEventTypeName(event.type)}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}

                        {view === 'list' && filteredEvents.length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            Nenhum evento encontrado com os filtros atuais.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Week or Day view (placeholder) */}
              {(view === 'week' || view === 'day') && (
                <div className="lg:col-span-7">
                  <Card className="h-[600px]">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-full">
                        <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          Visualização de {view === 'week' ? 'Semana' : 'Dia'}
                        </h3>
                        <p className="text-muted-foreground text-center max-w-md">
                          Esta visualização será implementada em breve. Por enquanto, você pode usar as visualizações de Mês e Lista para gerenciar seus eventos.
                        </p>
                        <Button className="mt-4" onClick={() => setView('month')}>
                          Voltar para Visualização de Mês
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Event Details Sheet */}
          {selectedEvent && (
            <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{selectedEvent.title}</SheetTitle>
                  <SheetDescription>
                    Detalhes do evento
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <Badge className={`${getEventTypeColor(selectedEvent.type)}`}>
                    {getEventTypeName(selectedEvent.type)}
                  </Badge>
          
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(selectedEvent.start, 'dd/MM/yyyy')} · {format(selectedEvent.start, 'HH:mm')} - {format(selectedEvent.end, 'HH:mm')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Local</h4>
                    <p>{selectedEvent.location}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Participantes</h4>
                    <p>{selectedEvent.attendees} pessoas</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Link to="/dashboard/events">
                    <Button variant="outline">
                      Ver Todos os Eventos
                    </Button>
                  </Link>
                  <Button>
                    Editar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
