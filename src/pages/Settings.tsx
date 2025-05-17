import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Settings as SettingsIcon, User, Building, Bell, Lock, Languages, Palette, Mail, CreditCard, Check } from 'lucide-react';

const Settings = () => {
  const [churchName, setChurchName] = useState('Igreja Brasileira de Tóquio');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('pt');
  const [theme, setTheme] = useState('system');

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificações atualizadas!');
  };

  const handleSaveAppearance = () => {
    toast.success('Preferências de aparência atualizadas!');
  };

  const handleSaveBilling = () => {
    toast.success('Informações de pagamento atualizadas!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="church" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Igreja</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Plano</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" defaultValue="João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" defaultValue="joao@igreja.jp" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="Seu telefone" defaultValue="080-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input id="role" placeholder="Seu cargo" defaultValue="Pastor" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Gerencie sua senha e segurança da conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" />
                  <Label htmlFor="2fa">Ativar autenticação de dois fatores</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Alterar Senha</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Church Settings */}
          <TabsContent value="church" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Igreja</CardTitle>
                <CardDescription>
                  Gerencie as informações da sua igreja.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="church-name">Nome da Igreja</Label>
                    <Input 
                      id="church-name" 
                      placeholder="Nome da igreja" 
                      value={churchName} 
                      onChange={(e) => setChurchName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="church-email">Email de Contato</Label>
                    <Input id="church-email" type="email" placeholder="contato@igreja.jp" defaultValue="contato@igreja.jp" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="church-phone">Telefone</Label>
                    <Input id="church-phone" placeholder="Telefone da igreja" defaultValue="03-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="church-website">Website</Label>
                    <Input id="church-website" placeholder="www.suaigreja.jp" defaultValue="www.igrejatokyo.jp" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="church-address">Endereço</Label>
                  <Input id="church-address" placeholder="Endereço da igreja" defaultValue="1-2-3 Shibuya, Shibuya-ku, Tokyo 150-0002" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="church-status">Status Legal</Label>
                  <Select defaultValue="religious-corp">
                    <SelectTrigger id="church-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informal">Informal (非公式団体)</SelectItem>
                      <SelectItem value="npo">NPO (特定非営利活動法人)</SelectItem>
                      <SelectItem value="religious-corp">Corporação Religiosa (宗教法人)</SelectItem>
                      <SelectItem value="religious-org">Organização Religiosa (宗教団体)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="church-registration">Número de Registro</Label>
                  <Input id="church-registration" placeholder="Número de registro oficial" defaultValue="R-12345-Tokyo" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Notificações por Email</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-events">Eventos</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações sobre novos eventos
                        </p>
                      </div>
                      <Switch 
                        id="email-events" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-finance">Finanças</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber relatórios financeiros semanais
                        </p>
                      </div>
                      <Switch id="email-finance" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-members">Membros</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações sobre novos membros e aniversários
                        </p>
                      </div>
                      <Switch id="email-members" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Notificações Push</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-events">Eventos</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações push para eventos
                        </p>
                      </div>
                      <Switch 
                        id="push-events" 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-tasks">Tarefas</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertas sobre tarefas pendentes
                        </p>
                      </div>
                      <Switch id="push-tasks" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-messages">Mensagens</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações para novas mensagens
                        </p>
                      </div>
                      <Switch id="push-messages" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="ja">Japonês</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                      <SelectItem value="es">Espanhol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 h-12 w-12 rounded-full bg-[#eaeaea] shadow-sm" />
                        <span className="text-center text-sm font-medium">
                          Claro
                        </span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 h-12 w-12 rounded-full bg-[#262626] shadow-sm" />
                        <span className="text-center text-sm font-medium">
                          Escuro
                        </span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 h-12 w-12 rounded-full bg-gradient-to-r from-[#eaeaea] to-[#262626] shadow-sm" />
                        <span className="text-center text-sm font-medium">
                          Sistema
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAppearance}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
                <CardDescription>
                  Seu plano atual e informações de pagamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-secondary p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">Plano Advanced (宗教法人)</p>
                      <p className="text-sm text-muted-foreground">Para corporações religiosas estabelecidas</p>
                    </div>
                    <Badge>Ativo</Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                      <p className="font-medium">25/06/2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="font-medium">¥9,800 / mês</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Recursos incluídos:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Suporte completo para requisitos legais de 宗教法人
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Geração automática de documentos oficiais bilíngues
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Até 1.000 membros registrados
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Relatórios financeiros avançados
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Suporte prioritário 24/7
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Método de Pagamento</Label>
                  <div className="flex items-center space-x-2 border p-2 rounded-md bg-background">
                    <CreditCard className="h-4 w-4" />
                    <span>Visa terminando em 4242</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                <Button variant="outline" onClick={() => window.location.href = "/pricing"}>
                  Alterar Plano
                </Button>
                <Button variant="outline" onClick={handleSaveBilling}>
                  Atualizar Método de Pagamento
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
