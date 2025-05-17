
import { useState } from 'react';
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
  }
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('month');

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const eventsByDate = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date));
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
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Calendário</h2>
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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Evento
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[500px]">
                <SheetHeader>
                  <SheetTitle>Novo Evento</SheetTitle>
                  <SheetDescription>
                    Crie um novo evento para o calendário
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="event-title" className="text-sm font-medium">Título</label>
                    <Input id="event-title" placeholder="Nome do evento" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="event-start-date" className="text-sm font-medium">Data de início</label>
                      <Input id="event-start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="event-start-time" className="text-sm font-medium">Hora de início</label>
                      <Input id="event-start-time" type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="event-end-date" className="text-sm font-medium">Data de fim</label>
                      <Input id="event-end-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="event-end-time" className="text-sm font-medium">Hora de fim</label>
                      <Input id="event-end-time" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-location" className="text-sm font-medium">Local</label>
                    <Input id="event-location" placeholder="Local do evento" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-type" className="text-sm font-medium">Tipo</label>
                    <Select>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="culto">Culto</SelectItem>
                        <SelectItem value="estudo">Estudo Bíblico</SelectItem>
                        <SelectItem value="reuniao">Reunião</SelectItem>
                        <SelectItem value="ensaio">Ensaio</SelectItem>
                        <SelectItem value="jovens">Jovens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-description" className="text-sm font-medium">Descrição</label>
                    <textarea
                      id="event-description"
                      className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                      placeholder="Detalhes do evento"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar eventos..." 
                className="pl-8 w-[200px] md:w-[300px]" 
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardContent className="p-0">
              {view === 'month' && (
                <div className="p-4">
                  <div className="mb-4">
                    <CalendarComponent 
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border shadow"
                      modifiers={{
                        hasEvent: (date) => hasEventsOnDate(date),
                      }}
                      modifiersClassNames={{
                        hasEvent: "bg-primary/10 font-bold",
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                      Eventos em {format(date, 'dd/MM/yyyy')}
                    </h3>
                    <div className="space-y-2">
                      {eventsByDate(date).length > 0 ? (
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
                                  {event.type === 'culto' && 'Culto'}
                                  {event.type === 'estudo' && 'Estudo'}
                                  {event.type === 'reuniao' && 'Reunião'}
                                  {event.type === 'ensaio' && 'Ensaio'}
                                  {event.type === 'jovens' && 'Jovens'}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          Nenhum evento agendado para esta data.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {view === 'list' && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Próximos Eventos</h3>
                  </div>
                  <div className="space-y-2">
                    {events.sort((a, b) => a.start.getTime() - b.start.getTime()).map(event => (
                      <Card key={event.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
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
                              {event.type === 'culto' && 'Culto'}
                              {event.type === 'estudo' && 'Estudo'}
                              {event.type === 'reuniao' && 'Reunião'}
                              {event.type === 'ensaio' && 'Ensaio'}
                              {event.type === 'jovens' && 'Jovens'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {(view === 'week' || view === 'day') && (
                <div className="p-4 text-center">
                  <h3 className="text-muted-foreground">
                    Visualização de {view === 'week' ? 'semana' : 'dia'} será implementada em breve.
                  </h3>
                </div>
              )}
            </CardContent>
          </Card>
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
              <div>
                <Badge className={`${getEventTypeColor(selectedEvent.type)}`}>
                  {selectedEvent.type === 'culto' && 'Culto'}
                  {selectedEvent.type === 'estudo' && 'Estudo'}
                  {selectedEvent.type === 'reuniao' && 'Reunião'}
                  {selectedEvent.type === 'ensaio' && 'Ensaio'}
                  {selectedEvent.type === 'jovens' && 'Jovens'}
                </Badge>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Editar</Button>
              <Button variant="destructive">Excluir</Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Calendar;
