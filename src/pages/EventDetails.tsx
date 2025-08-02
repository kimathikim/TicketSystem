import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Ticket, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import eventsData from "@/data/events.json";
import eventsExtended from "@/data/events-extended.json";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const allEvents = [...eventsData, ...eventsExtended];
  const event = allEvents.find(e => e.id === id);
  
  const [selectedTicketType, setSelectedTicketType] = useState("regular");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!event) {
      navigate("/events");
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTicketTypeLabel = (type: string) => {
    switch (type) {
      case "regular": return "Regular";
      case "vip": return "VIP";
      case "vvip": return "VVIP";
      default: return type;
    }
  };

  const handleBuyTickets = () => {
    const checkoutData = {
      event,
      ticketType: selectedTicketType,
      quantity,
      totalAmount: event.prices[selectedTicketType as keyof typeof event.prices] * quantity
    };
    
    // Store checkout data in sessionStorage
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    
    // Navigate to checkout
    navigate("/checkout");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-8">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </div>

        {/* Event Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Event Image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-card">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Event Info */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
                    {event.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(event.time)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-sm text-muted-foreground">
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        {event.capacity.toLocaleString()} people
                      </p>
                    </div>
                  </div>
                </div>

                {/* Organizer */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Organized by</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Select Your Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Ticket Types */}
              <div>
                <Label className="text-base font-medium mb-4 block">Ticket Type</Label>
                <RadioGroup value={selectedTicketType} onValueChange={setSelectedTicketType}>
                  {Object.entries(event.prices).map(([type, price]) => (
                    <div key={type} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{getTicketTypeLabel(type)}</p>
                            <p className="text-sm text-muted-foreground">
                              {type === "regular" && "Standard access to the event"}
                              {type === "vip" && "Premium access with reserved seating"}
                              {type === "vvip" && "Exclusive access with premium amenities"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">KSh {price.toLocaleString()}</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-base font-medium mb-2 block">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24"
                />
              </div>

              {/* Total */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Amount</p>
                  <p className="font-bold text-xl">
                    KSh {(event.prices[selectedTicketType as keyof typeof event.prices] * quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Buy Button */}
              <Button 
                onClick={handleBuyTickets}
                className="w-full"
                size="lg"
              >
                Buy Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default EventDetails;