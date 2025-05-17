
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact as ContactIcon, Mail, MapPin, Phone, Globe, Facebook, Instagram, Youtube, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const churchInfo = {
    name: 'Igreja Brasileira de Tóquio',
    address: 'Rua Sakura, 123, Shinjuku, Tóquio, Japão',
    phone: '+81 90-1234-5678',
    email: 'contato@igrejatokyo.jp',
    website: 'www.igrejatokyo.jp',
    social: {
      facebook: 'fb.com/igrejatokyo',
      instagram: 'instagram.com/igrejatokyo',
      youtube: 'youtube.com/igrejatokyo'
    },
    services: [
      { day: 'Domingo', time: '10:00 - 12:00', name: 'Culto Dominical' },
      { day: 'Quarta-feira', time: '19:30 - 21:00', name: 'Estudo Bíblico' },
      { day: 'Sexta-feira', time: '20:00 - 21:30', name: 'Culto de Jovens' }
    ]
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Contato</h2>
                <p className="text-muted-foreground mt-1">
                  Informações de contato da igreja e formulário para mensagens
                </p>
              </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="form">Mensagem</TabsTrigger>
                <TabsTrigger value="management">Gerenciamento</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ContactIcon className="mr-2 h-5 w-5" />
                        Informações de Contato
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{churchInfo.name}</p>
                            <p className="text-muted-foreground">{churchInfo.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                          <p>{churchInfo.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                          <p>{churchInfo.email}</p>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                          <p>{churchInfo.website}</p>
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <p className="font-medium mb-3">Redes Sociais</p>
                          <div className="flex space-x-4">
                            <Button variant="outline" size="icon" asChild>
                              <a href={`https://${churchInfo.social.facebook}`} target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <a href={`https://${churchInfo.social.instagram}`} target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <a href={`https://${churchInfo.social.youtube}`} target="_blank" rel="noopener noreferrer">
                                <Youtube className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Horários de Cultos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {churchInfo.services.map((service, index) => (
                          <div key={index} className="flex justify-between items-center pb-3 border-b last:border-0">
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-muted-foreground text-sm">{service.day}</p>
                            </div>
                            <p className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {service.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                      
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Localização</CardTitle>
                      <CardDescription>Localização da Igreja Brasileira de Tóquio</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] bg-gray-100 flex items-center justify-center">
                      {/* Em uma implementação real, aqui seria integrado um mapa */}
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-30" />
                        <p>Mapa de localização da igreja</p>
                        <p className="text-sm">Rua Sakura, 123, Shinjuku, Tóquio, Japão</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
                      
              <TabsContent value="form">
                <Card>
                  <CardHeader>
                    <CardTitle>Envie uma Mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo para entrar em contato conosco
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Assunto da mensagem"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Digite sua mensagem aqui..."
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
                      
              <TabsContent value="management">
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciamento de Contatos</CardTitle>
                    <CardDescription>
                      Atualize as informações de contato da igreja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Informações Básicas</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="church-name">Nome da Igreja</Label>
                            <Input
                              id="church-name"
                              defaultValue={churchInfo.name}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="church-phone">Telefone</Label>
                            <Input
                              id="church-phone"
                              defaultValue={churchInfo.phone}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="church-address">Endereço</Label>
                          <Input
                            id="church-address"
                            defaultValue={churchInfo.address}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="church-email">Email</Label>
                            <Input
                              id="church-email"
                              type="email"
                              defaultValue={churchInfo.email}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="church-website">Website</Label>
                            <Input
                              id="church-website"
                              defaultValue={churchInfo.website}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Redes Sociais</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="social-facebook">Facebook</Label>
                            <Input
                              id="social-facebook"
                              defaultValue={churchInfo.social.facebook}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="social-instagram">Instagram</Label>
                            <Input
                              id="social-instagram"
                              defaultValue={churchInfo.social.instagram}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="social-youtube">YouTube</Label>
                            <Input
                              id="social-youtube"
                              defaultValue={churchInfo.social.youtube}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Configurações salvas",
                            description: "As informações de contato foram atualizadas com sucesso.",
                          });
                        }}
                      >
                        Salvar Alterações
                      </Button>
                    </form>
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

export default Contact;
