
import { useState } from 'react';
import { 
  BarChart as BarChartIcon, 
  Download, 
  Calendar, 
  Mail, 
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  User,
  DollarSign
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from '@/components/DashboardSidebar';

// Mock data for attendance reports
const attendanceData = [
  { month: 'Jan', adultos: 105, jovens: 40, criancas: 30, online: 15, total: 190 },
  { month: 'Fev', adultos: 110, jovens: 42, criancas: 28, online: 18, total: 198 },
  { month: 'Mar', adultos: 115, jovens: 45, criancas: 32, online: 20, total: 212 },
  { month: 'Abr', adultos: 108, jovens: 40, criancas: 30, online: 25, total: 203 },
  { month: 'Mai', adultos: 120, jovens: 48, criancas: 35, online: 22, total: 225 },
];

// Mock data for financial reports
const financialData = [
  { month: 'Jan', receitas: 850000, despesas: 720000, dizimos: 650000, ofertas: 200000 },
  { month: 'Fev', receitas: 880000, despesas: 730000, dizimos: 670000, ofertas: 210000 },
  { month: 'Mar', receitas: 920000, despesas: 750000, dizimos: 700000, ofertas: 220000 },
  { month: 'Abr', receitas: 900000, despesas: 740000, dizimos: 690000, ofertas: 210000 },
  { month: 'Mai', receitas: 950000, despesas: 760000, dizimos: 720000, ofertas: 230000 },
];

// Mock data for growth reports
const membershipData = [
  { month: 'Jan', total: 155, novos: 5, transferidos: 0, afastados: 2 },
  { month: 'Fev', total: 160, novos: 7, transferidos: 0, afastados: 0 },
  { month: 'Mar', total: 168, novos: 8, transferidos: 2, afastados: 2 },
  { month: 'Abr', total: 175, novos: 9, transferidos: 0, afastados: 2 },
  { month: 'Mai', total: 185, novos: 12, transferidos: 0, afastados: 2 },
];

// Mock data for ministry distribution
const ministryData = [
  { name: 'Louvor', value: 18 },
  { name: 'Infantil', value: 15 },
  { name: 'Mídia', value: 9 },
  { name: 'Recepção', value: 12 },
  { name: 'Intercessão', value: 8 },
  { name: 'Estudos', value: 6 },
];

// Mock data for countries distribution
const countryData = [
  { name: 'Brasil', value: 89 },
  { name: 'Japão', value: 52 },
  { name: 'Peru', value: 18 },
  { name: 'Bolívia', value: 14 },
  { name: 'Portugal', value: 8 },
  { name: 'Outros', value: 4 },
];

// Colors for charts
const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportLang, setReportLang] = useState('pt');
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Relatório sendo gerado",
      description: "O relatório será baixado em alguns instantes.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Relatórios e Estatísticas</h1>
                <p className="text-gray-600">Dados e métricas sobre a igreja</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <Select
                  value={timeRange}
                  onValueChange={setTimeRange}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Mês</SelectItem>
                    <SelectItem value="3months">3 Meses</SelectItem>
                    <SelectItem value="6months">6 Meses</SelectItem>
                    <SelectItem value="1year">1 Ano</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={reportLang}
                  onValueChange={setReportLang}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="jp">日本語</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center" onClick={handleDownloadReport}>
                  <Download size={16} className="mr-2" />
                  Exportar
                </Button>
                <Button className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  Enviar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Presentes no último domingo</p>
                      <p className="text-3xl font-bold mt-1">225</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Users size={24} className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+10.8%</span>
                    <span className="text-gray-500 ml-1">vs. média anterior</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total de Membros</p>
                      <p className="text-3xl font-bold mt-1">185</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <User size={24} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+5.7%</span>
                    <span className="text-gray-500 ml-1">vs. 3 meses atrás</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Receita Mensal</p>
                      <p className="text-3xl font-bold mt-1">¥950,000</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign size={24} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+5.5%</span>
                    <span className="text-gray-500 ml-1">vs. mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="attendance" className="space-y-6">
              <TabsList>
                <TabsTrigger value="attendance">Frequência</TabsTrigger>
                <TabsTrigger value="financial">Finanças</TabsTrigger>
                <TabsTrigger value="growth">Crescimento</TabsTrigger>
                <TabsTrigger value="demographics">Perfil</TabsTrigger>
              </TabsList>
              
              <TabsContent value="attendance">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Frequência por Categoria</CardTitle>
                      <CardDescription>Frequência média de presença nos cultos por mês</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={attendanceData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value} pessoas`} />
                            <Legend />
                            <Bar dataKey="adultos" name="Adultos" stackId="a" fill="#6366f1" />
                            <Bar dataKey="jovens" name="Jovens" stackId="a" fill="#ec4899" />
                            <Bar dataKey="criancas" name="Crianças" stackId="a" fill="#8b5cf6" />
                            <Bar dataKey="online" name="Online" stackId="a" fill="#0ea5e9" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Tendência de Frequência</CardTitle>
                      <CardDescription>Total de presentes nos últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={attendanceData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value} pessoas`} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="total" 
                              name="Total de Presentes"
                              stroke="#6366f1" 
                              strokeWidth={2} 
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequência por Dia</CardTitle>
                      <CardDescription>Comparativo entre os dias da semana</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: 'Dom', presentes: 225 },
                              { day: 'Qua', presentes: 85 },
                              { day: 'Sex', presentes: 65 },
                              { day: 'Sáb', presentes: 40 }
                            ]}
                            layout="vertical"
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="day" type="category" />
                            <Tooltip formatter={(value) => `${value} pessoas`} />
                            <Bar dataKey="presentes" name="Presentes" fill="#6366f1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="financial">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Receitas e Despesas</CardTitle>
                      <CardDescription>Fluxo financeiro nos últimos meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={financialData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey="receitas" name="Receitas" fill="#10b981" />
                            <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Composição das Receitas</CardTitle>
                      <CardDescription>Dízimos e ofertas nos últimos meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={financialData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="dizimos" 
                              name="Dízimos" 
                              stroke="#6366f1" 
                              strokeWidth={2} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="ofertas" 
                              name="Ofertas" 
                              stroke="#ec4899" 
                              strokeWidth={2} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Saldo Mensal</CardTitle>
                      <CardDescription>Diferença entre receitas e despesas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={financialData.map(item => ({
                              month: item.month,
                              saldo: item.receitas - item.despesas
                            }))}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Bar 
                              dataKey="saldo" 
                              name="Saldo" 
                              fill="#10b981"
                              radius={[4, 4, 0, 0]} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="growth">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Crescimento da Membresia</CardTitle>
                      <CardDescription>Evolução do número de membros</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={membershipData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="total" 
                              name="Total de Membros" 
                              stroke="#6366f1" 
                              strokeWidth={3}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Novos Membros</CardTitle>
                      <CardDescription>Conversões e batismos por mês</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={membershipData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar 
                              dataKey="novos" 
                              name="Novos Membros" 
                              fill="#6366f1" 
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Movimentação de Membros</CardTitle>
                      <CardDescription>Fluxo de entrada e saída</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={membershipData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="novos" name="Novos" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="transferidos" name="Transferidos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="afastados" name="Afastados" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="demographics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Ministério</CardTitle>
                      <CardDescription>Voluntários por área de atuação</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={ministryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {ministryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} pessoas`} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por País</CardTitle>
                      <CardDescription>Nacionalidade dos membros</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={countryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {countryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} pessoas`} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Informações Demográficas</CardTitle>
                      <CardDescription>Perfil dos membros da igreja</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Gênero</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <div className="text-2xl font-bold">55%</div>
                                <div className="text-gray-500">Feminino</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">45%</div>
                                <div className="text-gray-500">Masculino</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Idade</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <div className="text-2xl font-bold">22%</div>
                                <div className="text-gray-500">&lt; 18</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">58%</div>
                                <div className="text-gray-500">18-50</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">20%</div>
                                <div className="text-gray-500">&gt; 50</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Estado Civil</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <div className="text-2xl font-bold">62%</div>
                                <div className="text-gray-500">Casados</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">38%</div>
                                <div className="text-gray-500">Solteiros</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Tempo na Igreja</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <div className="text-2xl font-bold">25%</div>
                                <div className="text-gray-500">&lt; 1 ano</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">45%</div>
                                <div className="text-gray-500">1-5 anos</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">30%</div>
                                <div className="text-gray-500">&gt; 5 anos</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Relatórios Personalizados</CardTitle>
                      <CardDescription>Gere relatórios com diferentes combinações de dados</CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button>
                        <FileText size={16} className="mr-2" />
                        Novo Relatório
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium text-lg">Relatório Mensal Consolidado</h3>
                        <p className="text-gray-500 text-sm">Inclui dados financeiros e de frequência</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Select defaultValue="pt">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt">PT</SelectItem>
                            <SelectItem value="jp">JP</SelectItem>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="es">ES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">Visualizar</Button>
                        <Button onClick={handleDownloadReport}>Baixar</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium text-lg">Relatório Financeiro Detalhado</h3>
                        <p className="text-gray-500 text-sm">Relatório detalhado de receitas e despesas</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Select defaultValue="pt">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt">PT</SelectItem>
                            <SelectItem value="jp">JP</SelectItem>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="es">ES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">Visualizar</Button>
                        <Button onClick={handleDownloadReport}>Baixar</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium text-lg">Relatório de Crescimento</h3>
                        <p className="text-gray-500 text-sm">Análise de crescimento e retenção de membros</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Select defaultValue="pt">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt">PT</SelectItem>
                            <SelectItem value="jp">JP</SelectItem>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="es">ES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">Visualizar</Button>
                        <Button onClick={handleDownloadReport}>Baixar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between flex-wrap">
                  <p className="text-sm text-gray-500">
                    Todos os relatórios estão disponíveis em formato PDF e Excel
                  </p>
                  <div className="flex mt-4 md:mt-0">
                    <Button variant="outline" className="mr-2">
                      <Calendar size={16} className="mr-2" /> Programar
                    </Button>
                    <Button variant="outline">
                      <Mail size={16} className="mr-2" /> Enviar para Diretoria
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
