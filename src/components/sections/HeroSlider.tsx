import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '@/config/api';

interface Slide {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageMobile?: string;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: 'Свет, который создает уют',
    description: 'Тысячи светильников для вашего дома. От классических люстр до современных трековых систем.',
    ctaText: 'Выбрать светильник',
    ctaLink: '/catalog',
    image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/9fedbe6e-6f27-46b8-868b-9690a9de81c8.jpg',
  },
  {
    id: 2,
    title: 'Комплексные решения для ваших проектов',
    description: 'Специальные условия, 3D-модели и персональный менеджер для дизайнеров и архитекторов.',
    ctaText: 'Стать партнером',
    ctaLink: '/professionals',
    image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/ee78d1bd-3cb6-4579-8f2f-34183afee865.jpg',
  },
  {
    id: 3,
    title: 'Освещение для бизнеса и городской среды',
    description: 'Проектирование, производство и монтаж архитектурной подсветки, уличного освещения и световых вывесок.',
    ctaText: 'Смотреть портфолио',
    ctaLink: '/projects',
    image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/a2d20987-fe02-4bbd-8784-5b0142325fbc.jpg',
  },
  {
    id: 4,
    title: 'Воплотим вашу идею в свете',
    description: 'Изготовление авторских светильников и рекламных конструкций по индивидуальному проекту.',
    ctaText: 'Рассчитать проект',
    ctaLink: '/consultation',
    image: 'https://cdn.poehali.dev/projects/51c62b2d-3c50-4ed9-b310-c823cce0e70c/files/fcc3434e-b655-44d9-9fc4-ef1f80f1ed06.jpg',
  },
];

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.mediaList}?folder=home`);
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          const imageSlides = data.images.map((img: any, index: number) => ({
            id: index + 1,
            title: defaultSlides[index]?.title || 'Светильники',
            description: defaultSlides[index]?.description || 'Магазин светильников',
            ctaText: defaultSlides[index]?.ctaText || 'Смотреть каталог',
            ctaLink: defaultSlides[index]?.ctaLink || '/catalog',
            image: img.url,
          }));
          setSlides(imageSlides);
        }
      } catch (error) {
        console.error('Ошибка загрузки изображений слайдера:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[600px] lg:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={slide.imageMobile || slide.image}
              />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent lg:from-background/90 lg:via-background/50" />

            <div className="absolute inset-0 container mx-auto px-4 flex items-center">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                  {slide.description}
                </p>
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to={slide.ctaLink}>
                    {slide.ctaText}
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 hover:bg-background backdrop-blur-sm border border-border flex items-center justify-center transition-all disabled:opacity-50"
        aria-label="Предыдущий слайд"
      >
        <Icon name="ChevronLeft" size={24} className="text-foreground" />
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 hover:bg-background backdrop-blur-sm border border-border flex items-center justify-center transition-all disabled:opacity-50"
        aria-label="Следующий слайд"
      >
        <Icon name="ChevronRight" size={24} className="text-foreground" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-primary'
                : 'w-2 h-2 bg-muted-foreground/50 hover:bg-muted-foreground'
            } rounded-full`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
};

export default HeroSlider;