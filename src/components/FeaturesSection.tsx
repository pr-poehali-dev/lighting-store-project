import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Zap', title: 'Энергоэффективность', description: 'Светодиодные технологии последнего поколения', glow: 'blue' },
  { icon: 'Droplets', title: 'Влагозащита', description: 'Класс защиты IP65-IP68 для уличного использования', glow: 'purple' },
  { icon: 'Palette', title: 'RGB подсветка', description: '16 миллионов цветов и различные режимы свечения', glow: 'orange' },
  { icon: 'Wifi', title: 'Умное управление', description: 'Управление через мобильное приложение', glow: 'blue' },
  { icon: 'Shield', title: 'Долговечность', description: 'Срок службы до 50,000 часов работы', glow: 'purple' },
  { icon: 'Sparkles', title: 'Эксклюзивный дизайн', description: 'Уникальные формы и индивидуальные проекты', glow: 'orange' },
];

export default function FeaturesSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Почему выбирают нас</h2>
          <p className="text-muted-foreground text-lg">Преимущества наших световых решений</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 glow-${feature.glow}`}>
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary glow-${feature.glow} flex items-center justify-center mb-4`}>
                  <Icon name={feature.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
