// components/Navbar.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "../theme";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            {/* <Logo className="shrink-0" /> */}
            <h1 className="shrink-0 font-bold ml-3">SankofaFlix</h1>
            <div className="relative hidden md:block">
              <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
              <Input
                className="pl-10 flex-1 bg-slate-200/50 shadow-sm dark:bg-slate-800 border-none w-[280px] rounded-full"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="icon"
              className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
            >
              <Search className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              Sign In
            </Button>
            <Button className="rounded-full">Get Started</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;