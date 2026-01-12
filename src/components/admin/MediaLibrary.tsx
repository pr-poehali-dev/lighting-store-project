import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface MediaFolder {
  id: string;
  name: string;
  route: string;
  images: MediaImage[];
}

interface MediaImage {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
}

const initialFolders: MediaFolder[] = [
  { id: '1', name: 'Главная страница', route: '/', images: [] },
  { id: '2', name: 'Каталог', route: '/catalog', images: [] },
  { id: '3', name: 'Интерьерное освещение', route: '/catalog/interior', images: [] },
  { id: '4', name: 'Уличное освещение', route: '/catalog/outdoor', images: [] },
  { id: '5', name: 'Коммерческое освещение', route: '/catalog/commercial', images: [] },
  { id: '6', name: 'Дизайнерское освещение', route: '/catalog/designer', images: [] },
  { id: '7', name: 'Световая реклама', route: '/catalog/advertising', images: [] },
  { id: '8', name: 'Услуги', route: '/services', images: [] },
  { id: '9', name: 'Для профессионалов', route: '/professionals', images: [] },
  { id: '10', name: 'Проекты', route: '/projects', images: [] },
  { id: '11', name: 'О компании', route: '/about', images: [] },
  { id: '12', name: 'Контакты', route: '/contacts', images: [] },
];

const MediaLibrary = () => {
  const [folders, setFolders] = useState<MediaFolder[]>(initialFolders);
  const [selectedFolder, setSelectedFolder] = useState<MediaFolder | null>(null);
  const [uploadingFolder, setUploadingFolder] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (folderId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadingFolder(folderId);

    try {
      const newImages: MediaImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
          toast({
            variant: 'destructive',
            title: 'Ошибка',
            description: `Файл ${file.name} не является изображением`,
          });
          continue;
        }

        const reader = new FileReader();
        const imageUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        newImages.push({
          id: `${Date.now()}-${i}`,
          url: imageUrl,
          name: file.name,
          uploadedAt: new Date().toISOString(),
        });
      }

      setFolders(prev =>
        prev.map(folder =>
          folder.id === folderId
            ? { ...folder, images: [...folder.images, ...newImages] }
            : folder
        )
      );

      toast({
        title: 'Успешно',
        description: `Загружено ${newImages.length} изображений`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить изображения',
      });
    } finally {
      setUploadingFolder(null);
    }
  };

  const handleDeleteImage = (folderId: string, imageId: string) => {
    if (!confirm('Удалить это изображение?')) return;

    setFolders(prev =>
      prev.map(folder =>
        folder.id === folderId
          ? { ...folder, images: folder.images.filter(img => img.id !== imageId) }
          : folder
      )
    );

    toast({
      title: 'Удалено',
      description: 'Изображение удалено из библиотеки',
    });
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Скопировано',
      description: 'URL изображения скопирован в буфер обмена',
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <Card key={folder.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Folder" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{folder.name}</h3>
                    <p className="text-xs text-muted-foreground">{folder.route}</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedFolder(folder)}
                    >
                      <Icon name="Eye" size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{folder.name}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh]">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {folder.images.length === 0 ? (
                          <div className="col-span-full text-center py-12 text-muted-foreground">
                            <Icon name="ImageOff" size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Нет изображений в этой папке</p>
                          </div>
                        ) : (
                          folder.images.map((image) => (
                            <div key={image.id} className="group relative rounded-lg overflow-hidden border border-border">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  onClick={() => handleCopyUrl(image.url)}
                                >
                                  <Icon name="Copy" size={16} />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => handleDeleteImage(folder.id, image.id)}
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                              <div className="p-2 bg-muted/50">
                                <p className="text-xs truncate text-foreground">{image.name}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span className="flex items-center space-x-1">
                  <Icon name="Image" size={14} />
                  <span>{folder.images.length} фото</span>
                </span>
              </div>

              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(folder.id, e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id={`upload-${folder.id}`}
                  disabled={uploadingFolder === folder.id}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploadingFolder === folder.id}
                  asChild
                >
                  <label htmlFor={`upload-${folder.id}`} className="cursor-pointer">
                    {uploadingFolder === folder.id ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      <>
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить фото
                      </>
                    )}
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
