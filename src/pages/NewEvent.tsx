
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, ChevronLeft, CalendarRange, MapPin, Clock, Image, Share, Facebook, Instagram, Twitter } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const NewEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    category: 'culto',
    isRecurring: false,
    isPublic: true,
  });

  const [image, setImage] = useState<string | null>(null);
  const [isSocialShareModalOpen, setIsSocialShareModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEventData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Evento criado",
        description: "O evento foi criado com sucesso.",
      });
      
      // Show social share modal
      setIsSocialShareModalOpen(true);
    }, 1500);
  };

  const handleShare = (platform: string) => {
    toast({
      title: `Compartilhado no ${platform}`,
      description: `O evento "${eventData.title || 'Novo evento'}" foi compartilhado no ${platform}.`,
    });
    setIsSocialShareModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
       <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/dashboard/events">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h2 className="text-3xl font-bold tracking-tight">Novo Evento</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Crie um novo evento e compartilhe nas redes sociais
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes do Evento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Nome do evento"
                          value={eventData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Data de Início</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !eventData.startDate && "text-muted-foreground"
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {eventData.startDate ? format(eventData.startDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={eventData.startDate}
                                onSelect={(date) => setEventData(prev => ({ ...prev, startDate: date }))}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                              
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Hora de Início</Label>
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={eventData.startTime}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                              
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Data de Término</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !eventData.endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {eventData.endDate ? format(eventData.endDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={eventData.endDate}
                                onSelect={(date) => setEventData(prev => ({ ...prev, endDate: date }))}
                                initialFocus
                                fromDate={eventData.startDate}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                              
                        <div className="space-y-2">
                          <Label htmlFor="endTime">Hora de Término</Label>
                          <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={eventData.endTime}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                              
                      <div className="space-y-2">
                        <Label htmlFor="location">Local</Label>
                        <div className="flex">
                          <Input
                            id="location"
                            name="location"
                            placeholder="Local do evento"
                            value={eventData.location}
                            onChange={handleChange}
                            className="rounded-r-none"
                            required
                          />
                          <Button variant="outline" className="rounded-l-none border-l-0">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                              
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Descrição do evento..."
                          rows={4}
                          value={eventData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                              
                  <Card>
                    <CardHeader>
                      <CardTitle>Imagem do Evento</CardTitle>
                      <CardDescription>
                        Adicione uma imagem para destacar seu evento nas redes sociais
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {image ? (
                        <div className="relative">
                          <img 
                            src={image} 
                            alt="Event preview" 
                            className="w-full h-64 object-cover rounded-md"
                          />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                          >
                            Remover
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Image className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Clique para fazer upload de uma imagem
                              </span>
                              <input
                                id="image-upload"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG até 5MB
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                    
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Categoria</h4>
                        <RadioGroup 
                          value={eventData.category}
                          onValueChange={(value) => setEventData(prev => ({ ...prev, category: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="culto" id="culto" />
                            <Label htmlFor="culto">Culto</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="estudo" id="estudo" />
                            <Label htmlFor="estudo">Estudo Bíblico</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="reuniao" id="reuniao" />
                            <Label htmlFor="reuniao">Reunião</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="jovens" id="jovens" />
                            <Label htmlFor="jovens">Jovens</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outros" id="outros" />
                            <Label htmlFor="outros">Outros</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="isRecurring" className="cursor-pointer">Evento Recorrente</Label>
                          <Switch
                            id="isRecurring"
                            checked={eventData.isRecurring}
                            onCheckedChange={(checked) => handleSwitchChange('isRecurring', checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ative para eventos que se repetem regularmente
                        </p>
                      </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="isPublic" className="cursor-pointer">Evento Público</Label>
                          <Switch
                            id="isPublic"
                            checked={eventData.isPublic}
                            onCheckedChange={(checked) => handleSwitchChange('isPublic', checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ative para tornar este evento visível para todos
                        </p>
                      </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="socialShare" className="cursor-pointer">Compartilhar nas Redes Sociais</Label>
                          <Switch
                            id="socialShare"
                            defaultChecked={true}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Habilite para compartilhar automaticamente após criação
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                    
                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Criando..." : "Criar Evento"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" asChild>
                      <Link to="/dashboard/events">Cancelar</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
                    
            {/* Social Share Modal */}
            {isSocialShareModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="w-full max-w-md mx-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share className="mr-2 h-5 w-5" />
                      Compartilhar Evento
                    </CardTitle>
                    <CardDescription>
                      Compartilhe seu evento nas redes sociais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {image && (
                      <img 
                        src={image} 
                        alt="Event preview" 
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="font-medium text-lg">{eventData.title || "Novo Evento"}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {eventData.description || "Sem descrição"}
                    </p>

                    <div className="flex justify-center space-x-4 pt-4">
                      <Button onClick={() => handleShare('Facebook')} className="bg-blue-600 hover:bg-blue-700">
                        <Facebook className="mr-2 h-5 w-5" />
                        Facebook
                      </Button>
                      <Button onClick={() => handleShare('Instagram')} className="bg-pink-600 hover:bg-pink-700">
                        <Instagram className="mr-2 h-5 w-5" />
                        Instagram
                      </Button>
                      <Button onClick={() => handleShare('Twitter')} className="bg-sky-500 hover:bg-sky-600">
                        <Twitter className="mr-2 h-5 w-5" />
                        Twitter
                      </Button>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsSocialShareModalOpen(false)}
                      >
                        Fechar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
