import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  category: 'interior' | 'landscape';
  price: number;
  image: string;
  glow: 'blue' | 'purple' | 'orange';
}

interface CatalogSectionProps {
  products: Product[];
  activeCategory: 'all' | 'interior' | 'landscape';
  setActiveCategory: (category: 'all' | 'interior' | 'landscape') => void;
}

export default function CatalogSection({ products, activeCategory, setActiveCategory }: CatalogSectionProps) {
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="catalog" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Каталог световых фигур</h2>
          <p className="text-muted-foreground text-lg">Выберите идеальное решение для вашего пространства</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className={activeCategory === 'all' ? 'glow-blue' : ''}
          >
            <Icon name="Grid3x3" size={18} className="mr-2" />
            Все товары
          </Button>
          <Button
            variant={activeCategory === 'interior' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('interior')}
            className={activeCategory === 'interior' ? 'glow-purple' : ''}
          >
            <Icon name="Home" size={18} className="mr-2" />
            Интерьер
          </Button>
          <Button
            variant={activeCategory === 'landscape' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('landscape')}
            className={activeCategory === 'landscape' ? 'glow-orange' : ''}
          >
            <Icon name="Trees" size={18} className="mr-2" />
            Ландшафт
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className={`group hover:shadow-2xl transition-all duration-300 glow-${product.glow}`}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
                  <Button className="w-full" variant="outline">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
