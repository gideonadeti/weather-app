import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <SidebarFooter />
    </Sidebar>
  );
}
