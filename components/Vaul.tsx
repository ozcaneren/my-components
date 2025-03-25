"use client";

import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import { FaCode } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { TbInputSearch, TbSelect } from "react-icons/tb";
import { BsTextareaResize, BsMenuButtonWide, BsCalendar, BsListNested } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Drawer } from "vaul";
import { VisuallyHidden } from "./VisuallyHidden";

const menuItems = [
  {
    href: "/",
    icon: <FaCode size={16} />,
    label: "Home"
  },
  {
    href: "/input",
    icon: <TbInputSearch size={16} />,
    label: "Input"
  },
  {
    href: "/textarea",
    icon: <BsTextareaResize size={16} />,
    label: "Textarea"
  },
  {
    href: "/button",
    icon: <BsMenuButtonWide size={16} />,
    label: "Button"
  },
  {
    href: "/select",
    icon: <TbSelect size={16} />,
    label: "Select"
  },
  {
    href: "/loading",
    icon: <AiOutlineLoading3Quarters size={16} className="animate-spin" />,
    label: "Loading"
  },
  {
    href: "/datetimepicker",
    icon: <BsCalendar size={16} />,
    label: "Date Time Picker"
  },
  {
    href: "/breadcrumb",
    icon: <BsListNested size={16} />,
    label: "Breadcrumb"
  }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="h-16 flex flex-row justify-between items-center md:hidden bg-background border-b border-border w-full">
      <div className="w-3/4">
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button className="flex justify-start items-center h-12 mx-4 gap-x-2" aria-label="Open menu">
              <div className="flex flex-row justify-center items-center gap-x-1">
                <span>UI Components</span>
              </div>
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-white dark:bg-[#27272a] rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                <Drawer.Title className="sr-only">
                  Navigation Menu
                </Drawer.Title>
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-center my-1 px-5">
                    <div className="mx-2">
                      <h2 className="font-medium">UI Components</h2>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        A collection of my components
                      </p>
                    </div>
                  </div>
                  <nav className="flex flex-col items-center justify-center px-3">
                    <ul className="flex flex-col items-start justify-start gap-y-3 w-full my-4">
                      {menuItems.map((item) => (
                        <li key={item.href} className="w-full">
                          <Drawer.Trigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex h-8 justify-between items-center text-sm hover:bg-gray-200 hover:rounded-md px-2",
                                pathname === item.href
                                  ? "bg-primary/10 text-primary font-medium rounded-md"
                                  : "text-gray-800 dark:text-gray-200"
                              )}
                            >
                              <div className="flex justify-center items-center">
                                {item.icon}
                                <span className="font-medium ml-2">{item.label}</span>
                              </div>
                            </Link>
                          </Drawer.Trigger>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="px-3 mt-4">
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
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
