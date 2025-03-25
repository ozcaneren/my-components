import { Loading } from "@/components/Loading";
import { ComponentShowcase } from "@/components/ComponentShowcase";

export default function LoadingPage() {
  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel loading spinner kullanımı.",
      component: <Loading />,
      code: `<Loading />`
    },
    {
      title: "Boyut Varyantları",
      description: "Farklı boyutlarda loading spinner örnekleri.",
      component: (
        <div className="flex items-center gap-4">
          <Loading sizeVariant="sm" />
          <Loading sizeVariant="md" />
          <Loading sizeVariant="lg" />
          <Loading sizeVariant="xl" />
        </div>
      ),
      code: `<Loading sizeVariant="sm" />\n<Loading sizeVariant="md" />\n<Loading sizeVariant="lg" />\n<Loading sizeVariant="xl" />`
    },
    {
      title: "Tip Varyantları",
      description: "Farklı tiplerde loading spinner örnekleri.",
      component: (
        <div className="flex items-center gap-4">
          <Loading type="spinner" />
          <Loading type="dots" />
          <Loading type="skeleton" />
        </div>
      ),
      code: `<Loading type="spinner" />\n<Loading type="dots" />\n<Loading type="skeleton" />`
    },
    {
      title: "Metin ile Kullanım",
      description: "Loading spinner'ı açıklayıcı metin ile birlikte kullanım.",
      component: (
        <div className="flex items-center gap-2">
          <Loading />
          <span>Yükleniyor...</span>
        </div>
      ),
      code: `<div className="flex items-center gap-2">\n  <Loading />\n  <span>Yükleniyor...</span>\n</div>`
    },
    {
      title: "Buton İçinde Kullanım",
      description: "Loading spinner'ı buton içerisinde kullanım örneği.",
      component: (
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md">
          <Loading sizeVariant="sm" className="" />
          <span className="text-white dark:text-black">İşleniyor</span>
        </button>
      ),
      code: `<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md">\n  <Loading size="sm" className="text-white" />\n  <span>İşleniyor</span>\n</button>`
    },
    {
      title: "Tam Sayfa Loading",
      description: "Sayfanın tamamını kaplayan loading örneği.",
      component: (
        <div className="relative h-32 w-full bg-muted/30 rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading sizeVariant="lg" />
          </div>
        </div>
      ),
      code: `<Loading size="lg" />\n`
    }
  ];

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Loading Bileşeni Örnekleri</h1>
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
