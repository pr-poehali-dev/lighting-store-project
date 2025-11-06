import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SiteSettings {
  siteName: string;
  siteSlogan: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  workHours: string;
  
  heroTitle: string;
  heroSubtitle: string;
  heroButton1Text: string;
  heroButton2Text: string;
  
  catalogTitle: string;
  catalogSubtitle: string;
  
  aboutTitle: string;
  aboutText: string;
  
  whyUsTitle: string;
  
  portfolioTitle: string;
  portfolioSubtitle: string;
  
  faqTitle: string;
  
  contactsTitle: string;
  
  footerText: string;
  
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  
  headingFont: string;
  bodyFont: string;
  fontSize: number;
  
  borderRadius: number;
  
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  
  showHero: boolean;
  showCatalog: boolean;
  showAbout: boolean;
  showWhyUs: boolean;
  showPortfolio: boolean;
  showFAQ: boolean;
  showContacts: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: "Магазин Светильников . РФ",
  siteSlogan: "ВАША АРХИТЕКТУРА СВЕТА",
  logo: "",
  phone: "+7 (912) 345-67-89",
  email: "info@svetilniki.rf",
  address: "г. Екатеринбург, Сухой порт",
  workHours: "Пн-Пт: 9:00-18:00",
  
  heroTitle: "СВЕТИЛЬНИКИ: ОТ СТАНДАРТНЫХ МОДЕЛЕЙ ДО ЭКСКЛЮЗИВНЫХ СВЕТОВЫХ ФОРМ.",
  heroSubtitle: "Добро пожаловать в Магазин Светильников.РФ. ⚡️Здесь вы найдете светильники для интерьерных, экстерьерных и ландшафтных проектов.",
  heroButton1Text: "Смотреть каталог",
  heroButton2Text: "Связаться",
  
  catalogTitle: "Каталог световых фигур",
  catalogSubtitle: "Выберите идеальное решение для вашего пространства",
  
  aboutTitle: "О нашей компании",
  aboutText: "Мы специализируемся на поставке...",
  
  whyUsTitle: "Почему выбирают нас",
  
  portfolioTitle: "Наши проекты",
  portfolioSubtitle: "Реализованные световые решения",
  
  faqTitle: "Частые вопросы",
  
  contactsTitle: "Связаться с нами",
  
  footerText: "© 2024 Магазин Светильников. Все права защищены.",
  
  primaryColor: "217 91% 60%",
  secondaryColor: "262 83% 58%",
  accentColor: "38 92% 50%",
  backgroundColor: "222 47% 5%",
  textColor: "210 40% 98%",
  
  headingFont: "Montserrat",
  bodyFont: "Inter",
  fontSize: 16,
  
  borderRadius: 12,
  
  metaTitle: "Магазин Светильников - Световые решения",
  metaDescription: "Светильники для интерьера и ландшафта. Доставка по России.",
  metaKeywords: "светильники, освещение, ландшафтное освещение",
  ogImage: "",
  
  showHero: true,
  showCatalog: true,
  showAbout: true,
  showWhyUs: true,
  showPortfolio: true,
  showFAQ: true,
  showContacts: true,
};

export default function Admin() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("siteSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings));
    
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.primaryColor);
    root.style.setProperty("--secondary", settings.secondaryColor);
    root.style.setProperty("--accent", settings.accentColor);
    root.style.setProperty("--background", settings.backgroundColor);
    root.style.setProperty("--foreground", settings.textColor);
    root.style.setProperty("--radius", `${settings.borderRadius}px`);
    
    toast({
      title: "✅ Сохранено",
      description: "Настройки успешно применены к сайту",
    });
  };

  const handleReset = () => {
    if (confirm("Вернуть все настройки по умолчанию?")) {
      setSettings(defaultSettings);
      localStorage.removeItem("siteSettings");
      toast({
        title: "🔄 Сброс выполнен",
        description: "Настройки возвращены к значениям по умолчанию",
      });
    }
  };

  const handleUnlock = () => {
    if (password === "admin123") {
      setIsLocked(false);
      toast({
        title: "🔓 Доступ открыт",
        description: "Вы можете редактировать настройки",
      });
    } else {
      toast({
        variant: "destructive",
        title: "❌ Неверный пароль",
        description: "Попробуйте еще раз",
      });
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Lock" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-2xl">Панель администратора</CardTitle>
            <CardDescription>Введите пароль для доступа</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              />
            </div>
            <Button onClick={handleUnlock} className="w-full">
              <Icon name="Unlock" size={18} className="mr-2" />
              Войти
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Пароль по умолчанию: <code className="bg-muted px-2 py-1 rounded">admin123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Админ-панель</h1>
                <p className="text-muted-foreground text-xs">Управление сайтом</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
                <Icon name="Eye" size={16} className="mr-2" />
                Просмотр сайта
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сбросить
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Контент</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Icon name="Palette" size={16} />
              <span className="hidden sm:inline">Дизайн</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Icon name="Type" size={16} />
              <span className="hidden sm:inline">Шрифты</span>
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Icon name="Layout" size={16} />
              <span className="hidden sm:inline">Разделы</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Icon name="Search" size={16} />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Icon name="Phone" size={16} />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
                <CardDescription>Название сайта и логотип</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Название сайта</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteSlogan">Слоган</Label>
                  <Input
                    id="siteSlogan"
                    value={settings.siteSlogan}
                    onChange={(e) => setSettings({ ...settings, siteSlogan: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Главная секция (Hero)</CardTitle>
                <CardDescription>Первый экран сайта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Заголовок</Label>
                  <Textarea
                    id="heroTitle"
                    rows={3}
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Описание</Label>
                  <Textarea
                    id="heroSubtitle"
                    rows={4}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroButton1">Текст кнопки 1</Label>
                    <Input
                      id="heroButton1"
                      value={settings.heroButton1Text}
                      onChange={(e) => setSettings({ ...settings, heroButton1Text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroButton2">Текст кнопки 2</Label>
                    <Input
                      id="heroButton2"
                      value={settings.heroButton2Text}
                      onChange={(e) => setSettings({ ...settings, heroButton2Text: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Секция каталога</CardTitle>
                <CardDescription>Заголовки раздела с товарами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="catalogTitle">Заголовок</Label>
                  <Input
                    id="catalogTitle"
                    value={settings.catalogTitle}
                    onChange={(e) => setSettings({ ...settings, catalogTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="catalogSubtitle">Подзаголовок</Label>
                  <Input
                    id="catalogSubtitle"
                    value={settings.catalogSubtitle}
                    onChange={(e) => setSettings({ ...settings, catalogSubtitle: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Футер</CardTitle>
                <CardDescription>Текст в подвале сайта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="footerText">Текст футера</Label>
                  <Input
                    id="footerText"
                    value={settings.footerText}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Цветовая схема</CardTitle>
                <CardDescription>Основные цвета сайта (HSL формат)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Основной цвет (Primary)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      placeholder="217 91% 60%"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: `hsl(${settings.primaryColor})` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Синий цвет для кнопок и акцентов</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Вторичный цвет (Secondary)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      placeholder="262 83% 58%"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: `hsl(${settings.secondaryColor})` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Фиолетовый цвет для градиентов</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Акцентный цвет (Accent)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                      placeholder="38 92% 50%"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: `hsl(${settings.accentColor})` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Оранжевый цвет для выделений</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Цвет фона</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      placeholder="222 47% 5%"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: `hsl(${settings.backgroundColor})` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">Цвет текста</Label>
                  <div className="flex gap-2">
                    <Input
                      id="textColor"
                      value={settings.textColor}
                      onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                      placeholder="210 40% 98%"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: `hsl(${settings.textColor})` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Скругление углов</CardTitle>
                <CardDescription>Радиус границ для элементов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="borderRadius">Радиус: {settings.borderRadius}px</Label>
                    <span className="text-sm text-muted-foreground">{settings.borderRadius}px</span>
                  </div>
                  <Slider
                    id="borderRadius"
                    min={0}
                    max={24}
                    step={2}
                    value={[settings.borderRadius]}
                    onValueChange={(value) => setSettings({ ...settings, borderRadius: value[0] })}
                  />
                  <div className="flex gap-2 mt-4">
                    <div className="w-16 h-16 bg-primary" style={{ borderRadius: `${settings.borderRadius}px` }} />
                    <div className="w-16 h-16 bg-secondary" style={{ borderRadius: `${settings.borderRadius}px` }} />
                    <div className="w-16 h-16 bg-accent" style={{ borderRadius: `${settings.borderRadius}px` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Шрифты</CardTitle>
                <CardDescription>Настройка типографики сайта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headingFont">Шрифт заголовков</Label>
                  <Input
                    id="headingFont"
                    value={settings.headingFont}
                    onChange={(e) => setSettings({ ...settings, headingFont: e.target.value })}
                    placeholder="Montserrat"
                  />
                  <p className="text-xs text-muted-foreground">Google Font или системный шрифт</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Шрифт основного текста</Label>
                  <Input
                    id="bodyFont"
                    value={settings.bodyFont}
                    onChange={(e) => setSettings({ ...settings, bodyFont: e.target.value })}
                    placeholder="Inter"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fontSize">Базовый размер шрифта</Label>
                    <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
                  </div>
                  <Slider
                    id="fontSize"
                    min={12}
                    max={20}
                    step={1}
                    value={[settings.fontSize]}
                    onValueChange={(value) => setSettings({ ...settings, fontSize: value[0] })}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Предпросмотр:</p>
                  <h1 className="text-3xl font-bold" style={{ fontFamily: settings.headingFont }}>
                    Заголовок H1
                  </h1>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: settings.headingFont }}>
                    Заголовок H2
                  </h2>
                  <p style={{ fontFamily: settings.bodyFont, fontSize: `${settings.fontSize}px` }}>
                    Это пример основного текста на сайте. Так будут выглядеть параграфы и описания.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление разделами</CardTitle>
                <CardDescription>Показать или скрыть секции на сайте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showHero">Главная секция (Hero)</Label>
                    <p className="text-sm text-muted-foreground">Первый экран с заголовком</p>
                  </div>
                  <Switch
                    id="showHero"
                    checked={settings.showHero}
                    onCheckedChange={(checked) => setSettings({ ...settings, showHero: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showCatalog">Каталог товаров</Label>
                    <p className="text-sm text-muted-foreground">Список продукции</p>
                  </div>
                  <Switch
                    id="showCatalog"
                    checked={settings.showCatalog}
                    onCheckedChange={(checked) => setSettings({ ...settings, showCatalog: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showAbout">О компании</Label>
                    <p className="text-sm text-muted-foreground">Информация о бизнесе</p>
                  </div>
                  <Switch
                    id="showAbout"
                    checked={settings.showAbout}
                    onCheckedChange={(checked) => setSettings({ ...settings, showAbout: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showWhyUs">Почему мы</Label>
                    <p className="text-sm text-muted-foreground">Преимущества компании</p>
                  </div>
                  <Switch
                    id="showWhyUs"
                    checked={settings.showWhyUs}
                    onCheckedChange={(checked) => setSettings({ ...settings, showWhyUs: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showPortfolio">Портфолио</Label>
                    <p className="text-sm text-muted-foreground">Галерея проектов</p>
                  </div>
                  <Switch
                    id="showPortfolio"
                    checked={settings.showPortfolio}
                    onCheckedChange={(checked) => setSettings({ ...settings, showPortfolio: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showFAQ">Частые вопросы</Label>
                    <p className="text-sm text-muted-foreground">FAQ секция</p>
                  </div>
                  <Switch
                    id="showFAQ"
                    checked={settings.showFAQ}
                    onCheckedChange={(checked) => setSettings({ ...settings, showFAQ: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showContacts">Контакты</Label>
                    <p className="text-sm text-muted-foreground">Форма обратной связи</p>
                  </div>
                  <Switch
                    id="showContacts"
                    checked={settings.showContacts}
                    onCheckedChange={(checked) => setSettings({ ...settings, showContacts: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO настройки</CardTitle>
                <CardDescription>Метаданные для поисковых систем</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">
                    {settings.metaTitle.length}/60 символов
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    value={settings.metaDescription}
                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">
                    {settings.metaDescription.length}/160 символов
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Ключевые слова</Label>
                  <Input
                    id="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                    placeholder="ключ1, ключ2, ключ3"
                  />
                  <p className="text-xs text-muted-foreground">Через запятую</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ogImage">Open Graph изображение (URL)</Label>
                  <Input
                    id="ogImage"
                    value={settings.ogImage}
                    onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Изображение для соцсетей (рекомендуемый размер: 1200x630px)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
                <CardDescription>Данные для связи с клиентами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="+7 (912) 345-67-89"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="info@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="г. Москва, ул. Ленина, 1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workHours">Часы работы</Label>
                  <Input
                    id="workHours"
                    value={settings.workHours}
                    onChange={(e) => setSettings({ ...settings, workHours: e.target.value })}
                    placeholder="Пн-Пт: 9:00-18:00"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
