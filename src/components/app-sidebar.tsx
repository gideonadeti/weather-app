"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTempStore } from "@/app/stores/temp";
import { useWindStore } from "@/app/stores/wind";
import { usePressureStore } from "@/app/stores/pressure";
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
    options: [
      { value: "temp_c", unit: "°C" },
      { value: "temp_f", unit: "°F" },
    ],
  },
  {
    name: "WIND SPEED",
    options: [
      { value: "wind_kph", unit: "km/h" },
      { value: "wind_mph", unit: "mph" },
    ],
  },
  {
    name: "PRESSURE",
    options: [
      { value: "pressure_mb", unit: "mb" },
      { value: "pressure_in", unit: "in" },
    ],
  },
  {
    name: "PRECIPITATION",
    options: [
      { value: "precip_mm", unit: "mm" },
      { value: "precip_in", unit: "in" },
    ],
  },
  {
    name: "VISIBILITY",
    options: [
      { value: "vis_km", unit: "km" },
      { value: "vis_miles", unit: "mi" },
    ],
  },
];

export function AppSidebar() {
  const { setTemp } = useTempStore();
  const { setWind } = useWindStore();
  const { setPressure } = usePressureStore();

  function handleUnitChange(unitName: string, value: string) {
    switch (unitName) {
      case "TEMPERATURE":
        setTemp(value as "temp_c" | "temp_f");
        break;
      case "WIND SPEED":
        setWind(value as "wind_kph" | "wind_mph");
        break;
      case "PRESSURE":
        setPressure(value as "pressure_mb" | "pressure_in");
        break;
      default:
        break;
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        {weatherUnits.map((unit) => (
          <SidebarGroup key={unit.name}>
            <SidebarGroupLabel>{unit.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <Tabs
                defaultValue={unit.options[0].value}
                onValueChange={(value) => handleUnitChange(unit.name, value)}
              >
                <TabsList>
                  {unit.options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.unit}
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
