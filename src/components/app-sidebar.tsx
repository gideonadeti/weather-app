"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const weatherUnits = [
  {
    name: "TEMPERATURE",
    options: ["Celsius (°C)", "Fahrenheit (°F)"],
  },
  {
    name: "WIND SPEED",
    options: ["km/h", "mph"],
  },
  {
    name: "PRESSURE",
    options: ["mb", "in"],
  },
  {
    name: "PRECIPITATION",
    options: ["Millimeters (mm)", "Inches (in)"],
  },
  {
    name: "VISIBILITY",
    options: ["Kilometers (km)", "Miles (mi)"],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {weatherUnits.map((unit) => (
          <SidebarGroup key={unit.name}>
            <SidebarGroupLabel>{unit.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <Tabs defaultValue={unit.options[0]}>
                <TabsList>
                  {unit.options.map((option) => (
                    <TabsTrigger key={option} value={option}>
                      {option}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
