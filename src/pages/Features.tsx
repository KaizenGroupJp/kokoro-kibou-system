
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, FileText, Contact, Calendar, Share, Users, Book } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Cartão de Membro',
      description: 'Gere cartões de identificação para os membros da igreja',
      icon: <Badge className="h-10 w-10 text-primary" />,
      link: '/dashboard/member-card/1',
      color: 'bg-blue-50'
    },
    {
      title: 'Certificado de Batismo',
      description: 'Crie e imprima certificados de batismo personalizados',
      icon: <FileText className="h-10 w-10 text-green-600" />,
      link: '/dashboard/baptism-certificate/1',
      color: 'bg-green-50'
    },
    {
      title: 'Carta de Transferência',
      description: 'Prepare cartas de transferência para membros',
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      link: '/dashboard/transfer-letter/1',
      color: 'bg-purple-50'
    },
    {
      title: 'Contato',
      description: 'Gerencie informações de contato da igreja',
      icon: <Contact className="h-10 w-10 text-indigo-600" />,
      link: '/dashboard/contact',
      color: 'bg-indigo-50'
    },
    {
      title: 'Novo Evento',
      description: 'Crie eventos e compartilhe nas redes sociais',
      icon: <Calendar className="h-10 w-10 text-yellow-600" />,
      link: '/dashboard/new-event',
      color: 'bg-yellow-50'
    },
    {
      title: 'Ministério Infantil',
      description: 'Gerencie informações sobre crianças, salas e necessidades especiais',
      icon: <Users className="h-10 w-10 text-red-600" />,
      link: '/dashboard/children-ministry',
      color: 'bg-red-50'
    },
    {
      title: 'Discipulado',
      description: 'Acompanhe o progresso de discipulado dos membros',
      icon: <Book className="h-10 w-10 text-emerald-600" />,
      link: '/dashboard/discipleship',
      color: 'bg-emerald-50'
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Recursos</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Explore os recursos disponíveis para sua igreja
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                <CardHeader className={`${feature.color} rounded-t-lg`}>
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="text-xl mb-2 text-center">{feature.title}</CardTitle>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
