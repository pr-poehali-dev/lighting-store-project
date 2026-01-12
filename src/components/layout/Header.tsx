import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Каталог', key: 'catalog', hasMega: true },
    { label: 'Световая реклама', key: 'advertising', hasMega: true },
    { label: 'Услуги', key: 'services', hasMega: true },
    { label: 'Производство', key: 'production', hasMega: false },
    { label: 'Для профессионалов', key: 'professionals', hasMega: true },
    { label: 'Проекты', key: 'projects', hasMega: false },
    { label: 'О компании', key: 'about', hasMega: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-md'
          : 'bg-background border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" className="text-primary-foreground" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">LightPro</span>
              <span className="text-xs text-muted-foreground">Световые решения</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.hasMega && setActiveMenu(item.key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  asChild={!item.hasMega}
                >
                  {item.hasMega ? (
                    <span className="flex items-center cursor-pointer">
                      {item.label}
                      <Icon name="ChevronDown" size={16} className="ml-1" />
                    </span>
                  ) : (
                    <Link to={`/${item.key}`}>{item.label}</Link>
                  )}
                </Button>
                {item.hasMega && activeMenu === item.key && (
                  <MegaMenu menuKey={item.key} />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex relative">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="User" size={20} />
            </Button>
            
            <div className="hidden md:flex flex-col items-end">
              <a href="tel:+74951234567" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                +7 (495) 123-45-67
              </a>
              <span className="text-xs text-muted-foreground">Ежедневно 9:00 - 21:00</span>
            </div>

            <Button className="hidden md:flex">
              Заказать звонок
            </Button>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[400px] p-0">
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
