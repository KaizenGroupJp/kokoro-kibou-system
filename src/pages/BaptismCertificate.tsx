
import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Printer, ChevronLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock member data
const memberData = {
  id: 1,
  name: 'Takashi Yamada',
  baptismDate: '24/12/2021',
  pastor: 'Pr. João Silva',
  churchName: 'Igreja Brasileira de Tóquio',
  location: 'Tóquio, Japão',
};

const certificateTemplates = [
  { id: 'modern', name: 'Moderno' },
  { id: 'classic', name: 'Clássico' },
  { id: 'minimal', name: 'Minimalista' },
];

const BaptismCertificate = () => {
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [template, setTemplate] = useState('modern');
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Certificado gerado com sucesso",
        description: "O certificado de batismo está pronto para download",
      });
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link to="/dashboard/members">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Certificado de Batismo</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Crie e imprima certificados de batismo personalizados
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 print:w-full">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div ref={certificateRef} className="bg-white" id="baptism-certificate">
                  {template === 'modern' && (
                    <div className="w-full aspect-[1.4/1] bg-white border border-gray-200 p-8 rounded-lg relative shadow-md">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <div className="border-4 border-blue-100 h-full w-full p-6 flex flex-col items-center justify-between text-center">
                        <div className="flex items-center justify-center mb-2">
                          <FileText className="h-8 w-8 text-blue-600 mr-2" />
                          <h2 className="text-xl font-bold text-blue-600">CERTIFICADO DE BATISMO</h2>
                        </div>
                        
                        <div className="my-4">
                          <p className="text-gray-600 mb-4">Este documento certifica que</p>
                          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">{memberData.name}</h1>
                          <p className="text-gray-600 mb-2">foi batizado(a) em</p>
                          <h3 className="text-xl text-gray-800 mb-2 font-medium">{memberData.baptismDate}</h3>
                          <p className="text-gray-600 mb-4">na {memberData.churchName} em {memberData.location}</p>
                        </div>
                        
                        <div className="mt-6">
                          <div className="w-48 h-0.5 bg-gray-300 mb-2 mx-auto"></div>
                          <p className="text-gray-800 font-medium">{memberData.pastor}</p>
                          <p className="text-gray-600 text-sm">Pastor</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {template === 'classic' && (
                    <div className="w-full aspect-[1.4/1] bg-[#F9F7F0] border border-gray-200 p-8 rounded-lg relative shadow-md">
                      <div className="border-2 border-[#8B7D4A] h-full w-full p-6 flex flex-col items-center justify-between text-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2RkZDJiZSIvPjwvc3ZnPg==')] bg-repeat">
                        <div>
                          <h2 className="text-2xl font-serif text-[#8B7D4A] mb-2">Certificado de Batismo</h2>
                          <div className="w-32 h-1 mx-auto bg-[#8B7D4A] mb-4"></div>
                        </div>
                        
                        <div className="my-4">
                          <p className="text-gray-700 mb-4 font-serif">Este documento certifica que</p>
                          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">{memberData.name}</h1>
                          <p className="text-gray-700 mb-2 font-serif">recebeu o batismo cristão em</p>
                          <h3 className="text-xl text-gray-800 mb-2 font-serif">{memberData.baptismDate}</h3>
                          <p className="text-gray-700 mb-4 font-serif">na {memberData.churchName}</p>
                          <p className="text-gray-700 font-serif">{memberData.location}</p>
                        </div>
                        
                        <div className="mt-6">
                          <div className="w-48 h-0.5 bg-[#8B7D4A] mb-2 mx-auto"></div>
                          <p className="text-gray-800 font-serif">{memberData.pastor}</p>
                          <p className="text-gray-600 text-sm font-serif">Pastor</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {template === 'minimal' && (
                    <div className="w-full aspect-[1.4/1] bg-white border border-gray-200 p-10 rounded-lg relative shadow-md">
                      <div className="h-full w-full flex flex-col items-center justify-between text-center">
                        <div>
                          <h2 className="text-xl font-medium text-gray-700 tracking-widest">CERTIFICADO DE BATISMO</h2>
                          <div className="w-16 h-px mx-auto bg-gray-300 my-4"></div>
                        </div>
                        
                        <div className="my-4">
                          <p className="text-gray-600 mb-6">Certificamos que</p>
                          <h1 className="text-4xl font-light text-gray-800 mb-6">{memberData.name}</h1>
                          <p className="text-gray-600 mb-2">Foi batizado(a) em {memberData.baptismDate}</p>
                          <p className="text-gray-600">{memberData.churchName}</p>
                          <p className="text-gray-600">{memberData.location}</p>
                        </div>
                        
                        <div className="mt-8">
                          <div className="w-32 h-px bg-gray-300 mb-3 mx-auto"></div>
                          <p className="text-gray-800">{memberData.pastor}</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                      <label className="text-sm font-medium">Modelo</label>
                      <Select value={template} onValueChange={setTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {certificateTemplates.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <p className="text-sm font-medium">Data de Batismo</p>
                      <p className="text-gray-700">{memberData.baptismDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pastor</p>
                      <p className="text-gray-700">{memberData.pastor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Igreja</p>
                      <p className="text-gray-700">{memberData.churchName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Local</p>
                      <p className="text-gray-700">{memberData.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaptismCertificate;
