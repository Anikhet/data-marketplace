"use client";

// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

import Glow from "@/components/ui/glow";
import { cn } from "@/lib/utils";


import { useListingsContext } from "@/contexts/listings-context";
import SearchBar from "./SearchBar";


// interface HeroAction {
//   text: string;
//   href: string;
//   icon?: React.ReactNode;
//   variant?: "default" | "glow";
// }

export function HeroSection() {
  const badge = {
    text: " ",
    action: {
      text: "Learn more",
      href: "/docs",
    },
  };
  const title = "The Data Marketplace for Hard-to-Find Leads";
  const description =
    "Buy, sell, and request exclusive B2B contact lists enriched by AI. Verified, GTM-ready, and built for urgency — powered by Peeker’s scraping infrastructure.";
  //   const actions: HeroAction[] = [
  //     {
  //       text: "Get Started",
  //       href: "/docs/getting-started",
  //       variant: "default",
  //     },
  //     {
  //       text: "GitHub",
  //       href: " ",

  //         variant: "glow",
  //     },
  //   ];

  // const imageSrc = resolvedTheme === "light" ? image.light : image.dark;
  const { setSearchQuery } = useListingsContext();
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "",
        " pb-0"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 pt-10 sm:gap-24  h-screen ">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 max-w-4xl inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-2xl sm:leading-tight md:text-7xl md:leading-tight">
            
           {title}
   
          </h1>
                    

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-shadow-brand-foreground opacity-0 delay-100 sm:text-lg">
            {description}
          </p>

          

          {/* Actions
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
              {actions.map((action, index) => (
                <Button key={index} variant={action.variant} size="lg" asChild>
                  <a href={action.href} className="flex items-center gap-2">
                    {action.icon}
                    {action.text}
                  </a>
                </Button>
              ))}
            </div>
          </div> */}

          {/* Image with Glow */}

          <div   className=" z-20 w-full  " >
            <SearchBar onSearch={setSearchQuery} />
         
          </div>
   <Glow
            variant="center"
            className="animate-appear-zoom opacity-0 delay-1000"
          />
          
        </div>
       
      </div>
    </section>
  );
}
