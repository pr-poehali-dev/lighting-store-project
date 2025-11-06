import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const { toast } = useToast();

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
                <h1 className="font-bold text-xs">Магазин Светильников . РФ</h1>
                <p className="text-xs text-muted-foreground">ВАША АРХИТЕКТУРА СВЕТА</p>
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
            <h1 className="lg:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-left mx-0 text-4xl font-extralight">СВЕТИЛЬНИКИ: ОТ СТАНДАРТНЫХ МОДЕЛЕЙ ДО ЭКСКЛЮЗИВНЫХ СВЕТОВЫХ ФОРМ.</h1>
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

      <section id="portfolio" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Наши проекты</h2>
            <p className="text-muted-foreground text-lg">Реализованные решения для бизнеса и частных клиентов</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Ресторан "Панорама"',
                desc: 'Атмосферное освещение зала световыми кубами с синей подсветкой',
                image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/7e46c941-e632-4b45-b672-cc0b5c38f31a.jpg',
                category: 'Интерьер',
                items: '24 световых куба'
              },
              {
                title: 'Отель "Премиум"',
                desc: 'Кашпо с подсветкой в холле и лобби-зоне',
                image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/0056a34b-79c3-4f8d-bd88-3beba6f98944.jpg',
                category: 'Интерьер',
                items: '18 кашпо'
              }
            ].map((project, index) => (
              <Card 
                key={project.title}
                className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-medium">{project.items}</span>
                    <Button variant="outline" size="sm">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">О компании</h2>
              <p className="text-muted-foreground text-lg">Эксперты в области световых решений</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-4">МагазинСветильников — ваш надёжный партнёр</h3>
                <p className="text-muted-foreground mb-4">
                  Мы специализируемся на поставке профессиональных светодиодных фигур для интерьера и ландшафтного дизайна. 
                  Наш склад находится в Екатеринбурге, откуда мы осуществляем доставку по всей России.
                </p>
                <p className="text-muted-foreground mb-4">
                  За годы работы мы реализовали более 150 проектов: от частных домов до крупных ресторанов, отелей и 
                  общественных пространств. Наши световые решения создают уникальную атмосферу и подчёркивают индивидуальность каждого проекта.
                </p>
                <p className="text-muted-foreground">
                  Мы работаем только с проверенными производителями, предоставляем гарантию на всю продукцию 
                  и консультируем на всех этапах — от выбора до установки.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <p className="text-sm text-muted-foreground">Реализованных проектов</p>
                </Card>
                <Card className="p-6 text-center border-border/50">
                  <div className="text-4xl font-bold text-secondary mb-2">5 лет</div>
                  <p className="text-sm text-muted-foreground">На рынке</p>
                </Card>
                <Card className="p-6 text-center border-border/50">
                  <div className="text-4xl font-bold text-accent mb-2">2 года</div>
                  <p className="text-sm text-muted-foreground">Гарантия</p>
                </Card>
                <Card className="p-6 text-center border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">Монтаж</div>
                  <p className="text-sm text-muted-foreground">Под ключ</p>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Target',
                  title: 'Наша миссия',
                  desc: 'Делать световой дизайн доступным для каждого, создавая продукты высочайшего качества'
                },
                {
                  icon: 'Users',
                  title: 'Наша команда',
                  desc: 'Профессионалы с опытом в освещении, дизайне и архитектуре'
                },
                {
                  icon: 'Award',
                  title: 'Наши ценности',
                  desc: 'Качество, надёжность, индивидуальный подход к каждому клиенту'
                }
              ].map((item, index) => (
                <Card 
                  key={item.title}
                  className="p-6 border-border/50 hover:border-primary/50 transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary glow-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={item.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Наша команда</h2>
            <p className="text-muted-foreground text-lg">Профессионалы, которые создают световые решения</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Михаил Соколов',
                role: 'Главный дизайнер',
                desc: 'Специалист по световому дизайну с 10-летним опытом',
                image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/cb03bb29-0b54-4b82-bf74-66dfd9033477.jpg',
                contact: 'telegram'
              },
              {
                name: 'Анна Петрова',
                role: 'Менеджер по продажам',
                desc: 'Поможет подобрать идеальное решение для вашего проекта',
                image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/1823df62-fcb8-4368-b246-22636769a088.jpg',
                contact: 'phone'
              },
              {
                name: 'Дмитрий Иванов',
                role: 'Технический специалист',
                desc: 'Консультирует по установке и техническим характеристикам',
                image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/1175dc7b-faf0-49da-a3e3-355e072a19f4.jpg',
                contact: 'mail'
              }
            ].map((member, index) => (
              <Card 
                key={member.name}
                className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{member.desc}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon 
                      name={member.contact === 'telegram' ? 'MessageCircle' : member.contact === 'phone' ? 'Phone' : 'Mail'} 
                      size={16} 
                      className="mr-2" 
                    />
                    Связаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">Что говорят о нас</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Алексей Морозов',
                role: 'Владелец ресторана',
                text: 'Световые кубы полностью преобразили атмосферу зала. Гости в восторге от необычного освещения!',
                rating: 5
              },
              {
                name: 'Ирина Смирнова',
                role: 'Дизайнер интерьеров',
                text: 'Качественные изделия, отличный сервис. Работаем уже 2 года на постоянной основе.',
                rating: 5
              },
              {
                name: 'Дмитрий Волков',
                role: 'Частный клиент',
                text: 'Установили световые шары в саду. Вечером участок выглядит просто волшебно! Рекомендую.',
                rating: 5
              }
            ].map((review, index) => (
              <Card 
                key={review.name}
                className="p-6 border-border/50 hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Быстрый заказ</h2>
              <p className="text-muted-foreground text-lg">Рассчитайте стоимость и оставьте заявку</p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Калькулятор стоимости</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product">Выберите товар</Label>
                        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                          <SelectTrigger id="product">
                            <SelectValue placeholder="Выберите из каталога" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.id.toString()}>
                                {product.name} - {product.price.toLocaleString('ru-RU')} ₽
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="quantity">Количество</Label>
                        <Input 
                          id="quantity" 
                          type="number" 
                          min="1" 
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>

                      <div className="mt-6 p-6 bg-primary/10 rounded-lg border border-primary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-muted-foreground">Стоимость товара:</span>
                          <span className="font-semibold">
                            {selectedProduct 
                              ? (products.find(p => p.id.toString() === selectedProduct)?.price || 0).toLocaleString('ru-RU')
                              : '0'} ₽
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-muted-foreground">Количество:</span>
                          <span className="font-semibold">{quantity} шт.</span>
                        </div>
                        <div className="border-t border-primary/30 pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">
                              {selectedProduct
                                ? ((products.find(p => p.id.toString() === selectedProduct)?.price || 0) * quantity).toLocaleString('ru-RU')
                                : '0'} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-6">Контактные данные</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <Input 
                          id="name" 
                          placeholder="Ваше имя"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Комментарий</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Дополнительная информация о заказе"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <Button 
                        className="w-full glow-blue" 
                        size="lg"
                        onClick={() => {
                          if (!formData.name || !formData.phone) {
                            toast({ title: 'Заполните обязательные поля', description: 'Имя и телефон обязательны для заказа', variant: 'destructive' });
                            return;
                          }
                          if (!selectedProduct) {
                            toast({ title: 'Выберите товар', description: 'Необходимо выбрать товар из каталога', variant: 'destructive' });
                            return;
                          }
                          toast({ title: 'Заявка отправлена!', description: 'Мы свяжемся с вами в ближайшее время' });
                          setFormData({ name: '', phone: '', email: '', message: '' });
                          setSelectedProduct('');
                          setQuantity(1);
                        }}
                      >
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 lg:py-24">
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
                  <h3 className="font-bold">МагазинСветильников</h3>
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
                  info@magazinsvetilnikov.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 МагазинСветильников. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}