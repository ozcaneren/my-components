"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import Select from "@/components/Select";
import { DateTimePicker } from "@/components/DateTimePicker";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaGithub, FaEnvelope } from "react-icons/fa6";
import { TbComponents } from "react-icons/tb";
import { HomeIcon, PackageIcon, ZapIcon } from "lucide-react";

export default function Home() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="min-h-screen w-full py-8">
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <TbComponents className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Modern UI Components
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Özelleştirilebilir, erişilebilir ve tema uyumlu React komponentleri
          </p>
          <div className="flex gap-2 md:gap-4 justify-center">
            <Link href="/input">
              <Button sizeVariant="md">Komponentleri Keşfet</Button>
            </Link>
            <Link href="https://github.com/ozcaneren">
              <Button
                sizeVariant="md"
                variant="secondary"
                leftIcon={<FaGithub size={16} />}
              >
                GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            title="Input"
            description="İkon desteği, farklı boyutlar ve varyantlar ile modern input komponenti"
            preview={
              <Input
                placeholder="örnek@email.com"
                leftIcon={<FaEnvelope size={16} />}
              />
            }
            href="/input"
          />
          <FeatureCard
            title="Button"
            description="Özelleştirilebilir, farklı varyantlarda buton komponenti"
            preview={
              <div className="flex gap-2">
                <Button sizeVariant="md">Button</Button>
                <Button sizeVariant="md" variant="destructive">
                  Button
                </Button>
              </div>
            }
            href="/button"
          />
          <FeatureCard
            title="Loading"
            description="Çeşitli boyut ve renklerde loading komponenti"
            preview={
              <div className="flex gap-4">
                <Loading sizeVariant="sm" />
                <Loading />
                <Loading sizeVariant="lg" />
                <Loading sizeVariant="xl" />
              </div>
            }
            href="/loading"
          />
          <FeatureCard
            title="Select"
            description="Seçim yapılabilen select komponenti"
            preview={<Select options={[]} placeholder="Seçiniz" />}
            href="/select"
          />
          <FeatureCard
            title="Date & Time Picker"
            description="Tarih ve saat seçimi için modern ve kullanışlı komponent"
            preview={
              <div className="w-full">
                <DateTimePicker
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </div>
            }
            href="/datetimepicker"
          />
          <FeatureCard
            title="Breadcrumb"
            description="Özelleştirilebilir ayraçlar ve ikonlar ile breadcrumb komponenti"
            preview={
              <Breadcrumb
                items={[
                  {
                    label: "A",
                    href: "/",
                    icon: <HomeIcon className="h-4 w-4" />,
                  },
                  {
                    label: "B",
                    href: "/products",
                    icon: <PackageIcon className="h-4 w-4" />,
                  },
                  {
                    label: "C",
                    icon: <ZapIcon className="h-4 w-4" />,
                  },
                ]}
                showIcons={true}
              />
            }
            href="/breadcrumb"
          />
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <FeatureList
            title="Modern Tasarım"
            items={[
              "Tailwind CSS ile stillendirilmiş",
              "Light/Dark tema desteği",
              "Responsive tasarım",
              "Modern ve minimalist UI",
            ]}
          />
          <FeatureList
            title="Erişilebilirlik"
            items={[
              "ARIA standartlarına uygun",
              "Klavye navigasyonu",
              "Screen reader uyumlu",
              "Yüksek kontrast desteği",
            ]}
          />
          <FeatureList
            title="Geliştirici Dostu"
            items={[
              "TypeScript ile yazılmış",
              "Detaylı dokümantasyon",
              "Kolay entegrasyon",
              "Özelleştirilebilir API",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  preview,
  href,
}: {
  title: string;
  description: string;
  preview: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="group p-6 rounded-xl border bg-background hover:shadow-md transition-all h-full">
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-center p-4 bg-muted/90 rounded-lg">
          {preview}
        </div>
      </div>
    </Link>
  );
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-muted-foreground">
            <svg
              className="mr-2 h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
