
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Printer, ChevronLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock member data
const memberData = {
  id: 1,
  name: 'Takashi Yamada',
  memberSince: '15 de Março de 2020',
  churchName: 'Igreja Brasileira de Tóquio',
  address: 'Rua Sakura, 123, Shinjuku, Tóquio, Japão',
  phone: '+81 90-1234-5678',
  email: 'igreja@exemplo.com',
  pastor: 'Pr. João Silva',
};

const TransferLetter = () => {
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [destinationChurch, setDestinationChurch] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Carta gerada com sucesso",
        description: "A carta de transferência está pronta para download",
      });
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/dashboard/members">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h2 className="text-3xl font-bold tracking-tight">Cartas</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Prepare cartas para membros
            </p>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3 print:w-full">
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="bg-white" id="transfer-letter">
                      <div className="w-full bg-white border border-gray-200 p-8 rounded-lg relative shadow-sm">
                        <div className="text-center mb-8">
                          <h1 className="text-2xl font-bold">{memberData.churchName}</h1>
                          <p className="text-sm text-gray-500">{memberData.address}</p>
                          <p className="text-sm text-gray-500">Tel: {memberData.phone} | Email: {memberData.email}</p>
                        </div>

                        <div className="mb-8">
                          <h2 className="text-xl font-semibold text-center mb-6">CARTA DE TRANSFERÊNCIA</h2>
                          <p className="text-right mb-6">{memberData.churchName}, {currentDate}</p>

                          <p className="mb-4">À</p>
                          <p className="font-medium mb-6">{destinationChurch || "[Nome da Igreja de Destino]"}</p>

                          <p className="mb-4">Prezados irmãos,</p>

                          <p className="mb-4 text-justify">
                            Temos a satisfação de apresentar o(a) irmão(ã) <strong>{memberData.name}</strong>, 
                            que foi membro de nossa igreja desde <strong>{memberData.memberSince}</strong> e que agora 
                            deseja transferir sua membresia para essa igreja.
                          </p>

                          <p className="mb-4 text-justify">
                            Durante o tempo que esteve conosco, o(a) irmão(ã) demonstrou conduta cristã exemplar,
                            participando ativamente das atividades da igreja e contribuindo significativamente
                            para a obra de Deus em nossa comunidade.
                          </p>

                          {additionalComments && (
                            <p className="mb-4 text-justify">{additionalComments}</p>
                          )}

                          <p className="mb-8 text-justify">
                            Desta forma, recomendamos que o(a) recebam como membro em plena comunhão,
                            certos de que será uma bênção para essa comunidade.
                          </p>

                          <p className="mb-4">Fraternalmente em Cristo,</p>
                        </div>
                        
                        <div className="mt-12 text-center">
                          <div className="w-64 h-0.5 bg-gray-300 mb-2 mx-auto"></div>
                          <p className="font-medium">{memberData.pastor}</p>
                          <p className="text-sm">Pastor</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                        
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={handleGeneratePDF} 
                    disabled={isGenerating}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isGenerating ? "Gerando..." : "Baixar PDF"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={handlePrint}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                </div>
              </div>
                        
              <div className="w-full md:w-1/3 print:hidden">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Configurações</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Igreja de Destino</label>
                          <Input 
                            placeholder="Nome da igreja de destino" 
                            value={destinationChurch}
                            onChange={(e) => setDestinationChurch(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Comentários Adicionais</label>
                          <Textarea 
                            placeholder="Adicione qualquer comentário relevante sobre o membro..." 
                            value={additionalComments}
                            onChange={(e) => setAdditionalComments(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                        
                    <div>
                      <h3 className="text-lg font-medium mb-4">Informações</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium">Nome</p>
                          <p className="text-gray-700">{memberData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Membro desde</p>
                          <p className="text-gray-700">{memberData.memberSince}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Igreja</p>
                          <p className="text-gray-700">{memberData.churchName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pastor</p>
                          <p className="text-gray-700">{memberData.pastor}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferLetter;
