import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

const MobileMenu = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const menuSections = [
    {
      title: 'Каталог',
      key: 'catalog',
      icon: 'LayoutGrid',
      subsections: [
        {
          title: 'Интерьерное освещение',
          items: ['Люстры', 'Потолочные светильники', 'Бра', 'Торшеры', 'Встраиваемые'],
        },
        {
          title: 'Уличное освещение',
          items: ['Фасадные', 'Парковое', 'Ландшафтные', 'Архитектурная подсветка'],
        },
        {
          title: 'Коммерческое',
          items: ['Офисное', 'Торговое', 'Промышленное', 'Гостиничное'],
        },
        {
          title: 'Дизайнерское',
          items: ['Авторские светильники', 'Эксклюзив', 'Hand-made'],
        },
        {
          title: 'Мебель и декор',
          items: ['Светодиодная мебель', 'Световые МАФы'],
        },
        {
          title: 'Комплектующие',
          items: ['Лампы', 'LED-ленты', 'Блоки питания', 'Диммеры'],
        },
      ],
    },
    {
      title: 'Световая реклама',
      key: 'advertising',
      icon: 'Megaphone',
      subsections: [
        {
          title: 'Вывески',
          items: ['Световые буквы', 'Фасадные', 'Интерьерные', 'Короба'],
        },
        {
          title: 'Специальные решения',
          items: ['Неон', 'Таблички', 'Объемные буквы'],
        },
      ],
    },
    {
      title: 'Услуги',
      key: 'services',
      icon: 'Wrench',
      subsections: [
        {
          title: 'Проектирование',
          items: ['Светодизайн', 'Расчет освещенности', 'Консультация'],
        },
        {
          title: 'Монтаж',
          items: ['Установка', 'Подключение', 'Обслуживание'],
        },
      ],
    },
    {
      title: 'Для профессионалов',
      key: 'professionals',
      icon: 'Briefcase',
      subsections: [
        {
          title: 'Партнерам',
          items: ['Опт', 'Дизайнерам', 'Строителям', 'Программа лояльности'],
        },
        {
          title: 'Документация',
          items: ['Техдокументация', 'Прайс-лист', 'Сертификаты'],
        },
      ],
    },
  ];

  const simpleLinks = [
    { title: 'Производство', icon: 'Factory', link: '/production' },
    { title: 'Проекты', icon: 'Images', link: '/projects' },
    { title: 'О компании', icon: 'Info', link: '/about' },
    { title: 'Доставка и оплата', icon: 'Truck', link: '/delivery' },
    { title: 'Контакты', icon: 'MapPin', link: '/contacts' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" className="text-primary-foreground" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">LightPro</span>
              <span className="text-xs text-muted-foreground">Световые решения</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={searchOpen ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Icon name="Search" size={16} className="mr-2" />
            Поиск
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="User" size={18} />
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Icon name="ShoppingCart" size={18} />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Button>
        </div>

        {searchOpen && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="single" collapsible className="space-y-2">
            {menuSections.map((section) => (
              <AccordionItem key={section.key} value={section.key} className="border border-border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name={section.icon as any} size={18} className="text-primary" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <Accordion type="single" collapsible className="space-y-1">
                    {section.subsections.map((subsection, idx) => (
                      <AccordionItem key={idx} value={`${section.key}-${idx}`} className="border-0">
                        <AccordionTrigger className="py-2 text-sm hover:no-underline hover:text-primary">
                          {subsection.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                          <ul className="space-y-1 pl-4">
                            {subsection.items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/${section.key}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-4 space-y-2">
            {simpleLinks.map((link) => (
              <Link
                key={link.link}
                to={link.link}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Icon name={link.icon as any} size={18} className="text-primary" />
                <span className="font-medium text-foreground">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border space-y-3">
        <a
          href="tel:+74951234567"
          className="flex items-center justify-center space-x-2 text-foreground font-semibold hover:text-primary transition-colors"
        >
          <Icon name="Phone" size={18} />
          <span>+7 (495) 123-45-67</span>
        </a>
        <Button className="w-full" size="lg">
          <Icon name="PhoneCall" size={18} className="mr-2" />
          Заказать звонок
        </Button>
        <p className="text-xs text-center text-muted-foreground">Ежедневно 9:00 - 21:00</p>
      </div>
    </div>
  );
};

export default MobileMenu;
