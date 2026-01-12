import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface MegaMenuProps {
  menuKey: string;
}

const MegaMenu = ({ menuKey }: MegaMenuProps) => {
  const catalogMenu = [
    {
      title: 'Интерьерное освещение',
      icon: 'Home',
      items: [
        'Люстры',
        'Потолочные светильники',
        'Настенные светильники (бра)',
        'Торшеры и настольные лампы',
        'Встраиваемые светильники',
        'Трековые системы',
      ],
    },
    {
      title: 'Уличное освещение',
      icon: 'Trees',
      items: [
        'Фасадные светильники',
        'Парковое освещение',
        'Ландшафтные светильники',
        'Архитектурная подсветка',
        'Световые столбы',
      ],
    },
    {
      title: 'Коммерческое освещение',
      icon: 'Building2',
      items: [
        'Офисное освещение',
        'Торговое освещение',
        'Промышленное освещение',
        'Гостиничное освещение',
      ],
    },
    {
      title: 'Дизайнерское освещение',
      icon: 'Sparkles',
      items: [
        'Авторские светильники',
        'Эксклюзивные коллекции',
        'Hand-made освещение',
      ],
    },
    {
      title: 'Световая мебель и декор',
      icon: 'Sofa',
      items: [
        'Светодиодная мебель',
        'Световые МАФы',
        'Декоративные объекты',
      ],
    },
    {
      title: 'Комплектующие',
      icon: 'Plug',
      items: [
        'Лампы и источники света',
        'Светодиодные ленты',
        'Блоки питания',
        'Диммеры и контроллеры',
      ],
    },
  ];

  const advertisingMenu = [
    {
      title: 'Световые вывески',
      icon: 'Store',
      items: [
        'Световые буквы',
        'Фасадные вывески',
        'Интерьерные вывески',
        'Световые короба',
      ],
    },
    {
      title: 'Специальные решения',
      icon: 'Zap',
      items: [
        'Неоновая реклама',
        'Информационные таблички',
        'Объемные буквы',
        'LED-экраны',
      ],
    },
  ];

  const servicesMenu = [
    {
      title: 'Проектирование',
      icon: 'Ruler',
      items: [
        'Проектирование освещения',
        'Светодизайн интерьера',
        'Расчет освещенности',
        'Консультация светодизайнера',
      ],
    },
    {
      title: 'Монтаж и обслуживание',
      icon: 'Wrench',
      items: [
        'Монтаж и установка',
        'Подключение и настройка',
        'Гарантийное обслуживание',
        'Техническая поддержка',
      ],
    },
  ];

  const professionalsMenu = [
    {
      title: 'Партнерам',
      icon: 'Handshake',
      items: [
        'Оптовым покупателям',
        'Дизайнерам и архитекторам',
        'Строительным компаниям',
        'Программа лояльности',
      ],
    },
    {
      title: 'Документация',
      icon: 'FileText',
      items: [
        'Техническая документация',
        'Скачать прайс-лист',
        'Сертификаты',
        'Каталоги продукции',
      ],
    },
  ];

  const aboutMenu = [
    {
      title: 'О компании',
      icon: 'Info',
      items: [
        'О нас',
        'Наши преимущества',
        'Команда',
        'Производство и склад',
      ],
    },
    {
      title: 'Информация',
      icon: 'MessageCircle',
      items: [
        'Отзывы клиентов',
        'Сертификаты',
        'Вакансии',
        'Контакты',
      ],
    },
  ];

  const getMenuContent = () => {
    switch (menuKey) {
      case 'catalog':
        return catalogMenu;
      case 'advertising':
        return advertisingMenu;
      case 'services':
        return servicesMenu;
      case 'professionals':
        return professionalsMenu;
      case 'about':
        return aboutMenu;
      default:
        return [];
    }
  };

  const menuContent = getMenuContent();

  if (menuContent.length === 0) return null;

  return (
    <div className="absolute left-0 top-full w-screen bg-background border-b border-border shadow-xl">
      <div className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 ${menuContent.length > 4 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {menuContent.map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-border">
                <Icon name={section.icon as any} size={20} className="text-primary" />
                <h3 className="font-semibold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${menuKey}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <Icon
                        name="ChevronRight"
                        size={14}
                        className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {menuKey === 'catalog' && (
            <div className="bg-muted rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Не знаете, что выбрать?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Наши специалисты помогут подобрать оптимальное решение для вашего проекта
                </p>
              </div>
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                Получить консультацию
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
