
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Settings as SettingsIcon, User, Building, Plus, Bell, Lock, Languages, Palette, Mail, CreditCard, Check } from 'lucide-react';


const Settings = () => {
  const [churchName, setChurchName] = useState('Igreja Brasileira de Tóquio');
  const [displayName, setDisplayName] = useState('Pr. João Silva');
  const [email, setEmail] = useState('joao.silva@igreja.org');
  const [language, setLanguage] = useState('pt-BR');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    events: true,
    members: true,
    finances: false,
  });

  const handleProfileUpdate = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleChurchUpdate = () => {
    toast.success('Informações da igreja atualizadas com sucesso!');
  };

  const handlePasswordUpdate = () => {
    toast.success('Senha atualizada com sucesso!');
  };

  const handleNotificationsUpdate = () => {
    toast.success('Preferências de notificação atualizadas!');
  };

  const handleThemeUpdate = () => {
    toast.success(`Tema alterado para ${theme === 'light' ? 'claro' : theme === 'dark' ? 'escuro' : 'sistema'}`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
                <p className="text-muted-foreground">
                  Gerencie as configurações da sua conta e da igreja
                </p>
              </div>
            </div>

            <Tabs defaultValue="profile">
              <div className="space-y-4">
                <TabsList className="grid md:grid-cols-5 grid-cols-2 gap-2 md:gap-4">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger value="church" className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Igreja
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Notificações
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Aparência
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Faturamento
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>
                      Gerencie suas informações pessoais e conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="displayName">Nome de Exibição</Label>
                          <Input
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Select defaultValue="pastor">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione seu cargo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pastor">Pastor</SelectItem>
                            <SelectItem value="lider">Líder</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="secretario">Secretário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                          placeholder="Conte um pouco sobre você..."
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Foto de perfil</h3>
                      <div className="flex items-center space-x-4">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          <img 
                            src="https://i.pravatar.cc/96?img=60" 
                            alt="Foto de perfil" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Alterar foto
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              Remover
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            JPG, GIF ou PNG. Tamanho máximo de 1MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Idioma e região</h3>

                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select
                          value={language}
                          onValueChange={setLanguage}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="es-ES">Español</SelectItem>
                            <SelectItem value="ja-JP">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso horário</Label>
                        <Select defaultValue="asia-tokyo">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um fuso horário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                            <SelectItem value="america-saopaulo">America/Sao_Paulo (GMT-3)</SelectItem>
                            <SelectItem value="america-losangeles">America/Los_Angeles (GMT-7)</SelectItem>
                            <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleProfileUpdate}>Salvar Alterações</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Segurança e Senha</CardTitle>
                    <CardDescription>
                      Atualize sua senha e gerencie as configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="new-password">Nova Senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handlePasswordUpdate}>Atualizar Senha</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="church" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Igreja</CardTitle>
                    <CardDescription>
                      Atualize as informações principais da igreja
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="churchName">Nome da Igreja</Label>
                          <Input
                            id="churchName"
                            value={churchName}
                            onChange={(e) => setChurchName(e.target.value)}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="denomination">Denominação</Label>
                          <Input
                            id="denomination"
                            defaultValue="Batista"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          defaultValue="Rua Sakura, 123, Shinjuku, Tóquio, Japão"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="churchEmail">Email</Label>
                          <Input
                            id="churchEmail"
                            type="email"
                            defaultValue="contato@igrejatokyo.jp"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="churchPhone">Telefone</Label>
                          <Input
                            id="churchPhone"
                            defaultValue="+81 90-1234-5678"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Site</Label>
                        <Input
                          id="website"
                          defaultValue="www.igrejatokyo.jp"
                        />
                      </div>

                      <div>
                        <Label htmlFor="about">Sobre a Igreja</Label>
                        <textarea
                          id="about"
                          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm mt-2 resize-none"
                          defaultValue="A Igreja Brasileira de Tóquio é uma comunidade dedicada a servir brasileiros e outros imigrantes latinos no Japão. Fundada em 2010, nossa missão é proporcionar um lar espiritual longe de casa."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Logo da Igreja</Label>
                        <div className="flex items-center space-x-4">
                          <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            <img 
                              src="https://placehold.co/80x80/f1f5f9/475569?text=Logo" 
                              alt="Logo da igreja" 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Alterar logo
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive">
                                Remover
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG ou SVG. Resolução recomendada 512x512px.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Redes Sociais</h3>

                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          defaultValue="fb.com/igrejatokyo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          defaultValue="instagram.com/igrejatokyo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input
                          id="youtube"
                          defaultValue="youtube.com/igrejatokyo"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleChurchUpdate}>Salvar Alterações</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Escolha como e quando deseja receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email_notifications">Notificações por Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba atualizações importantes por email
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label
                            htmlFor="email_notifications"
                            className="cursor-pointer"
                          >
                            {notifications.email ? "Ativado" : "Desativado"}
                          </Label>
                          <input 
                            type="checkbox"
                            id="email_notifications"
                            className="sr-only"
                            checked={notifications.email}
                            onChange={() => setNotifications({...notifications, email: !notifications.email})}
                          />
                          <div
                            onClick={() => setNotifications({...notifications, email: !notifications.email})}
                            className={`${
                              notifications.email ? "bg-primary" : "bg-input"
                            } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
                          >
                            <span
                              className={`${
                                notifications.email ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 rounded-full bg-background transition`}
                            />
                          </div>
                        </div>
                      </div>
                            
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="app_notifications">Notificações no Aplicativo</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações na plataforma enquanto estiver online
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label
                            htmlFor="app_notifications"
                            className="cursor-pointer"
                          >
                            {notifications.app ? "Ativado" : "Desativado"}
                          </Label>
                          <input 
                            type="checkbox"
                            id="app_notifications"
                            className="sr-only"
                            checked={notifications.app}
                            onChange={() => setNotifications({...notifications, app: !notifications.app})}
                          />
                          <div
                            onClick={() => setNotifications({...notifications, app: !notifications.app})}
                            className={`${
                              notifications.app ? "bg-primary" : "bg-input"
                            } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
                          >
                            <span
                              className={`${
                                notifications.app ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 rounded-full bg-background transition`}
                            />
                          </div>
                        </div>
                      </div>
                            
                      <Separator className="my-4" />
                            
                      <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                            
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Eventos</Label>
                            <p className="text-sm text-muted-foreground">
                              Novos eventos, lembretes e alterações
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id="events_notifications"
                              className="sr-only"
                              checked={notifications.events}
                              onChange={() => setNotifications({...notifications, events: !notifications.events})}
                            />
                            <div
                              onClick={() => setNotifications({...notifications, events: !notifications.events})}
                              className={`${
                                notifications.events ? "bg-primary" : "bg-input"
                              } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
                            >
                              <span
                                className={`${
                                  notifications.events ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 rounded-full bg-background transition`}
                              />
                            </div>
                          </div>
                        </div>
                              
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Membros</Label>
                            <p className="text-sm text-muted-foreground">
                              Novos membros, aniversários e atualizações
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id="members_notifications"
                              className="sr-only"
                              checked={notifications.members}
                              onChange={() => setNotifications({...notifications, members: !notifications.members})}
                            />
                            <div
                              onClick={() => setNotifications({...notifications, members: !notifications.members})}
                              className={`${
                                notifications.members ? "bg-primary" : "bg-input"
                              } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
                            >
                              <span
                                className={`${
                                  notifications.members ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 rounded-full bg-background transition`}
                              />
                            </div>
                          </div>
                        </div>
                              
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Finanças</Label>
                            <p className="text-sm text-muted-foreground">
                              Relatórios financeiros e doações
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id="finances_notifications"
                              className="sr-only"
                              checked={notifications.finances}
                              onChange={() => setNotifications({...notifications, finances: !notifications.finances})}
                            />
                            <div
                              onClick={() => setNotifications({...notifications, finances: !notifications.finances})}
                              className={`${
                                notifications.finances ? "bg-primary" : "bg-input"
                              } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
                            >
                              <span
                                className={`${
                                  notifications.finances ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 rounded-full bg-background transition`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                              
                    </div>
                              
                    <div className="flex justify-end">
                      <Button onClick={handleNotificationsUpdate}>Salvar Preferências</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
                              
              <TabsContent value="appearance" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>
                      Personalize a aparência do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tema</h3>
                      <RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="light"
                            id="theme-light"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 rounded-md bg-[#f6f8fa] border border-muted p-2 w-full h-32 flex flex-col">
                              <div className="bg-primary h-3 w-full rounded-sm mb-2" />
                              <div className="bg-muted h-3 w-full rounded-sm mb-2" />
                              <div className="bg-muted h-3 w-2/3 rounded-sm" />
                            </div>
                            <div className="flex items-center justify-between w-full">
                              <span>Claro</span>
                              {theme === "light" && (
                                <Check className="h-4 w-4" />
                              )}
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="dark"
                            id="theme-dark"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 rounded-md bg-slate-950 border border-slate-800 p-2 w-full h-32 flex flex-col">
                              <div className="bg-primary h-3 w-full rounded-sm mb-2" />
                              <div className="bg-slate-800 h-3 w-full rounded-sm mb-2" />
                              <div className="bg-slate-800 h-3 w-2/3 rounded-sm" />
                            </div>
                            <div className="flex items-center justify-between w-full">
                              <span>Escuro</span>
                              {theme === "dark" && (
                                <Check className="h-4 w-4" />
                              )}
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="system"
                            id="theme-system"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 rounded-md bg-gradient-to-r from-[#f6f8fa] to-slate-950 border border-muted p-2 w-full h-32 flex flex-col">
                              <div className="bg-primary h-3 w-full rounded-sm mb-2" />
                              <div className="bg-gradient-to-r from-muted to-slate-800 h-3 w-full rounded-sm mb-2" />
                              <div className="bg-gradient-to-r from-muted to-slate-800 h-3 w-2/3 rounded-sm" />
                            </div>
                            <div className="flex items-center justify-between w-full">
                              <span>Sistema</span>
                              {theme === "system" && (
                                <Check className="h-4 w-4" />
                              )}
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                            
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Cor do Tema</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-primary border cursor-pointer ring-2 ring-primary" />
                          <span className="text-xs">Padrão</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-blue-600 border cursor-pointer" />
                          <span className="text-xs">Azul</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-green-600 border cursor-pointer" />
                          <span className="text-xs">Verde</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-purple-600 border cursor-pointer" />
                          <span className="text-xs">Roxo</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-pink-600 border cursor-pointer" />
                          <span className="text-xs">Rosa</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-orange-600 border cursor-pointer" />
                          <span className="text-xs">Laranja</span>
                        </div>
                      </div>
                    </div>
                            
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Fonte</h3>
                      <RadioGroup defaultValue="default" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem
                            value="default"
                            id="font-default"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-default"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 w-full font-sans">
                              <p className="text-lg font-medium">Sans Serif</p>
                              <p className="text-sm text-muted-foreground">Interface simples e limpa</p>
                            </div>
                            <Check className="h-4 w-4" />
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="serif"
                            id="font-serif"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-serif"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 w-full font-serif">
                              <p className="text-lg font-medium">Serif</p>
                              <p className="text-sm text-muted-foreground">Aspecto tradicional</p>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="mono"
                            id="font-mono"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="font-mono"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-4 w-full font-mono">
                              <p className="text-lg font-medium">Mono</p>
                              <p className="text-sm text-muted-foreground">Espaçamento uniforme</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                            
                    <div className="flex justify-end">
                      <Button onClick={handleThemeUpdate}>Salvar Aparência</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
                            
              <TabsContent value="billing" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Plano e Faturamento</CardTitle>
                    <CardDescription>
                      Gerencie sua assinatura e métodos de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Plano Atual</h3>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xl font-bold">Plano Igreja Médio</h4>
                              <Badge variant="secondary">Anual</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Faturado anualmente - Próximo pagamento em 15/01/2026
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">Mudar de Plano</Button>
                            <Button variant="outline" className="text-destructive">Cancelar Plano</Button>
                          </div>
                        </div>
                            
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <div className="border border-primary/20 rounded-md p-3 bg-background">
                            <h5 className="font-medium mb-1">Membros</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">75 de 100</span>
                              <span className="text-sm">75%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div className="border border-primary/20 rounded-md p-3 bg-background">
                            <h5 className="font-medium mb-1">Armazenamento</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">5.2GB de 10GB</span>
                              <span className="text-sm">52%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '52%' }}></div>
                            </div>
                          </div>
                          <div className="border border-primary/20 rounded-md p-3 bg-background">
                            <h5 className="font-medium mb-1">Usuários</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">3 de 5</span>
                              <span className="text-sm">60%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                            
                    <Separator />
                            
                    <div>
                      <h3 className="text-lg font-medium mb-4">Métodos de Pagamento</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-md">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Visa terminando em 4242</p>
                              <p className="text-sm text-muted-foreground">Expira em 10/2025</p>
                            </div>
                          </div>
                          <Badge>Padrão</Badge>
                        </div>
                            
                        <div className="flex items-center justify-between border rounded-md p-3 border-dashed">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-md">
                              <Plus className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">Adicionar novo método de pagamento</p>
                          </div>
                          <Button variant="ghost" size="sm">Adicionar</Button>
                        </div>
                      </div>
                    </div>
                            
                    <Separator />
                            
                    <div>
                      <h3 className="text-lg font-medium mb-4">Histórico de Faturamento</h3>
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-3 border-b">
                          <div>
                            <p className="font-medium">Fatura #INV-2023-001</p>
                            <p className="text-sm text-muted-foreground">15/01/2025</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Pago</Badge>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border-b">
                          <div>
                            <p className="font-medium">Fatura #INV-2022-001</p>
                            <p className="text-sm text-muted-foreground">15/01/2024</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Pago</Badge>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">Fatura #INV-2021-001</p>
                            <p className="text-sm text-muted-foreground">15/01/2023</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Pago</Badge>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                      </div>
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

export default Settings;
