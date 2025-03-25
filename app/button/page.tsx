import { MailIcon, CheckIcon } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Button } from "@/components/Button";

export default function ButtonPage() {
  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel button kullanımı.",
      component: <Button>Button</Button>,
      code: `<Button\n  variant="default"\n/>`,
    },
    {
      title: "Outline Variant",
      description: "Outline stilinde button kullanımı.",
      component: <Button variant="outline">Outline Button</Button>,
      code: `<Button\n  variant="outline"\n/>`,
    },
    {
      title: "Disabled Durumu",
      description: "Devre dışı bırakılmış button örneği.",
      component: <Button disabled>Disabled Button</Button>,
      code: `<Button\n  disabled\n/>`,
    },
    {
      title: "Loading Durumu",
      description: "Loading durumu ile button kullanımı.",
      component: <Button isLoading>Loading Button</Button>,
      code: `<Button\n  isLoading\n/>`,
    },
    {
      title: "Ghost Varyant",
      description: "Ghost stilinde button kullanımı.",
      component: <Button variant="ghost">Ghost Button</Button>,
      code: `<Button\n  variant="ghost"\n/>`,
    },
    {
      title: "Secondary Varyant",
      description: "Secondary stilinde button kullanımı.",
      component: <Button variant="secondary">Secondary Button</Button>,
      code: `<Button\n  variant="secondary"\n/>`,
    },
    {
      title: "Destructive Varyant",
      description: "Destructive stilinde button kullanımı.",
      component: <Button variant="destructive">Destructive Button</Button>,
      code: `<Button\n  variant="destructive"\n/>`,
    },
    {
      title: "Left Icon",
      description: "Left icon ile button kullanımı.",
      component: (
        <Button leftIcon={<MailIcon className="w-4 h-4" />}>
          Button with left icon
        </Button>
      ),
      code: `<Button\n  leftIcon={<MailIcon className="w-4 h-4" />}\n/>`,
    },
    {
      title: "Right Icon",
      description: "Right icon ile button kullanımı.",
      component: (
        <Button rightIcon={<CheckIcon className="w-4 h-4" />}>
          Button with right icon
        </Button>
      ),
      code: `<Button\n  rightIcon={<CheckIcon className="w-4 h-4" />}\n/>`,
    },
    {
      title: "Small Boyut",
      description: "Small boyut ile button kullanımı.",
      component: <Button sizeVariant="sm">Small Button</Button>,
      code: `<Button\n  sizeVariant="sm"\n/>`,
    },
    {
      title: "Medium Boyut",
      description: "Medium boyut ile button kullanımı.",
      component: <Button sizeVariant="md">Medium Button</Button>,
      code: `<Button\n  sizeVariant="md"\n/>`,
    },
    {
      title: "Large Boyut",
      description: "Large boyut ile button kullanımı.",
      component: <Button sizeVariant="lg">Large Button</Button>,
      code: `<Button\n  sizeVariant="lg"\n/>`,
    },
    {
      title: "XLarge Boyut",
      description: "XLarge boyut ile button kullanımı.",
      component: <Button sizeVariant="xl">XLarge Button</Button>,
      code: `<Button\n  sizeVariant="xl"\n/>`,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Button Bileşeni Örnekleri
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {showcases.map((showcase, index) => (
          <ComponentShowcase
            key={index}
            title={showcase.title}
            description={showcase.description}
            component={showcase.component}
            code={showcase.code}
          />
        ))}
      </div>
    </div>
  );
}
