import { useState } from "react";
import { Menu, Search, User, X, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleNavigation("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "My Tickets", path: "/my-tickets" },
  ];

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-heading font-bold text-xl text-primary">
              TicketKenya
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="font-medium text-foreground hover:text-primary transition-smooth"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10 w-64"
              />
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation("/my-tickets")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Tickets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleNavigation("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <span className="font-heading font-bold text-xl text-primary">
                      TicketKenya
                    </span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className="text-left font-medium text-foreground hover:text-primary transition-smooth py-2"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="border-t pt-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={user.name} />
                            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleNavigation("/settings")}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={handleSignOut}
                            disabled={loading}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleNavigation("/login")}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => handleNavigation("/register")}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10 w-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};