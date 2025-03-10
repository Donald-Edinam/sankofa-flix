"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "../theme";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { user, authenticated, logout } = useAuth(); 

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            <Link href={"/"}>
              <h1 className="shrink-0 font-bold ml-3">SankofaFlix</h1>
            </Link>
            <div className={`relative ${isSearchOpen ? 'block' : 'hidden'} md:block`}>
              <form onSubmit={handleSearch}>
                <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
                <Input
                  className="pl-10 flex-1 bg-slate-200/50 shadow-sm dark:bg-slate-800 border-none w-[280px] rounded-full"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="icon"
              className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="!h-5 !w-5" />
            </Button>

            {authenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user?.username}</span>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => router.push("/favorites")}
                  >
                    Favorites
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex rounded-full"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="rounded-full"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile search dropdown */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 right-0 p-4 bg-background border-t border-x dark:border-slate-700/70 rounded-b-lg md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <Input
                className="flex-1 rounded-l-full border-r-0"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-r-full">
                Search
              </Button>
            </form>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;