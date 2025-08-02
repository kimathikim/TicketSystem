import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Download, Mail, Share2, Ticket, Calendar, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  ticketNumber: string;
  seatNumber?: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  ticketType: string;
  price: number;
  paymentMethod: string;
}

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    const ticketsFromState = location.state?.tickets;
    if (ticketsFromState) {
      setTickets(ticketsFromState);
    } else {
      // Fallback: try to get from localStorage
      const storedTickets = JSON.parse(localStorage.getItem("userTickets") || "[]");
      if (storedTickets.length === 0) {
        navigate("/events");
      } else {
        // Get the most recent tickets
        const recentTickets = storedTickets.slice(-1);
        setTickets(recentTickets);
      }
    }
  }, [location.state, navigate]);

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

  const handleDownloadTickets = () => {
    toast({
      title: "Download Started",
      description: "Your tickets are being downloaded as a PDF.",
    });
    // In a real app, this would generate and download a PDF
  };

  const handleEmailTickets = () => {
    toast({
      title: "Email Sent",
      description: "Your tickets have been sent to your email address.",
    });
    // In a real app, this would send an email
  };

  const handleShareTickets = () => {
    if (navigator.share) {
      navigator.share({
        title: `My ticket for ${tickets[0]?.eventTitle}`,
        text: `I'm going to ${tickets[0]?.eventTitle}!`,
        url: window.location.origin
      });
    } else {
      toast({
        title: "Link Copied",
        description: "Event link has been copied to your clipboard.",
      });
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (tickets.length === 0) {
    return null;
  }

  const firstTicket = tickets[0];
  const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your tickets have been purchased successfully
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tickets */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-heading font-semibold text-2xl">Your Tickets</h2>
              
              {tickets.map((ticket, index) => (
                <Card key={ticket.ticketNumber} className="overflow-hidden">
                  <CardHeader className="bg-gradient-primary text-primary-foreground">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{ticket.eventTitle}</CardTitle>
                        <p className="text-white/80">Ticket #{index + 1}</p>
                      </div>
                      <Ticket className="h-8 w-8 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Attendee Info */}
                    <div>
                      <h4 className="font-medium text-lg mb-2">{ticket.attendeeName}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Ticket Number</p>
                          <p className="font-mono">{ticket.ticketNumber}</p>
                        </div>
                        {ticket.seatNumber && (
                          <div>
                            <p className="text-muted-foreground">Seat</p>
                            <p className="font-mono">{ticket.seatNumber}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground">Ticket Type</p>
                          <Badge variant="secondary">{getTicketTypeLabel(ticket.ticketType)}</Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium">KSh {ticket.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm">{formatDate(ticket.eventDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="text-sm">{formatTime(ticket.eventTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Venue</p>
                          <p className="text-sm">{ticket.eventVenue}</p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="flex justify-center pt-4 border-t">
                      <div className="bg-muted w-32 h-32 rounded-lg flex items-center justify-center">
                        <div className="text-center text-sm text-muted-foreground">
                          <div className="w-20 h-20 bg-white border-2 border-dashed border-muted-foreground/30 rounded mb-2 mx-auto"></div>
                          QR Code
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions & Summary */}
            <div className="space-y-6">
              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleDownloadTickets} className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={handleEmailTickets} className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Tickets
                  </Button>
                  <Button onClick={handleShareTickets} className="w-full justify-start" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tickets ({tickets.length})</span>
                    <span>KSh {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee</span>
                    <span>KSh 50</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Paid</span>
                    <span>KSh {(totalAmount + 50).toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Payment Method: {firstTicket.paymentMethod === "mpesa" ? "M-Pesa" : firstTicket.paymentMethod}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate("/my-tickets")} 
                  className="w-full"
                  variant="default"
                >
                  View All My Tickets
                </Button>
                <Button 
                  onClick={() => navigate("/events")} 
                  className="w-full"
                  variant="outline"
                >
                  Browse More Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default Confirmation;