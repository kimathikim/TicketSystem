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
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

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

const MyTicketsContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch tickets from Supabase
    // For now, we'll use localStorage as a fallback but in the future
    // this should query the database for tickets associated with the user
    const storedTickets = JSON.parse(localStorage.getItem("userTickets") || "[]");
    setTickets(storedTickets);
  }, [user]);

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

  const downloadTicket = (ticket: TicketData) => {
    toast({
      title: "Download Started",
      description: `Downloading ticket for ${ticket.eventTitle}`,
    });
  };

  const viewQRCode = (ticket: TicketData) => {
    toast({
      title: "QR Code",
      description: `QR Code: ${ticket.ticketNumber}`,
    });
  };

  const upcomingTickets = filteredTickets.filter(ticket => {
    const eventDate = new Date(ticket.eventDate);
    return eventDate >= new Date();
  });

  const pastTickets = filteredTickets.filter(ticket => {
    const eventDate = new Date(ticket.eventDate);
    return eventDate < new Date();
  });

  const TicketCard = ({ ticket }: { ticket: TicketData }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{ticket.eventTitle}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {ticket.eventDate} at {ticket.eventTime}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {ticket.eventVenue}
              </div>
              <div className="flex items-center">
                <Ticket className="h-4 w-4 mr-2" />
                {ticket.ticketType} - {ticket.seatNumber}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="ml-4">
            KSh {ticket.price.toLocaleString()}
          </Badge>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-medium">{ticket.attendeeName}</p>
              <p className="text-xs text-muted-foreground">{ticket.ticketNumber}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => viewQRCode(ticket)}
                className="flex items-center space-x-1"
              >
                <QrCode className="h-4 w-4" />
                <span>QR</span>
              </Button>
              <Button
                size="sm"
                onClick={() => downloadTicket(ticket)}
                className="flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here are all your event tickets.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tickets by event, name, or venue..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Tickets Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events ({pastTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingTickets.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {upcomingTickets.map((ticket, index) => (
                  <TicketCard key={index} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Ticket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Upcoming Tickets</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming event tickets.
                </p>
                <Button onClick={() => navigate("/events")}>
                  Browse Events
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastTickets.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {pastTickets.map((ticket, index) => (
                  <TicketCard key={index} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Past Events</h3>
                <p className="text-muted-foreground">
                  Your past event tickets will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

const MyTickets = () => {
  return (
    <ProtectedRoute>
      <MyTicketsContent />
    </ProtectedRoute>
  );
};

export default MyTickets;