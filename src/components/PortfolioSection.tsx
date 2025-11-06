import { Card, CardContent } from '@/components/ui/card';

const portfolioItems = [
  { image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/63e7c58d-370f-4123-8602-2c453d548835.jpg', title: 'Ресторан "Свет"', category: 'Интерьер' },
  { image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/d7c39e11-eaf7-4598-819d-223ee360136d.jpg', title: 'Парк культуры', category: 'Ландшафт' },
  { image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/6358167e-748a-447b-9d88-cf6f7f342798.jpg', title: 'Отель "Люкс"', category: 'Интерьер' },
  { image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/63e7c58d-370f-4123-8602-2c453d548835.jpg', title: 'Загородный дом', category: 'Ландшафт' },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Наши проекты</h2>
          <p className="text-muted-foreground text-lg">Реализованные световые решения</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-0 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
