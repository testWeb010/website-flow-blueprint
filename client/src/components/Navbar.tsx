import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, User, Download, ChevronDown, BookOpen, Code, Star } from "lucide-react";

// Radix UI Components
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Accordion from '@radix-ui/react-accordion';

// --- Reusable ListItem for the Mega Menu ---
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode, to?: string }
>(({ className, title, children, icon, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        {to ? (
          <Link to={to} className={cn(
            "flex select-none space-x-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark-700/50 focus:bg-dark-700/50",
            className
          )} {...props}>
            <div className="text-pulse-400 mt-0.5">{icon}</div>
            <div>
              <div className="text-sm font-medium leading-none text-white">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1">
                {children}
              </p>
            </div>
          </Link>
        ) : (
          <a
            ref={ref}
            className={cn(
              "flex select-none space-x-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark-700/50 focus:bg-dark-700/50",
              className
            )}
            {...props}
          >
            <div className="text-pulse-400 mt-0.5">{icon}</div>
            <div>
              <div className="text-sm font-medium leading-none text-white">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-400 mt-1">
                {children}
              </p>
            </div>
          </a>
        )}
      </NavigationMenu.Link>
    </li>
  );
});
ListItem.displayName = "ListItem";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    document.body.style.overflow = newMenuState ? 'hidden' : '';
  };

  const isActive = (path: string) => location.pathname === path;

  // Render different components for desktop and mobile
  return isMobile ? (
    <MobileNavbar
      isScrolled={isScrolled}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      isActive={isActive}
    />
  ) : (
    <DesktopNavbar isScrolled={isScrolled} isActive={isActive} />
  );
};


// --- DESKTOP NAVBAR ---
const DesktopNavbar = ({ isScrolled, isActive }: { isScrolled: boolean; isActive: (path: string) => boolean }) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center",
        isScrolled ? "py-1" : "py-3"
      )}
    >
      <div
        className={cn(
          "max-w-screen-xl w-full flex items-center justify-between h-16 px-6 transition-all duration-300 backdrop-blur-xl",
          isScrolled
            ? "bg-black/80 border-b border-gray-800/50 rounded-none md:rounded-full md:mx-6 lg:mx-12"
            : "bg-dark-900/40 rounded-full mx-4 md:mx-6 lg:mx-12"
        )}
      >
        {/* Logo - Fixed width */}
        <div className="w-[180px] flex-shrink-0">
          <Link to="/" className="flex items-center" aria-label="Flow Home">
            <img src="/logo.svg" alt="Flow Logo" className="h-13 transition-all duration-300"/>
          </Link>
        </div>

        {/* Center Navigation with Radix UI */}
        <div className="flex-grow flex justify-center">
          <NavigationMenu.Root>
            <NavigationMenu.List className="flex items-center space-x-1">
              <NavigationMenu.Item>
                <NavigationMenuLink to="/" isActive={isActive("/")}>Home</NavigationMenuLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenuLink to="/pricing" isActive={isActive("/pricing")}>Pricing</NavigationMenuLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenuLink to="/enterprise" isActive={isActive("/enterprise")}>Enterprise</NavigationMenuLink>
              </NavigationMenu.Item>

              {/* Resources Mega Menu */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex select-none items-center justify-center space-x-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-dark-800/40 hover:text-pulse-400 focus:outline-none data-[state=open]:bg-dark-800/60 data-[state=open]:text-pulse-400">
                  <span>Resources</span>
                  <ChevronDown size={16} className="transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full mt-2 w-auto animate-in fade-in-0 zoom-in-95 data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-52 data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-52">
                  <div className="grid w-[24rem] gap-3 p-4 bg-dark-800/95 backdrop-blur-md rounded-xl border border-dark-700/50 shadow-elegant">
                    <ListItem to="/documentation" title="Documentation" icon={<BookOpen size={20}/>}>
                      Explore detailed guides, tutorials, and API references for using Flow.
                    </ListItem>
                    <ListItem to="/download" title="Download Flow" icon={<Download size={20}/>}>
                      Get the latest version for Windows, macOS, and Linux.
                    </ListItem>
                     <Link to="/enterprise">
                      <ListItem title="Enterprise Solutions" icon={<Star size={20}/>}>
                          Discover advanced features and support for your team.
                      </ListItem>
                     </Link>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        {/* Right side actions - Fixed width to match logo */}
        <div className="w-[180px] flex items-center justify-end space-x-3 flex-shrink-0">
            {/* User Account Dropdown */}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="p-2 rounded-full text-gray-300 transition-colors hover:bg-dark-800/40 hover:text-pulse-400 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:ring-offset-2 focus:ring-offset-dark-900" aria-label="User menu">
                        <User size={20} />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end" className="w-48 mt-2 bg-dark-800/95 backdrop-blur-md rounded-xl border border-dark-700/50 shadow-elegant text-gray-300 p-1.5 animate-in fade-in-0 zoom-in-95">
                    <DropdownMenu.Item asChild>
                        <Link to="/login" className="flex items-center w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-dark-700/50 hover:text-pulse-300 focus:bg-dark-700/50 focus:text-pulse-300">
                            Login
                        </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <Link to="/signup" className="flex items-center w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-dark-700/50 hover:text-pulse-300 focus:bg-dark-700/50 focus:text-pulse-300">
                            Sign up
                        </Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            {/* Primary CTA */}
            <Link to="/download" className="flex items-center space-x-2 bg-pulse-500 hover:bg-pulse-600 text-white px-4 py-2 rounded-full transition-colors duration-200 shadow-lg shadow-pulse-500/10 hover:shadow-pulse-500/30 text-sm font-semibold">
                <span>Download</span>
                <Download size={16} />
            </Link>
        </div>
      </div>
    </header>
  );
};

// --- MOBILE NAVBAR & MENU ---
const MobileNavbar = ({ isScrolled, isMenuOpen, toggleMenu, isActive }: { isScrolled: boolean; isMenuOpen: boolean; toggleMenu: () => void; isActive: (path: string) => boolean }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex justify-center",
      isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50" : "bg-transparent"
    )}>
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo - Left */}
        <div className="w-[140px] flex-shrink-0">
          <Link to="/" className="flex items-center" aria-label="Flow Home">
            <img src="/logo.svg" alt="Flow Logo" className="h-15" />
          </Link>
        </div>
        
        {/* Center area - for symmetry */}
        <div className="flex-grow flex justify-center">
          {/* Empty center on mobile */}
        </div>
        
        {/* Mobile Menu Button - Right */}
        <div className="w-[140px] flex-shrink-0 flex justify-end">
          <button onClick={toggleMenu} className="p-2 text-gray-300 transition-colors rounded-full hover:bg-dark-800/40 hover:text-pulse-400" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div onClick={toggleMenu} className={cn("fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity", isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")} />
      
      {/* Slide-out Menu */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-dark-800/95 backdrop-blur-xl border-l border-dark-700/50 flex flex-col transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
          <img src="/logo.svg" alt="Flow Logo" className="h-15" />
          <button onClick={toggleMenu} className="p-2 text-gray-300 rounded-full hover:bg-dark-700/50 hover:text-pulse-400" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <MobileNavLink to="/" isActive={isActive("/")}>Home</MobileNavLink>
            <MobileNavLink to="/pricing" isActive={isActive("/pricing")}>Pricing</MobileNavLink>
            <MobileNavLink to="/enterprise" isActive={isActive("/enterprise")}>Enterprise</MobileNavLink>
            
            {/* Resources Accordion for Mobile */}
            <Accordion.Root type="single" collapsible className="w-full">
                <Accordion.Item value="resources" className="border-none">
                    <Accordion.Trigger className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-gray-300 rounded-lg hover:bg-dark-700/50 data-[state=open]:text-pulse-400 group">
                        <span>Resources</span>
                        <ChevronDown size={16} className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="pt-2 pl-4 space-y-1">
                            <MobileNavLink to="/documentation" icon={<BookOpen size={16} />} isActive={isActive("/documentation")}>Documentation</MobileNavLink>
                            <MobileNavLink to="/download" icon={<Download size={16} />} isActive={isActive("/download")}>Download App</MobileNavLink>
                            <a href="https://github.com/example/flow" target="_blank" rel="noopener noreferrer" className="flex items-center w-full px-3 py-2.5 text-base text-gray-300 rounded-lg hover:bg-dark-700/50">
                                <Code size={16} className="mr-3 text-gray-400" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </nav>

        <div className="p-4 border-t border-dark-700/50 space-y-3">
          <Link to="/login" className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg font-medium bg-dark-700/60 hover:bg-dark-700/90 text-white transition-colors">
            Login
          </Link>
          <Link to="/signup" className="flex items-center justify-center w-full bg-pulse-500 hover:bg-pulse-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-lg shadow-pulse-500/20">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

// --- Helper Components for Links ---
const NavigationMenuLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => (
  <NavigationMenu.Link asChild active={isActive}>
    <Link
      to={to}
      className={cn(
        "px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none",
        isActive
          ? "bg-dark-800/60 text-pulse-400"
          : "text-gray-300 hover:bg-dark-800/40 hover:text-pulse-400"
      )}
    >
      {children}
    </Link>
  </NavigationMenu.Link>
);

const MobileNavLink = ({ to, isActive, children, icon }: { to: string; isActive: boolean; children: React.ReactNode; icon?: React.ReactNode }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center w-full px-3 py-2.5 text-base rounded-lg transition-colors duration-200",
      isActive
        ? "bg-dark-700/70 text-pulse-400"
        : "text-gray-300 hover:bg-dark-700/50"
    )}
  >
    {icon && <span className="mr-3 text-gray-400">{icon}</span>}
    {children}
  </Link>
);

export default Navbar;
