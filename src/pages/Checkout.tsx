import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface CheckoutData {
  event: any;
  ticketType: string;
  quantity: number;
  totalAmount: number;
}

interface AttendeeDetails {
  name: string;
  email: string;
  phone: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [attendees, setAttendees] = useState<AttendeeDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) {
      navigate("/events");
      return;
    }

    const parsedData = JSON.parse(data);
    setCheckoutData(parsedData);

    // Initialize attendee details array
    const initialAttendees = Array.from({ length: parsedData.quantity }, (_, index) => ({
      name: index === 0 ? "Ababu Junior" : "",
      email: index === 0 ? "ababu@example.com" : "",
      phone: index === 0 ? "+254712345678" : "+254712345678"
    }));
    setAttendees(initialAttendees);
  }, [navigate]);

  if (!checkoutData) {
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

  const generateTicketNumber = () => {
    return `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const generateSeatNumber = (index: number) => {
    if (!checkoutData.event.hasSeating) return null;
    
    const seatLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const row = seatLetters[Math.floor(Math.random() * 10)];
    const number = Math.floor(Math.random() * 50) + 1;
    return `${row}${number}`;
  };

  const updateAttendee = (index: number, field: keyof AttendeeDetails, value: string) => {
    const updated = [...attendees];
    updated[index] = { ...updated[index], [field]: value };
    setAttendees(updated);
  };

  const handlePayment = async () => {
    // Validate attendee details
    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      if (!attendee.name.trim() || !attendee.phone.trim()) {
        toast({
          title: "Missing Information",
          description: `Please fill in all required details for attendee ${i + 1}`,
          variant: "destructive"
        });
        return;
      }
      
      if (i > 0 && !attendee.email.trim()) {
        // For additional attendees, email is optional but show warning
        console.log(`Email optional for attendee ${i + 1}`);
      }
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate tickets
    const tickets = attendees.map((attendee, index) => ({
      ticketNumber: generateTicketNumber(),
      seatNumber: generateSeatNumber(index),
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      attendeePhone: attendee.phone,
      eventTitle: checkoutData.event.title,
      eventDate: checkoutData.event.date,
      eventTime: checkoutData.event.time,
      eventVenue: checkoutData.event.venue,
      ticketType: checkoutData.ticketType,
      price: checkoutData.event.prices[checkoutData.ticketType],
      paymentMethod
    }));

    // Store tickets in localStorage
    const existingTickets = JSON.parse(localStorage.getItem("userTickets") || "[]");
    localStorage.setItem("userTickets", JSON.stringify([...existingTickets, ...tickets]));

    // Clear checkout data
    sessionStorage.removeItem("checkoutData");

    setLoading(false);
    
    toast({
      title: "Payment Successful!",
      description: "Your tickets have been purchased successfully.",
    });

    // Navigate to confirmation
    navigate("/confirmation", { state: { tickets } });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-8 pb-16">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-8">
            Complete Your Purchase
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Attendee Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendee Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="space-y-4">
                      <h4 className="font-medium text-lg">
                        {index === 0 ? "Primary Attendee" : `Attendee ${index + 1}`}
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`name-${index}`}>Full Name *</Label>
                          <Input
                            id={`name-${index}`}
                            value={attendee.name}
                            onChange={(e) => updateAttendee(index, "name", e.target.value)}
                            placeholder="Enter full name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`phone-${index}`}>Phone Number *</Label>
                          <Input
                            id={`phone-${index}`}
                            value={attendee.phone}
                            onChange={(e) => updateAttendee(index, "phone", e.target.value)}
                            placeholder="+254712345678"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`email-${index}`}>
                          Email {index === 0 ? "*" : "(Optional)"}
                        </Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          value={attendee.email}
                          onChange={(e) => updateAttendee(index, "email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      
                      {index < attendees.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Smartphone className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">M-Pesa</p>
                          <p className="text-sm text-muted-foreground">Pay with M-Pesa mobile money</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-muted-foreground">Pay with Visa, MasterCard, or other cards</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Building2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-muted-foreground">Direct bank transfer</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div>
                    <h4 className="font-medium mb-2">{checkoutData.event.title}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{formatDate(checkoutData.event.date)}</p>
                      <p>{formatTime(checkoutData.event.time)}</p>
                      <p>{checkoutData.event.venue}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Ticket Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ticket Type</span>
                      <span>{getTicketTypeLabel(checkoutData.ticketType)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>{checkoutData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per ticket</span>
                      <span>KSh {checkoutData.event.prices[checkoutData.ticketType].toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>KSh {checkoutData.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee</span>
                      <span>KSh 50</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>KSh {(checkoutData.totalAmount + 50).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default Checkout;