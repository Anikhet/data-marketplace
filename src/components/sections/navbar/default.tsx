'use client'

import { Menu } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import LaunchUI from "../../logos/launch-ui";
import { Button, type ButtonProps } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "peeker.ai",
  homeUrl = "/",
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const { signOut } = useAuth();
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  const defaultActions: NavbarActionProps[] = session
    ? [
        {
          text: session.user.email || "Account",
          href: "#",
          isButton: false,
          iconRight: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]
    : [
        {
          text: "Sign in",
          href: "/login",
          isButton: true,
          variant: "default",
        },
      ];

  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <Link
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </Link>
            {showNavigation && (customNavigation || <Navigation session={session} />)}
          </NavbarLeft>
          <NavbarRight>
            {defaultActions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  asChild
                >
                  <Link href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </Link>
                </Button>
              ) : (
                <div key={index} className="hidden items-center md:flex">
                  <Link
                    href={action.href}
                    className="text-sm"
                  >
                    {action.text}
                  </Link>
                  {action.iconRight}
                </div>
              )
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </Link>
                  {session && (
                    <button
                      onClick={handleSignOut}
                      className="text-muted-foreground hover:text-foreground text-left"
                    >
                      Sign out
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
