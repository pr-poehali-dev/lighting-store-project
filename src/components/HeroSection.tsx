import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse-glow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">📍сухой порт г. Екатеринбург • Доставка по РФ</Badge>
          <h1 className="lg:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mx-0 font-extralight text-left text-3xl">СВЕТИЛЬНИКИ: ОТ СТАНДАРТНЫХ МОДЕЛЕЙ ДО ЭКСКЛЮЗИВНЫХ СВЕТОВЫХ ФОРМ.</h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-left">Добро пожаловать в Магазин Светильников . РФ. <br />💡Здесь вы найдете светильники для интерьерных, экстерьерных и ландшафтных проектов. <br />🏮Мы поставляем продукцию ведущих мировых брендов со склада и под заказ, а также предлагаем модели собственного производства. <br /> 💫Поможем создать световое решение, которое подчеркнет вашу индивидуальность.</p>
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
  );
}
