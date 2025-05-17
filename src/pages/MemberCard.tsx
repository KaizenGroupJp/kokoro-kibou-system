
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Download, Printer, ChevronLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

// Mock member data
const memberData = {
  id: 1,
  name: 'Takashi Yamada',
  position: 'Membro Regular',
  memberSince: '15/03/2020',
  expiryDate: '15/03/2025',
  churchName: 'Igreja Brasileira de Tóquio',
  photo: 'https://i.pravatar.cc/300?img=11',
  memberCode: '20200315-0001',
};

const MemberCard = () => {
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Cartão gerado com sucesso",
        description: "O cartão de membro foi gerado e está pronto para download",
      });
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

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
              <h2 className="text-3xl font-bold tracking-tight">Cartão de Membro</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Crie e imprima cartões de identificação para os membros da igreja
            </p>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 print:w-full">
                <div className="mb-6">
                  <Card className="p-4">
                    <CardContent className="p-0">
                      <div ref={cardRef} className="bg-white overflow-hidden" id="member-card">
                        {/* Frente do cartão */}
                        <div className="w-full aspect-[85/54] bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg relative shadow-lg mb-8">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium opacity-80">Igreja Brasileira de Tóquio</h3>
                              <h2 className="text-xl font-bold mt-1">Cartão de Membro</h2>
                            </div>
                            <Badge className="h-12 w-12 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden border-2 border-white/70">
                                <img 
                                  src={memberData.photo} 
                                  alt={memberData.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold">{memberData.name}</h3>
                                <p className="text-sm opacity-80">{memberData.position}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Verso do cartão */}
                        <div className="w-full aspect-[85/54] bg-white border border-gray-200 text-gray-700 p-6 rounded-lg relative shadow-lg">
                          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-medium text-sm mb-3">{memberData.churchName}</h3>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Membro desde:</span> {memberData.memberSince}</p>
                                <p><span className="font-medium">Validade:</span> {memberData.expiryDate}</p>
                                <p><span className="font-medium">Código:</span> {memberData.memberCode}</p>
                              </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                              <div className="border border-gray-200 p-2 rounded-md bg-gray-50">
                                {/* Placeholder for QR code - in a real app you'd use a QR code library */}
                                <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-0.5">
                                  {Array(16).fill(0).map((_, i) => (
                                    <div key={i} className={`bg-black ${Math.random() > 0.3 ? 'opacity-100' : 'opacity-0'}`}></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                                
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
                                
              <div className="w-full md:w-1/2 print:hidden">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Informações do Membro</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Nome</p>
                        <p className="text-gray-700">{memberData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Posição</p>
                        <p className="text-gray-700">{memberData.position}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Membro desde</p>
                        <p className="text-gray-700">{memberData.memberSince}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data de Expiração</p>
                        <p className="text-gray-700">{memberData.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Código de Membro</p>
                        <p className="text-gray-700">{memberData.memberCode}</p>
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

export default MemberCard;
