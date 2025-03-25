import { Textarea } from "@/components/Textarea";
import { ComponentShowcase } from "@/components/ComponentShowcase";

export default function TextareaPage() {
  const showcases = [
    {
      title: "Basit Kullanım",
      description:
        "En temel textarea kullanımı. Sadece placeholder özelliği ile.",
      component: <Textarea placeholder="Mesajınız..." />,
      code: `<Textarea\n  placeholder="Mesajınız..."\n/>`,
    },
    {
      title: "Label ile Kullanım",
      description: "Textarea üzerinde açıklayıcı label ile kullanım.",
      component: <Textarea label="Mesaj" placeholder="Mesajınız..." />,
      code: `<Textarea\n  label="Mesaj"\n  placeholder="Mesajınız..."\n/>`,
    },
    {
      title: "Hata Durumu",
      description: "Hata mesajı gösterimi ile textarea kullanımı.",
      component: <Textarea error="Bu alan boş bırakılamaz" />,
      code: `<Textarea\n  error="Bu alan boş bırakılamaz"\n/>`,
    },
    {
      title: "Farklı Variant",
      description: "Farklı variant ile textarea kullanımı.",
      component: <Textarea variant="outline" placeholder="Outline textarea" />,
      code: `<Textarea\n  variant="outline"\n  placeholder="Outline textarea"\n/>`,
    },
    {
      title: "Farklı Boyut",
      description: "Farklı boyut ile textarea kullanımı.",
      component: <Textarea sizeVariant="lg" placeholder="Large textarea" />,
      code: `<Textarea\n  sizeVariant="lg"\n  placeholder="Large textarea"\n/>`,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Textarea Bileşeni Örnekleri
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
