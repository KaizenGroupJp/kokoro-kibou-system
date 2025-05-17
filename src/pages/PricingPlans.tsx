
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    id: "basic",
    name: "Basic",
    namejp: "ベーシック",
    description: "Para pequenas igrejas iniciando formalização",
    descriptionjp: "宗教組織の初期段階にある小さな教会向け",
    price: {
      monthly: 5000,
      yearly: 50000
    },
    features: [
      "Gestão de até 50 membros",
      "Gestão financeira básica",
      "Calendário de eventos",
      "Suporte por email"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    namejp: "グロース",
    description: "Para igrejas em processo de status 宗教法人",
    descriptionjp: "宗教法人を目指す成長中の教会向け",
    price: {
      monthly: 10000,
      yearly: 100000
    },
    features: [
      "Gestão de até 200 membros",
      "Gestão financeira completa",
      "Relatórios financeiros",
      "Calendário de eventos avançado",
      "Gestão de documentos básica",
      "Sistema de check-in",
      "Suporte prioritário"
    ],
    popular: true
  },
  {
    id: "advanced",
    name: "Advanced",
    namejp: "宗教法人",
    description: "Para corporações religiosas estabelecidas",
    descriptionjp: "確立された宗教法人向け",
    price: {
      monthly: 20000,
      yearly: 200000
    },
    features: [
      "Gestão ilimitada de membros",
      "Gestão financeira avançada",
      "Relatórios financeiros multilíngues",
      "Gestão de documentos completa",
      "Sistema de check-in avançado",
      "Gestão de propriedades e ativos",
      "Gestão de voluntários",
      "Suporte dedicado"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    namejp: "宗教団体",
    description: "Para organizações com múltiplas igrejas",
    descriptionjp: "複数の教会を持つ宗教団体向け",
    price: {
      monthly: 40000,
      yearly: 400000
    },
    features: [
      "Tudo do plano Advanced",
      "Suporte para múltiplas igrejas",
      "Análise avançada de dados",
      "Motor de simulação financeira",
      "API personalizada",
      "Consultoria estratégica",
      "Suporte 24/7"
    ]
  }
];

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha o plano ideal para sua igreja</h1>
            <p className="text-xl text-gray-600 mb-6">Soluções personalizadas para diferentes estágios de formalização religiosa no Japão</p>
            
            <div className="flex items-center justify-center mb-8">
              <Label htmlFor="billing-switch" className={`mr-2 ${billingCycle === "monthly" ? "font-semibold" : ""}`}>Mensal</Label>
              <Switch 
                id="billing-switch" 
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              />
              <Label htmlFor="billing-switch" className={`ml-2 ${billingCycle === "yearly" ? "font-semibold" : ""}`}>
                Anual <span className="text-indigo-600 text-sm font-medium">(2 meses grátis)</span>
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-indigo-600 shadow-lg" : "border-gray-200"}`}>
                {plan.popular && (
                  <div className="bg-indigo-600 text-white px-4 py-1 text-center text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex flex-col">
                    <span className="text-2xl font-bold">{plan.name}</span>
                    <span className="text-lg text-gray-600">{plan.namejp}</span>
                  </CardTitle>
                  <CardDescription className="mt-2 h-12">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <p className="text-3xl font-bold">{formatCurrency(plan.price[billingCycle])}</p>
                    <p className="text-sm text-gray-500">
                      {billingCycle === "monthly" ? "por mês" : "por ano"}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                    asChild
                  >
                    <Link to="/register">Selecionar</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Precisa de um plano personalizado?</h2>
            <p className="text-lg text-gray-600 mb-6">Entre em contato com nossa equipe para uma solução sob medida para a sua organização.</p>
            <Button variant="outline" size="lg">Entre em contato</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPlans;
