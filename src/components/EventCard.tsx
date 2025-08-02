import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  time: string;
  location: string;
  prices: {
    regular: number;
    vip: number;
    vvip: number;
  };
  featured?: boolean;
  capacity: number;
  tags: string[];
}

interface EventCardProps {
  event: Event;
  onClick?: (eventId: string) => void;
}

const categoryColors = {
  tech: "bg-tech text-white",
  festival: "bg-festival text-white",
  concert: "bg-concert text-white",
  sports: "bg-sports text-white",
  business: "bg-primary text-primary-foreground",
  cultural: "bg-secondary text-secondary-foreground",
  entertainment: "bg-accent text-accent-foreground",
  food: "bg-orange-500 text-white"
};

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(event.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-elegant transition-smooth overflow-hidden bg-gradient-card border-0"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-smooth"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-primary text-primary-foreground font-semibold">
            Featured
          </Badge>
        )}
        <Badge 
          className={`absolute top-3 right-3 ${categoryColors[event.category as keyof typeof categoryColors] || 'bg-gray-500 text-white'} font-medium`}
        >
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4 sm:p-6">
        <h3 className="font-heading font-semibold text-lg sm:text-xl mb-3 line-clamp-2 group-hover:text-primary transition-smooth">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>Up to {event.capacity.toLocaleString()} attendees</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-heading font-bold text-lg text-primary">
              KSh {event.prices.regular.toLocaleString()}
            </p>
          </div>
          <Button 
            variant="default" 
            size="mobile" 
            className="w-full sm:w-auto"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(event.id);
            }}
          >
            Buy Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};