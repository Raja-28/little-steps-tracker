import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Brain, Info, Settings } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: Brain },
    { to: "/about", label: "About", icon: Info },
    { to: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px]">
        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <link.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
