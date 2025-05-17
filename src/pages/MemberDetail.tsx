
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Heart, 
  Users,
  DollarSign, 
  BookOpen,
  Download,
  ArrowLeft
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

const MemberDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for the member
  const member = {
    id,
    name: "Takashi Yamada",
    portrait: "",
    status: "active",
    joinDate: "2020-05-15",
    email: "takashi.yamada@example.com",
    phone: "+81 90-1234-5678",
    address: "東京都新宿区西新宿2-8-1",
    birthdate: "1985-07-22",
    family: [
      { name: "Yuki Yamada", relation: "Esposa", id: "2" },
      { name: "Hiro Yamada", relation: "Filho", id: "3" },
      { name: "Aiko Yamada", relation: "Filha", id: "4" }
    ],
    sacraments: [
      { type: "Batismo", date: "2015-06-12", officiant: "Pastor José Silva", notes: "Batismo por imersão" },
      { type: "Casamento", date: "2012-09-08", officiant: "Pastor Hiroshi Tanaka", notes: "Cerimônia na Igreja Central" }
    ],
    notes: "Participa ativamente do ministério de louvor. Toca piano e violão.",
    contributions: [
      { date: "2023-05-01", type: "Dízimo", amount: 25000 },
      { date: "2023-04-01", type: "Dízimo", amount: 25000 },
      { date: "2023-03-01", type: "Dízimo", amount: 25000 },
      { date: "2023-02-01", type: "Oferta", amount: 10000 }
    ],
    attendance: [
      { event: "Culto Dominical", date: "2023-05-14", present: true },
      { event: "Culto Dominical", date: "2023-05-07", present: true },
      { event: "Estudo Bíblico", date: "2023-05-03", present: false },
      { event: "Culto Dominical", date: "2023-04-30", present: true }
    ],
    courses: [
      { name: "Fundamentos da Fé", status: "Concluído", completionDate: "2016-03-15" },
      { name: "Liderança Cristã", status: "Em andamento", progress: 75 },
      { name: "Estudo do Antigo Testamento", status: "Planejado" }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      case "visitor": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Button variant="outline" asChild className="mb-4">
                <Link to="/dashboard/members">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para lista de membros
                </Link>
              </Button>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={member.portrait} alt={member.name} />
                    <AvatarFallback className="text-lg">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)} mr-2`}></div>
                      <span className="text-gray-600 capitalize">{member.status}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-600">Membro desde {new Date(member.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button>Cartão de Membro</Button>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="family">Família</TabsTrigger>
                <TabsTrigger value="sacraments">Sacramentos</TabsTrigger>
                <TabsTrigger value="contributions">Contribuições</TabsTrigger>
                <TabsTrigger value="attendance">Frequência</TabsTrigger>
                <TabsTrigger value="courses">Cursos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Nascimento: {new Date(member.birthdate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                        <span>{member.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Família</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {member.family.length > 0 ? (
                        <ul className="space-y-2">
                          {member.family.map((familyMember, index) => (
                            <li key={index}>
                              <Link to={`/dashboard/members/${familyMember.id}`} className="flex items-center hover:bg-gray-50 p-2 rounded-md">
                                <Users className="h-4 w-4 text-gray-500 mr-2" />
                                <div>
                                  <div className="font-medium">{familyMember.name}</div>
                                  <div className="text-sm text-gray-500">{familyMember.relation}</div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">Nenhum familiar registrado.</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sacramentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {member.sacraments.length > 0 ? (
                        <ul className="space-y-3">
                          {member.sacraments.map((sacrament, index) => (
                            <li key={index} className="border-b pb-3 last:border-0 last:pb-0">
                              <div className="font-medium flex items-center">
                                <Heart className="h-4 w-4 text-gray-500 mr-2" />
                                {sacrament.type}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {new Date(sacrament.date).toLocaleDateString()} • {sacrament.officiant}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">Nenhum sacramento registrado.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{member.notes || "Nenhuma nota registrada."}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="family">
                <Card>
                  <CardHeader>
                    <CardTitle>Família</CardTitle>
                    <CardDescription>Membros da família e suas relações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.family.length > 0 ? (
                      <div className="space-y-6">
                        {member.family.map((familyMember, index) => (
                          <div key={index} className="flex items-start border-b last:border-0 pb-4">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback>{getInitials(familyMember.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-lg">{familyMember.name}</h3>
                                <Badge variant="outline">{familyMember.relation}</Badge>
                              </div>
                              <Link to={`/dashboard/members/${familyMember.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm">
                                Ver detalhes
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhum familiar registrado</h3>
                        <p className="text-gray-500">Adicione informações de familiares para este membro.</p>
                        <Button className="mt-4">Adicionar Familiar</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sacraments">
                <Card>
                  <CardHeader>
                    <CardTitle>Sacramentos</CardTitle>
                    <CardDescription>Registro de batismo, casamento e outros sacramentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.sacraments.length > 0 ? (
                      <div className="space-y-6">
                        {member.sacraments.map((sacrament, index) => (
                          <div key={index} className="bg-white rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-lg">{sacrament.type}</h3>
                              <Badge variant="outline">{new Date(sacrament.date).toLocaleDateString()}</Badge>
                            </div>
                            <p className="text-gray-600">Ministrado por: {sacrament.officiant}</p>
                            {sacrament.notes && (
                              <>
                                <Separator className="my-2" />
                                <p className="text-gray-600">{sacrament.notes}</p>
                              </>
                            )}
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm">Editar</Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" /> Certificado
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhum sacramento registrado</h3>
                        <p className="text-gray-500">Adicione registros de sacramentos para este membro.</p>
                        <Button className="mt-4">Adicionar Sacramento</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contributions">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribuições</CardTitle>
                    <CardDescription>Histórico de dízimos e ofertas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.contributions.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Data</th>
                              <th className="text-left py-3 px-4">Tipo</th>
                              <th className="text-right py-3 px-4">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {member.contributions.map((contribution, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="py-3 px-4">{new Date(contribution.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{contribution.type}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(contribution.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t">
                              <td className="py-3 px-4 font-medium" colSpan={2}>Total</td>
                              <td className="py-3 px-4 text-right font-medium">
                                {formatCurrency(member.contributions.reduce((sum, item) => sum + item.amount, 0))}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhuma contribuição registrada</h3>
                        <p className="text-gray-500">Registre dízimos e ofertas deste membro.</p>
                        <Button className="mt-4">Adicionar Contribuição</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attendance">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequência</CardTitle>
                    <CardDescription>Histórico de presença em cultos e eventos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.attendance.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Evento</th>
                              <th className="text-left py-3 px-4">Data</th>
                              <th className="text-center py-3 px-4">Presença</th>
                            </tr>
                          </thead>
                          <tbody>
                            {member.attendance.map((record, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="py-3 px-4">{record.event}</td>
                                <td className="py-3 px-4">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-center">
                                  {record.present ? (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Presente</Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Ausente</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhuma frequência registrada</h3>
                        <p className="text-gray-500">Registre a presença deste membro em eventos.</p>
                        <Button className="mt-4">Registrar Frequência</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Cursos e Discipulado</CardTitle>
                    <CardDescription>Formação e capacitação do membro</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {member.courses.length > 0 ? (
                      <div className="space-y-6">
                        {member.courses.map((course, index) => (
                          <div key={index} className="bg-white rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-lg">{course.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={
                                  course.status === "Concluído" 
                                    ? "bg-green-50 text-green-700 border-green-200" 
                                    : course.status === "Em andamento" 
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
                                }
                              >
                                {course.status}
                              </Badge>
                            </div>
                            {course.completionDate && (
                              <p className="text-gray-600">Concluído em: {new Date(course.completionDate).toLocaleDateString()}</p>
                            )}
                            {course.progress !== undefined && (
                              <div className="mt-2">
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>Progresso</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            {course.status === "Concluído" && (
                              <div className="mt-4">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" /> Certificado
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhum curso registrado</h3>
                        <p className="text-gray-500">Registre cursos e treinamentos para este membro.</p>
                        <Button className="mt-4">Adicionar Curso</Button>
                      </div>
                    )}
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

export default MemberDetail;
