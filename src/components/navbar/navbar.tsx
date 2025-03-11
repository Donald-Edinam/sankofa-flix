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
      <nav className="fixed top-0 inset-x-0 h-16 bg-background border-b dark:border-slate-700/70 z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl overflow-hidden">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href={"/"}>
              <h1 className="shrink-0 font-bold text-lg sm:text-xl">SankofaFlix</h1>
            </Link>
            <div className={`relative ${isSearchOpen ? 'block' : 'hidden'} md:block`}>
              <form onSubmit={handleSearch} className="flex items-center">
                <Search className="h-5 w-5 absolute inset-y-0 my-auto left-3 text-muted-foreground" />
                <Input
                  className="pl-10 flex-1 bg-slate-200/50 shadow-sm dark:bg-slate-800 border-none w-[200px] sm:w-[280px] rounded-full"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {authenticated ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:inline">{user?.username}</span>
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
          <div className="absolute top-16 left-0 right-0 p-4 bg-background border-b dark:border-slate-700/70 md:hidden">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                className="flex-1 rounded-full"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;