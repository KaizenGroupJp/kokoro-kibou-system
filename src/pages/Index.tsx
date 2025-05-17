
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight, Users, Banknote, FileText, Calendar, BookOpen, Check, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plans = [
  {
    name: "ベーシック",
    nameEn: "Basic",
    price: "¥15,000",
    period: "/month",
    description: "For small churches starting formalization",
    features: [
      "Member management up to 100 members",
      "Basic financial records",
      "Document templates",
      "Event calendar",
      "Email notifications",
    ],
    highlighted: false,
  },
  {
    name: "グロース",
    nameEn: "Growth",
    price: "¥25,000",
    period: "/month",
    description: "For churches pursuing 宗教法人 status",
    features: [
      "Member management up to 300 members",
      "Complete financial reporting",
      "Legal document generation",
      "Event management with RSVP",
      "Volunteer scheduling",
      "Ministry check-in system",
      "Legal compliance checklist",
    ],
    highlighted: true,
  },
  {
    name: "宗教法人",
    nameEn: "Advanced",
    price: "¥40,000",
    period: "/month",
    description: "For established religious corporations",
    features: [
      "Unlimited members",
      "Multi-currency financial management",
      "Property and asset management",
      "Advanced legal document workflows",
      "Comprehensive reporting",
      "API access",
      "Dedicated support",
    ],
    highlighted: false,
  },
  {
    name: "宗教団体",
    nameEn: "Premium",
    price: "¥75,000",
    period: "/month",
    description: "For large organizations with multiple churches",
    features: [
      "Multi-church management",
      "Organizational hierarchy support",
      "Centralized finance consolidation",
      "Enterprise-level security",
      "Custom implementation",
      "White-label options",
      "Priority support",
    ],
    highlighted: false,
  },
];

const features = [
  {
    icon: Users,
    title: "Member Management",
    description: "Complete member profiles with family grouping, act records, and digital membership cards.",
  },
  {
    icon: Banknote,
    title: "Financial Management",
    description: "Track tithes, offerings, and expenses with multilingual reports in Japanese yen format.",
  },
  {
    icon: FileText,
    title: "Legal Documents",
    description: "Automated generation of official documents, meeting minutes, and legal compliance checklists.",
  },
  {
    icon: Calendar,
    title: "Events & Communication",
    description: "Bilingual calendar for services and events with RSVP and integrated messaging.",
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    description: "Course management and tracking with bilingual certificates and progress monitoring.",
  },
  {
    icon: Check,
    title: "Check-in System",
    description: "Secure attendance tracking for services and special security for children's ministry.",
  },
];

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-100 via-white to-sakura-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 mb-6">
                  Church Management for Japan
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-xl">
                  Complete SaaS solution designed specifically for religious organizations in Japan, 
                  from small churches to established 宗教法人 and 宗教団体.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="button-hover">
                      Start Free Trial
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="button-hover">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 animate-slideUp">
                <img
                  src="/hero-image.png"
                  alt="Church Management Dashboard"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
                Features Designed for Churches in Japan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your church effectively while complying with Japanese regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader>
                    <div className="bg-indigo-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <feature.icon size={24} className="text-indigo-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/features" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plans section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plans for every stage of your church's journey, from small gatherings to established organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden ${
                    plan.highlighted ? 'border-indigo-500 shadow-lg' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex flex-col">
                      <span className="text-2xl font-bold">{plan.name}</span>
                      {plan.nameEn !== plan.name && (
                        <span className="text-lg text-gray-500">{plan.nameEn}</span>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-end">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </CardDescription>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      Choose Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to streamline your church management?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="button-hover">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900 button-hover">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
