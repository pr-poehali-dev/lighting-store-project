import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  glow_color?: string;
  description?: string;
  created_at?: string;
}

const categories = [
  { value: "interior", label: "Интерьерные" },
  { value: "exterior", label: "Экстерьерные" },
  { value: "landscape", label: "Ландшафтные" },
  { value: "decorative", label: "Декоративные" },
];

const glowColors = [
  { value: "blue", label: "Синий" },
  { value: "white", label: "Белый" },
  { value: "warm", label: "Тёплый" },
  { value: "rgb", label: "RGB" },
];

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "interior",
    price: "",
    image_url: "",
    glow_color: "blue",
    description: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.products);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Ошибка",
        description: "Не удалось загрузить товары",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        image_url: formData.image_url,
        glow_color: formData.glow_color,
        description: formData.description,
      };

      if (editingProduct) {
        await apiRequest(`${API_ENDPOINTS.adminProducts}?id=${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        toast({
          title: "✅ Обновлено",
          description: "Товар успешно обновлён",
        });
      } else {
        await apiRequest(API_ENDPOINTS.adminProducts, {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        toast({
          title: "✅ Добавлено",
          description: "Товар успешно добавлен",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      loadProducts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить товар",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image_url: product.image_url,
      glow_color: product.glow_color || "blue",
      description: product.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить этот товар?")) return;

    try {
      await apiRequest(`${API_ENDPOINTS.adminProducts}?id=${id}`, {
        method: 'DELETE',
      });
      toast({
        title: "✅ Удалено",
        description: "Товар успешно удалён",
      });
      loadProducts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Ошибка",
        description: "Не удалось удалить товар",
      });
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "interior",
      price: "",
      image_url: "",
      glow_color: "blue",
      description: "",
    });
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                Управление товарами
              </CardTitle>
              <CardDescription>Добавляйте, редактируйте и удаляйте товары</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Редактировать товар" : "Новый товар"}
                  </DialogTitle>
                  <DialogDescription>
                    Заполните информацию о товаре
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Например: Светильник настенный"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Цена (₽) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="15000"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="glow_color">Цвет свечения</Label>
                    <Select
                      value={formData.glow_color}
                      onValueChange={(value) => setFormData({ ...formData, glow_color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {glowColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL изображения *</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Подробное описание товара..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      <Icon name="Save" size={18} className="mr-2" />
                      {editingProduct ? "Сохранить" : "Добавить"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDialogClose(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Icon name="Loader" size={32} className="animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет товаров. Добавьте первый товар.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge variant="secondary">
                        {categories.find((c) => c.value === product.category)?.label}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary">
                        {product.price.toLocaleString()} ₽
                      </span>
                      <Badge variant="outline">
                        {glowColors.find((c) => c.value === product.glow_color)?.label}
                      </Badge>
                    </div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(product)}
                      >
                        <Icon name="Pencil" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
