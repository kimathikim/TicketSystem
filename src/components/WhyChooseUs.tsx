import { Shield, Zap, Clock, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are protected with bank-level security. M-Pesa and card payments available.",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Instant Tickets",
    description: "Get your tickets immediately via SMS and email. No waiting, no delays.",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Stay informed about event changes, venue updates, and important announcements.",
    color: "text-accent"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you with any questions.",
    color: "text-festival"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Why Choose TicketKenya?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your event experience seamless and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card transition-smooth bg-gradient-card border-0 text-center"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-elegant group-hover:shadow-glow transition-smooth ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                
                <h3 className="font-heading font-semibold text-lg sm:text-xl mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};