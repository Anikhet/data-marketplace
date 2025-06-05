import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Shield, Clock } from "lucide-react";

export default function UpsellSection() {
  const features = [
    {
      title: "Premium Lists",
      description: "Access our most exclusive and high-quality contact lists",
      price: "From $999",
      icon: Zap,
      benefits: [
        "Higher verification rates",
        "Exclusive access",
        "Priority support",
        "Custom enrichment"
      ]
    },
    {
      title: "Enterprise Package",
      description: "Complete solution for large-scale data needs",
      price: "Custom Pricing",
      icon: Shield,
      benefits: [
        "Unlimited access",
        "Dedicated account manager",
        "Custom data enrichment",
        "API integration"
      ]
    },
    {
      title: "Fresh Data Subscription",
      description: "Regularly updated lists with fresh contacts",
      price: "From $499/month",
      icon: Clock,
      benefits: [
        "Weekly updates",
        "Quality guarantees",
        "Flexible delivery",
        "Volume discounts"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Take Your Data Strategy Further
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock more value with our premium data solutions. Choose the package that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white/50 backdrop-blur-sm border-orange-100 hover:border-orange-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <feature.icon className="h-8 w-8 text-orange-500" />
                <span className="text-lg font-semibold text-orange-600">{feature.price}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3 mb-6">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => window.location.href = '/contact-sales'}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We&apos;re here to help.
          </p>
          <Button 
            variant="outline"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={() => window.location.href = '/contact-sales'}
          >
            Contact Sales
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
} 