"use client";

import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import { FaCode } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { TbInputSearch } from "react-icons/tb";
import { TbSelect } from "react-icons/tb";
import { BsCalendar, BsListNested, BsTextareaResize } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsMenuButtonWide } from "react-icons/bs";

const menuItems = [
  {
    href: "/",
    icon: <FaCode className="w-5 h-5" />,
    label: "Home",
  },
  {
    href: "/input",
    icon: <TbInputSearch className="w-5 h-5" />,
    label: "Input",
  },
  {
    href: "/textarea",
    icon: <BsTextareaResize className="w-5 h-5" />,
    label: "Textarea",
  },
  {
    href: "/button",
    icon: <BsMenuButtonWide className="w-5 h-5" />,
    label: "Button",
  },
  {
    href: "/select",
    icon: <TbSelect className="w-5 h-5" />,
    label: "Select",
  },
  {
    href: "/datetimepicker",
    icon: <BsCalendar className="w-5 h-5" />,
    label: "Date Time Picker",
  },
  {
    href: "/breadcrumb",
    icon: <BsListNested className="w-5 h-5" />,
    label: "Breadcrumb",
  },
  {
    href: "/loading",
    icon: (
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
      </div>
    ),
    label: "Loading",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:fixed h-full w-64 xl:w-80 border-r flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-center font-medium text-foreground">
              My Components
            </h1>
            <p className="text-xs text-foreground">
              A collection of my components
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:text-foreground hover:bg-muted",
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground"
                )}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Theme Switcher */}
      <div className="p-4 border-t">
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className="w-full justify-center"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
