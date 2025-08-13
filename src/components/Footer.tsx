import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
              <span className="font-heading font-bold text-xl">
                TicketKenya
              </span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Kenya's premier event ticketing platform. Discover amazing events, 
              book tickets seamlessly, and create unforgettable experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@ticketkenya.com</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80">
              {footerLinks.legal.map((link, index) => (
                <span key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="ml-4">•</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-primary-foreground/80">
              © 2024 TicketKenya. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};