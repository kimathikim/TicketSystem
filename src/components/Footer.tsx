import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const footerLinks = {
    platform: [
      { label: "Browse Events", path: "/events" },
      { label: "How It Works", path: "/how-it-works" },
      { label: "Pricing", path: "/pricing" },
      { label: "Mobile App", path: "/mobile" }
    ],
    support: [
      { label: "Help Center", path: "/help" },
      { label: "Contact Us", path: "/contact" },
      { label: "Event Organizers", path: "/organizers" },
      { label: "Refund Policy", path: "/refunds" }
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Press", path: "/press" },
      { label: "Partners", path: "/partners" }
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/cookies" },
      { label: "Security", path: "/security" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/ticketkenya", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/ticketkenya", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/ticketkenya", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/ticketkenya", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">T</span>
                </div>
                <span className="font-heading font-bold text-2xl">
                  TicketKenya
                </span>
              </div>
              
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Kenya's premier event ticketing platform. Connecting people with amazing experiences across the country.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-glow" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary-glow" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary-glow" />
                  <span>hello@ticketkenya.com</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-primary-foreground/80 hover:text-primary-glow transition-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-primary-foreground/80 hover:text-primary-glow transition-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-primary-foreground/80 hover:text-primary-glow transition-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-primary-foreground/80 hover:text-primary-glow transition-smooth text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 TicketKenya. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/60 hover:text-primary-glow hover:bg-primary-foreground/10"
                  asChild
                >
                  <a 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};