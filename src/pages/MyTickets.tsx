import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Calendar, MapPin, Clock, Download, QrCode, Search, Filter } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const MyTickets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    // Get tickets from localStorage
    const storedTickets = JSON.parse(localStorage.getItem("userTickets") || "[]");
    setTickets(storedTickets);
  }, []);

  useEffect(() => {
    // Filter tickets based on search term
    const filtered = tickets.filter(ticket =>
      ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.eventVenue.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [tickets, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      weekday: "short",
      year: "numeric",
      month: "short",
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

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingTickets = filteredTickets.filter(ticket => isUpcoming(ticket.eventDate));
  const pastTickets = filteredTickets.filter(ticket => !isUpcoming(ticket.eventDate));

  const handleDownloadTicket = (ticket: TicketData) => {
    toast({
      title: "Download Started",
      description: `Downloading ticket for ${ticket.eventTitle}`,
    });
    // In a real app, this would generate and download a PDF
  };

  const handleViewQR = (ticket: TicketData) => {
    toast({
      title: "QR Code",
      description: `Displaying QR code for ${ticket.eventTitle}`,
    });
    // In a real app, this would show a modal with the QR code
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const TicketCard = ({ ticket }: { ticket: TicketData }) => (
    <Card className="hover:shadow-card transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{ticket.eventTitle}</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">{ticket.attendeeName}</p>
            <Badge variant="secondary">{getTicketTypeLabel(ticket.ticketType)}</Badge>
          </div>
          <div className="text-right">
            <p className="font-bold">KSh {ticket.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Ticket #{ticket.ticketNumber.slice(-6)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(ticket.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTime(ticket.eventTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{ticket.eventVenue}</span>
          </div>
        </div>

        {ticket.seatNumber && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm">
              <span className="text-muted-foreground">Seat: </span>
              <span className="font-mono font-medium">{ticket.seatNumber}</span>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleViewQR(ticket)}
            className="flex-1"
          >
            <QrCode className="h-4 w-4 mr-2" />
            View QR
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleDownloadTicket(ticket)}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              My Tickets
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and view all your event tickets
            </p>
          </div>

          {tickets.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-64 h-64 mx-auto mb-6 bg-muted rounded-lg flex items-center justify-center">
                <Ticket className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">No tickets yet</h3>
              <p className="text-muted-foreground mb-6">
                When you purchase tickets, they'll appear here.
              </p>
              <Button onClick={() => navigate("/events")}>
                Browse Events
              </Button>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Tickets Tabs */}
              <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="upcoming" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Upcoming ({upcomingTickets.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Past ({pastTickets.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingTickets.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No upcoming events</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingTickets.map((ticket) => (
                        <TicketCard key={ticket.ticketNumber} ticket={ticket} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {pastTickets.length === 0 ? (
                    <div className="text-center py-8">
                      <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No past events</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastTickets.map((ticket) => (
                        <TicketCard key={ticket.ticketNumber} ticket={ticket} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default MyTickets;