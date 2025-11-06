import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Product } from './CatalogSection';

interface OrderSectionProps {
  products: Product[];
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  formData: { name: string; phone: string; email: string; message: string };
  setFormData: (data: { name: string; phone: string; email: string; message: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function OrderSection({
  products,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  formData,
  setFormData,
  onSubmit
}: OrderSectionProps) {
  const selectedProductData = products.find(p => p.id.toString() === selectedProduct);
  const totalPrice = selectedProductData ? selectedProductData.price * quantity : 0;

  return (
    <section id="contacts" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Оформить заказ</h2>
          <p className="text-muted-foreground text-lg">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product">Выберите товар</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Выберите светильник" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - {product.price.toLocaleString('ru-RU')} ₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Количество</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              {selectedProduct && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@mail.ru"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Комментарий к заказу</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Дополнительные пожелания..."
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full glow-blue">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={24} className="text-primary" />
              <div className="text-left">
                <p className="font-semibold">Телефон</p>
                <p className="text-muted-foreground">+7 (343) 000-00-00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={24} className="text-primary" />
              <div className="text-left">
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">info@светильники.рф</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={24} className="text-primary" />
              <div className="text-left">
                <p className="font-semibold">Адрес</p>
                <p className="text-muted-foreground">г. Екатеринбург, сухой порт</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
