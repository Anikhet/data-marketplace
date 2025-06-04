'use client'

import Link from "next/link";
import * as React from "react";
import { Session } from "@supabase/supabase-js";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface NavigationProps {
  session?: Session | null;
}

export default function Navigation({
  session,
}: NavigationProps) {
  const authenticatedMenuItems = session
    ? [
        { title: "Home", isLink: true, href: "/" },
        { title: "Buyer Dashboard", isLink: true, href: "/dashboard/buyer" },
        { title: "Seller Dashboard", isLink: true, href: "/dashboard/seller" },
      ]
    : [{ title: "Home", isLink: true, href: "/" }];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {authenticatedMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <Link href={item.href || ""} className={navigationMenuTriggerStyle()}>
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
