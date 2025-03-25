import { Input } from "@/components/Input";
import { MailIcon, CheckIcon } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";

export default function InputPage() {
  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel input kullanımı. Sadece placeholder özelliği ile.",
      component: <Input placeholder="İsminiz" className="w-full" />,
      code: `<Input\n  placeholder="İsminiz"\n  className="w-full"\n/>`
    },
    {
      title: "Label ile Kullanım",
      description: "Input üzerinde açıklayıcı label ile kullanım.",
      component: <Input label="Email" placeholder="ornek@email.com" className="w-full" />,
      code: `<Input\n  label="Email"\n  placeholder="ornek@email.com"\n  className="w-full"\n/>`
    },
    {
      title: "Hata Durumu",
      description: "Hata mesajı gösterimi ile input kullanımı.",
      component: <Input error="Lütfen geçerli bir değer giriniz" className="w-full" />,
      code: `<Input\n  error="Lütfen geçerli bir değer giriniz"\n  className="w-full"\n/>`
    },
    {
      title: "İkonlu Kullanım",
      description: "Sağ ve sol tarafta ikon içeren input örneği.",
      component: (
        <Input 
          leftIcon={<MailIcon className="w-4 h-4" />} 
          rightIcon={<CheckIcon className="w-4 h-4" />} 
          placeholder="Email adresiniz" 
          className="w-full"
        />
      ),
      code: `<Input\n  leftIcon={<MailIcon className="w-4 h-4" />}\n  rightIcon={<CheckIcon className="w-4 h-4" />}\n  placeholder="Email adresiniz"\n  className="w-full"\n/>`
    },
    {
      title: "Boyut Varyantı",
      description: "Küçük boyutlu input örneği.",
      component: <Input sizeVariant="sm" placeholder="Küçük input" className="w-full" />,
      code: `<Input\n  sizeVariant="sm"\n  placeholder="Küçük input"\n  className="w-full"\n/>`
    },
    {
      title: "Outline Varyantı",
      description: "Outline stilinde input örneği.",
      component: <Input variant="outline" placeholder="Outline input" className="w-full" />,
      code: `<Input\n  variant="outline"\n  placeholder="Outline input"\n  className="w-full"\n/>`
    },
    {
      title: "Disabled Durumu",
      description: "Devre dışı bırakılmış input örneği.",
      component: <Input disabled value="Düzenlenemez input" className="w-full" />,
      code: `<Input\n  disabled\n  value="Düzenlenemez input"\n  className="w-full"\n/>`
    }
  ];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Input Bileşeni Örnekleri</h1>
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