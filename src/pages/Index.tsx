import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventCard } from "@/components/EventCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import eventsData from "@/data/events.json";
import eventsExtended from "@/data/events-extended.json";

const Index = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);

  // Combine all events
  const allEvents = [...eventsData, ...eventsExtended];

  useEffect(() => {
    // Get featured events for the homepage
    const featured = allEvents.filter(event => event.featured).slice(0, 6);
    setFeaturedEvents(featured);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main>
        {/* Hero Section */}
        <HeroSection onNavigate={handleNavigation} />

        {/* Featured Events Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
                Featured Events
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't miss out on these amazing upcoming events across Kenya
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={handleEventClick}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleNavigation("/events")}
              >
                View All Events
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of Kenyans discovering and attending amazing events. 
              Your next unforgettable experience is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => handleNavigation("/events")}
                className="min-w-[200px]"
              >
                Browse Events
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleNavigation("/register")}
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary"
              >
                Sign Up Free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default Index;
