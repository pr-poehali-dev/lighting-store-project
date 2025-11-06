import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const deliverySteps = [
  { icon: 'Package', title: 'Оформление заказа', description: 'Оставьте заявку онлайн или по телефону' },
  { icon: 'CreditCard', title: 'Оплата', description: 'Наличными, картой или безналичный расчет' },
  { icon: 'Truck', title: 'Доставка', description: 'По Екатеринбургу и всей России' },
  { icon: 'CheckCircle', title: 'Получение', description: 'Проверка товара при получении' },
];

export default function DeliverySection() {
  return (
    <section id="delivery" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Доставка и оплата</h2>
          <p className="text-muted-foreground text-lg">Простой процесс заказа в 4 шага</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {deliverySteps.map((step, index) => (
            <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary glow-blue flex items-center justify-center mx-auto mb-4">
                  <Icon name={step.icon as any} size={32} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{index + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Условия доставки</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={24} className="text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">По Екатеринбургу</h4>
                <p className="text-muted-foreground">Бесплатная доставка при заказе от 20,000 ₽</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Truck" size={24} className="text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">По России</h4>
                <p className="text-muted-foreground">Транспортными компаниями (ПЭК, СДЭК, Деловые линии)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={24} className="text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Сроки доставки</h4>
                <p className="text-muted-foreground">1-3 дня по городу, 5-14 дней по России</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
