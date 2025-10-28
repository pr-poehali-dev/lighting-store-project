import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: 'interior' | 'landscape';
  price: number;
  image: string;
  glow: 'blue' | 'purple' | 'orange';
}

const products: Product[] = [
  { id: 1, name: 'Светящийся куб 40x40', category: 'interior', price: 12500, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/63e7c58d-370f-4123-8602-2c453d548835.jpg', glow: 'blue' },
  { id: 2, name: 'Светодиодный шар 50см', category: 'interior', price: 15000, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/d7c39e11-eaf7-4598-819d-223ee360136d.jpg', glow: 'purple' },
  { id: 3, name: 'Кашпо с подсветкой', category: 'interior', price: 18000, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/6358167e-748a-447b-9d88-cf6f7f342798.jpg', glow: 'orange' },
  { id: 4, name: 'Уличный куб 60x60', category: 'landscape', price: 22000, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/63e7c58d-370f-4123-8602-2c453d548835.jpg', glow: 'blue' },
  { id: 5, name: 'Садовый шар 80см', category: 'landscape', price: 28000, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/d7c39e11-eaf7-4598-819d-223ee360136d.jpg', glow: 'purple' },
  { id: 6, name: 'Столб световой 120см', category: 'landscape', price: 32000, image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/6358167e-748a-447b-9d88-cf6f7f342798.jpg', glow: 'orange' },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'landscape'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const navItems = [
    { label: 'Главная', href: '#home' },
    { label: 'Каталог', href: '#catalog' },
    { label: 'Интерьер', href: '#interior' },
    { label: 'Ландшафт', href: '#landscape' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Доставка', href: '#delivery' },
    { label: 'О нас', href: '#about' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary glow-blue flex items-center justify-center">
                <Icon name="Lightbulb" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">LightForms</h1>
                <p className="text-xs text-muted-foreground">Световые решения</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-2 animate-fade-in">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <section id="home" className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">
              Екатеринбург • Доставка по России
            </Badge>
            <h1 className="text-4xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Световые фигуры для интерьера и ландшафта
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональные светодиодные решения: кубы, шары, кашпо и уличные светильники. 
              Создаём атмосферу света в вашем пространстве.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="glow-blue group">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden bg-muted/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${product.glow === 'blue' ? 'primary' : product.glow === 'purple' ? 'secondary' : 'accent'}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
                    {product.category === 'interior' ? 'Интерьер' : 'Ландшафт'}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <Button size="sm" className={`glow-${product.glow}`}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Zap', title: 'RGB подсветка', desc: '16 млн цветов', glow: 'blue' },
              { icon: 'Shield', title: 'IP65', desc: 'Защита от влаги', glow: 'purple' },
              { icon: 'Truck', title: 'Доставка', desc: 'По всей России', glow: 'orange' },
              { icon: 'Award', title: 'Гарантия', desc: '2 года', glow: 'blue' },
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="text-center p-6 border-border/50 hover:border-primary/50 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary glow-${feature.glow} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={feature.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary glow-blue flex items-center justify-center">
                  <Icon name="Lightbulb" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold">LightForms</h3>
                  <p className="text-xs text-muted-foreground">Световые решения</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональные световые фигуры для интерьера и ландшафта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#interior" className="hover:text-primary transition-colors">Интерьер</a></li>
                <li><a href="#landscape" className="hover:text-primary transition-colors">Ландшафт</a></li>
                <li><a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#delivery" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Екатеринбург
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (343) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@lightforms.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 LightForms. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}