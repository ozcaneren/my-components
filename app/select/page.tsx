import Select  from "@/components/Select";
import { ComponentShowcase } from "@/components/ComponentShowcase"

export default function SelectPage() {
  const options = [
    { label: "Seçenek 1", value: "option1" },
    { label: "Seçenek 2", value: "option2" },
    { label: "Seçenek 3", value: "option3" },
  ]

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel select kullanımı. Sadece placeholder özelliği ile.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },

    {
      title: "Label ile Kullanım",
      description: "Select üzerinde açıklayıcı label ile kullanım.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },

    {
      title: "Hata Durumu",
      description: "Hata mesajı gösterimi ile select kullanımı.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },

    {
      title: "Farklı Variant",
      description: "Farklı variant ile select kullanımı.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },

    {
      title: "Farklı Boyut",
      description: "Farklı boyut ile select kullanımı.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },

    {
      title: "Disabled Durumu",
      description: "Devre dışı bırakılmış select örneği.",
      component: <Select placeholder="Seçiniz" options={options} />,
      code: `<Select\n  placeholder="Seçiniz"\n  options={options}\n/>`,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Bileşeni Örnekleri</h1>
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