
import { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  AlertTriangle, 
  Download, 
  Upload, 
  Search,
  Plus,
  FileCheck,
  Clock,
  Files
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from "@/hooks/use-toast";

// Mock data for document types
const documentCategories = [
  { id: 1, name: "Formação de Igrejas", count: 5 },
  { id: 2, name: "Registro 宗教法人", count: 8 },
  { id: 3, name: "Atas de Reunião", count: 12 },
  { id: 4, name: "Documentos Financeiros", count: 7 },
  { id: 5, name: "Cartas de Transferência", count: 3 },
];

// Mock data for legal requirements
const legalRequirements = [
  { 
    id: 1, 
    name: "Estatuto da Igreja", 
    category: "宗教法人", 
    status: "completed", 
    dueDate: null,
    description: "Documento que estabelece as regras e funcionamento oficial da igreja."
  },
  { 
    id: 2, 
    name: "Lista de Membros", 
    category: "宗教法人", 
    status: "completed", 
    dueDate: null,
    description: "Registro oficial de todos os membros da igreja com suas informações de contato."
  },
  { 
    id: 3, 
    name: "Registro de Atividades", 
    category: "宗教法人", 
    status: "pending", 
    dueDate: "2023-06-30",
    description: "Documento com histórico de atividades religiosas dos últimos 3 anos."
  },
  { 
    id: 4, 
    name: "Demonstrativo Financeiro", 
    category: "宗教法人", 
    status: "pending", 
    dueDate: "2023-06-15",
    description: "Balanço financeiro dos últimos 2 anos fiscais."
  },
  { 
    id: 5, 
    name: "Registro de Propriedade", 
    category: "宗教法人", 
    status: "pending", 
    dueDate: "2023-07-20",
    description: "Documentação de aluguel ou posse do local de culto."
  },
  { 
    id: 6, 
    name: "Certificado de Registro", 
    category: "宗教団体", 
    status: "not-required", 
    dueDate: null,
    description: "Certificação oficial como organização religiosa reconhecida."
  },
];

// Mock data for recent documents
const recentDocuments = [
  { 
    id: 1, 
    name: "Ata de Reunião - Maio 2023", 
    category: "Atas de Reunião", 
    uploadDate: "2023-05-15",
    language: ["PT", "JP"],
    author: "Pastor Silva",
    version: "1.2" 
  },
  { 
    id: 2, 
    name: "Relatório Financeiro Q1", 
    category: "Documentos Financeiros", 
    uploadDate: "2023-04-10",
    language: ["PT", "JP", "EN"],
    author: "Tesoureiro Tanaka",
    version: "2.0" 
  },
  { 
    id: 3, 
    name: "Carta de Transferência - Família Suzuki", 
    category: "Cartas de Transferência", 
    uploadDate: "2023-05-02",
    language: ["PT", "JP"],
    author: "Secretária Yuki",
    version: "1.0" 
  },
  { 
    id: 4, 
    name: "Plano Anual de Atividades", 
    category: "Documentos Gerais", 
    uploadDate: "2023-01-15",
    language: ["PT", "JP"],
    author: "Pastor Silva",
    version: "1.3" 
  },
  { 
    id: 5, 
    name: "Estatuto da Igreja - Atualizado", 
    category: "Formação de Igrejas", 
    uploadDate: "2022-12-20",
    language: ["PT", "JP"],
    author: "Conselho",
    version: "3.5" 
  },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const handleDownload = (documentName: string) => {
    toast({
      title: "Download iniciado",
      description: `O documento ${documentName} está sendo baixado.`,
    });
  };

  const filterDocuments = () => {
    return recentDocuments.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": 
        return <CheckSquare className="text-green-500 h-5 w-5" />;
      case "pending": 
        return <Clock className="text-orange-500 h-5 w-5" />;
      case "not-required": 
        return <FileCheck className="text-gray-400 h-5 w-5" />;
      default: 
        return <AlertTriangle className="text-red-500 h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Concluído";
      case "pending": return "Pendente";
      case "not-required": return "Não Requerido";
      default: return "Não Iniciado";
    }
  };

  const completedRequirements = legalRequirements.filter(req => req.status === "completed").length;
  const totalRequiredRequirements = legalRequirements.filter(req => req.status !== "not-required").length;
  const completionPercentage = Math.round((completedRequirements / totalRequiredRequirements) * 100);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Documentos e Legalidade</h1>
                <p className="text-gray-600">Gerencie documentos oficiais e requisitos legais para sua igreja</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <Upload size={16} className="mr-2" />
                  Importar
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Novo Documento
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Status de Formalização</CardTitle>
                  <CardDescription>Progresso dos requisitos para 宗教法人</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Requisitos Concluídos</p>
                        <p className="text-3xl font-bold">
                          {completedRequirements}/{totalRequiredRequirements}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{completionPercentage}%</p>
                        <p className="text-sm text-gray-500">completo</p>
                      </div>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Total de arquivos</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Files className="h-10 w-10 text-indigo-600" />
                  <div>
                    <p className="text-3xl font-bold">{recentDocuments.length}</p>
                    <p className="text-sm text-gray-500">documentos armazenados</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Próximo Vencimento</CardTitle>
                  <CardDescription>Documento a ser entregue</CardDescription>
                </CardHeader>
                <CardContent>
                  {legalRequirements.filter(req => req.status === "pending" && req.dueDate).length > 0 ? (
                    (() => {
                      const nextDue = [...legalRequirements]
                        .filter(req => req.status === "pending" && req.dueDate)
                        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0];
                      
                      return (
                        <div className="flex items-center">
                          <div className="mr-4 bg-orange-100 p-2 rounded-full">
                            <Clock className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{nextDue.name}</p>
                            <p className="text-xs text-gray-500">
                              Vence em {new Date(nextDue.dueDate!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center">
                      <div className="mr-4 bg-green-100 p-2 rounded-full">
                        <CheckSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm">Sem documentos pendentes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="documents" className="space-y-4">
              <TabsList>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="requirements">Requisitos Legais</TabsTrigger>
              </TabsList>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                      <div>
                        <CardTitle>Biblioteca de Documentos</CardTitle>
                        <CardDescription>Gerencie todos os documentos da sua igreja</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            type="search"
                            placeholder="Buscar documentos..."
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
                            <SelectItem value="all">Todas Categorias</SelectItem>
                            {documentCategories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome do Documento</TableHead>
                            <TableHead className="hidden md:table-cell">Categoria</TableHead>
                            <TableHead className="hidden md:table-cell">Data</TableHead>
                            <TableHead className="hidden lg:table-cell">Idiomas</TableHead>
                            <TableHead className="hidden lg:table-cell">Versão</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterDocuments().length > 0 ? (
                            filterDocuments().map((document) => (
                              <TableRow key={document.id}>
                                <TableCell className="font-medium">{document.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{document.category}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  <div className="flex gap-1">
                                    {document.language.map(lang => (
                                      <Badge key={lang} variant="outline">{lang}</Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">{document.version}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleDownload(document.name)}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                Nenhum documento encontrado.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements">
                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos Legais</CardTitle>
                    <CardDescription>
                      Documentos necessários para formalização como 宗教法人 (Organização Religiosa)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {legalRequirements.map((requirement) => (
                        <div 
                          key={requirement.id} 
                          className={`
                            p-4 rounded-lg border 
                            ${requirement.status === 'completed' ? 'bg-green-50 border-green-200' : 
                              requirement.status === 'pending' ? 'bg-orange-50 border-orange-200' : 
                              'bg-gray-50 border-gray-200'}
                          `}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              {getStatusIcon(requirement.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium">{requirement.name}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={`
                                    ${requirement.status === 'completed' ? 'bg-green-50 text-green-700' : 
                                      requirement.status === 'pending' ? 'bg-orange-50 text-orange-700' : 
                                      'bg-gray-100 text-gray-700'}
                                  `}
                                >
                                  {getStatusText(requirement.status)}
                                </Badge>
                              </div>
                              
                              {requirement.dueDate && (
                                <div className="flex items-center mt-2 text-sm">
                                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                  <span className="text-gray-500">
                                    Data limite: {new Date(requirement.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              
                              <div className="mt-3 flex gap-2">
                                {requirement.status === 'completed' ? (
                                  <>
                                    <Button variant="outline" size="sm">
                                      <FileText className="h-3 w-3 mr-2" /> Ver
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3 mr-2" /> Baixar
                                    </Button>
                                  </>
                                ) : requirement.status === 'pending' ? (
                                  <Button size="sm">
                                    <Upload className="h-3 w-3 mr-2" /> Enviar Documento
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm" disabled>
                                    Não necessário
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-2 text-yellow-500" />
                      Os requisitos podem variar de acordo com a região e tipo de organização. Consulte um especialista.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
