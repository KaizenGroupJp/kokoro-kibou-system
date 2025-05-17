import { useState } from 'react';
import { 
  User, 
  Building,
  Home as HomeIcon,
  Monitor,
  BookOpen,
  Music,
  Video,
  FileText,
  Package, 
  Truck,
  Clock,
  Calendar,
  Search,
  QrCode,
  Plus,
  ShoppingBag,
  ArrowUpDown,
  MapPin,
  Tag,
  Users
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardSidebar from '@/components/DashboardSidebar';

// Mock data for properties
const properties = [
  {
    id: 1,
    name: "Igreja Principal",
    type: "Templo",
    address: "東京都新宿区西新宿2-8-1",
    size: "150m²",
    status: "owned",
    capacity: 120,
    monthlyExpense: 250000,
    lastMaintenance: "2023-03-15"
  },
  {
    id: 2,
    name: "Centro Comunitário",
    type: "Escritório",
    address: "東京都新宿区西新宿2-5-10",
    size: "80m²",
    status: "rented",
    capacity: 30,
    monthlyExpense: 120000,
    lastMaintenance: "2023-04-22"
  },
  {
    id: 3,
    name: "Casa Pastoral",
    type: "Residência",
    address: "東京都中野区中野5-1-1",
    size: "95m²",
    status: "rented",
    capacity: 5,
    monthlyExpense: 180000,
    lastMaintenance: "2023-02-10"
  }
];

// Mock data for assets/equipment
const assets = [
  {
    id: 1,
    name: "Sistema de Som Principal",
    category: "Equipamento",
    location: "Igreja Principal",
    purchaseDate: "2021-06-15",
    value: 850000,
    status: "active",
    nextMaintenance: "2023-06-15",
    qrCode: true
  },
  {
    id: 2,
    name: "Projetor Sony VPL-FHZ75",
    category: "Equipamento",
    location: "Igreja Principal",
    purchaseDate: "2022-01-10",
    value: 320000,
    status: "active",
    nextMaintenance: "2023-07-10",
    qrCode: true
  },
  {
    id: 3,
    name: "Mesa de Som Digital Yamaha TF3",
    category: "Equipamento",
    location: "Igreja Principal",
    purchaseDate: "2021-08-22",
    value: 450000,
    status: "active",
    nextMaintenance: "2023-08-22",
    qrCode: true
  },
  {
    id: 4,
    name: "Notebook Dell Inspiron 15",
    category: "Eletrônicos",
    location: "Centro Comunitário",
    purchaseDate: "2022-03-05",
    value: 120000,
    status: "active",
    nextMaintenance: null,
    qrCode: true
  },
  {
    id: 5,
    name: "Violão Yamaha C40",
    category: "Instrumento",
    location: "Igreja Principal",
    purchaseDate: "2021-01-15",
    value: 25000,
    status: "maintenance",
    nextMaintenance: "2023-05-30",
    qrCode: true
  },
  {
    id: 6,
    name: "Bateria Acústica Pearl Export",
    category: "Instrumento",
    location: "Igreja Principal",
    purchaseDate: "2020-12-10",
    value: 180000,
    status: "active",
    nextMaintenance: "2023-06-10",
    qrCode: true
  },
  {
    id: 7,
    name: "Cadeiras de Auditório (50 unidades)",
    category: "Mobília",
    location: "Igreja Principal",
    purchaseDate: "2020-10-05",
    value: 250000,
    status: "active",
    nextMaintenance: null,
    qrCode: false
  }
];

// Mock data for borrowed assets
const borrowedAssets = [
  {
    id: 1,
    assetName: "Notebook Dell Inspiron 15",
    borrower: "Pastor Tanaka",
    borrowDate: "2023-05-01",
    returnDate: "2023-05-20",
    purpose: "Preparação de Sermões",
    status: "active"
  },
  {
    id: 2,
    assetName: "Microfone Shure SM58",
    borrower: "Ministério de Música",
    borrowDate: "2023-05-10",
    returnDate: "2023-05-12",
    purpose: "Ensaio Externo",
    status: "returned"
  },
  {
    id: 3,
    assetName: "Projetor Portátil",
    borrower: "Ministério Jovem",
    borrowDate: "2023-05-15",
    returnDate: "2023-05-17",
    purpose: "Retiro de Jovens",
    status: "active"
  }
];

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    // @ts-ignore - Dynamic property access
    const aValue = a[sortColumn];
    // @ts-ignore - Dynamic property access
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue < bValue ? 1 : -1);
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Ativo</Badge>;
      case "maintenance":
        return <Badge className="bg-orange-50 text-orange-700 border-orange-200">Em Manutenção</Badge>;
      case "inactive":
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Inativo</Badge>;
      case "returned":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Devolvido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate total asset value
  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Calculate assets by category
  const assetsByCategory = assets.reduce((acc: {[key: string]: number}, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Propriedades e Ativos</h1>
                <p className="text-gray-600">Gestão de locais, equipamentos e recursos da igreja</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <QrCode size={16} className="mr-2" />
                  Gerar QR Code
                </Button>
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  Novo Ativo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Valor Total de Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <ShoppingBag size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{formatCurrency(totalAssetValue)}</p>
                      <p className="text-sm text-gray-500">{assets.length} itens cadastrados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Próxima Manutenção</CardTitle>
                </CardHeader>
                <CardContent>
                  {assets.filter(asset => asset.nextMaintenance).length > 0 ? (
                    (() => {
                      const nextMaintenance = [...assets]
                        .filter(asset => asset.nextMaintenance)
                        .sort((a, b) => 
                          new Date(a.nextMaintenance!).getTime() - 
                          new Date(b.nextMaintenance!).getTime()
                        )[0];
                      
                      return (
                        <div className="flex items-center">
                          <div className="bg-orange-100 p-3 rounded-full mr-4">
                            <Calendar size={24} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">{nextMaintenance.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(nextMaintenance.nextMaintenance!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Calendar size={24} className="text-green-600" />
                      </div>
                      <p className="text-sm">Nenhuma manutenção agendada</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Despesa Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Building size={24} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">
                        {formatCurrency(properties.reduce((sum, prop) => sum + prop.monthlyExpense, 0))}
                      </p>
                      <p className="text-sm text-gray-500">{properties.length} propriedades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="assets" className="space-y-4">
              <TabsList>
                <TabsTrigger value="assets">Equipamentos e Ativos</TabsTrigger>
                <TabsTrigger value="properties">Propriedades</TabsTrigger>
                <TabsTrigger value="borrowed">Empréstimos</TabsTrigger>
              </TabsList>

              <TabsContent value="assets">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Inventário de Equipamentos</CardTitle>
                        <CardDescription>Gerencie todos os ativos e equipamentos da igreja</CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Buscar ativos..."
                          className="pl-8 w-[300px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead 
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => handleSort('name')}
                            >
                              Nome
                              {sortColumn === 'name' && (
                                <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                              )}
                            </TableHead>
                            <TableHead 
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => handleSort('category')}
                            >
                              Categoria
                              {sortColumn === 'category' && (
                                <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                              )}
                            </TableHead>
                            <TableHead 
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => handleSort('location')}
                            >
                              Localização
                              {sortColumn === 'location' && (
                                <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                              )}
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Valor
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                              Data de Compra
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">QR Code</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAssets.map((asset) => (
                            <TableRow key={asset.id}>
                              <TableCell className="font-medium">{asset.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{asset.category}</Badge>
                              </TableCell>
                              <TableCell>{asset.location}</TableCell>
                              <TableCell className="hidden md:table-cell">{formatCurrency(asset.value)}</TableCell>
                              <TableCell className="hidden lg:table-cell">
                                {new Date(asset.purchaseDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{getStatusBadge(asset.status)}</TableCell>
                              <TableCell className="text-right">
                                {asset.qrCode ? (
                                  <Button variant="ghost" size="sm">
                                    <QrCode className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties">
                <Card>
                  <CardHeader>
                    <CardTitle>Propriedades</CardTitle>
                    <CardDescription>
                      Gerencie as propriedades e instalações da igreja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <Card key={property.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start mb-4">
                              <div className="mr-4">
                                <Building className="h-8 w-8 text-indigo-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{property.name}</h3>
                                <Badge 
                                  className={`mt-1 ${
                                    property.status === 'owned'
                                      ? 'bg-green-50 text-green-700 border-green-200'
                                      : 'bg-blue-50 text-blue-700 border-blue-200'
                                  }`}
                                >
                                  {property.status === 'owned' ? 'Pr��pria' : 'Alugada'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <span>{property.address}</span>
                              </div>
                              <div className="flex items-start">
                                <Tag className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <span>Tipo: {property.type} • {property.size}</span>
                              </div>
                              <div className="flex items-start">
                                <Users className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <span>Capacidade: {property.capacity} pessoas</span>
                              </div>
                              <div className="flex items-start">
                                <Truck className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <span>
                                  Última manutenção: {new Date(property.lastMaintenance).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">Despesa Mensal</span>
                                <span className="font-bold text-lg">{formatCurrency(property.monthlyExpense)}</span>
                              </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="borrowed">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipamentos Emprestados</CardTitle>
                    <CardDescription>
                      Controle de empréstimos de equipamentos da igreja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Data de Empréstimo</TableHead>
                            <TableHead>Data de Devolução</TableHead>
                            <TableHead className="hidden lg:table-cell">Finalidade</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {borrowedAssets.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.assetName}</TableCell>
                              <TableCell>{item.borrower}</TableCell>
                              <TableCell>
                                {new Date(item.borrowDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {new Date(item.returnDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">{item.purpose}</TableCell>
                              <TableCell>
                                {getStatusBadge(item.status)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  {item.status === 'returned' ? 'Ver Detalhes' : 'Receber'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>
                        <Plus size={16} className="mr-2" />
                        Novo Empréstimo
                      </Button>
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

export default Assets;
