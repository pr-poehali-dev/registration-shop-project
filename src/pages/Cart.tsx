import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { exportCartToExcel } from "@/utils/excel";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Cart = () => {
  const { user, logout } = useAuth();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();

  const handleExport = () => {
    if (items.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    exportCartToExcel(items, user?.phone || "");
    toast.success("Заказ экспортирован в Excel");
  };

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) return;
    updateQuantity(productId, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold text-gray-900">Корзина</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Привет, {user?.phone}
                </span>
                <Link to="/products">
                  <Button variant="outline">
                    <Icon name="ArrowLeft" size={18} className="mr-2" />К
                    товарам
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  <Icon name="LogOut" size={18} className="mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Icon
              name="ShoppingCart"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Корзина пуста
            </h2>
            <p className="text-gray-600 mb-6">Добавьте товары из каталога</p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">
                Перейти к покупкам
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Корзина</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Привет, {user?.phone}
              </span>
              <Link to="/products">
                <Button variant="outline">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />К товарам
                </Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Ваш заказ</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={clearCart}>
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Очистить корзину
                </Button>
                <Button
                  onClick={handleExport}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Экспорт в Excel
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Бренд</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Пол</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Количество</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell className="font-medium">
                      {item.product.name}
                    </TableCell>
                    <TableCell>{item.product.brand}</TableCell>
                    <TableCell>{item.product.type}</TableCell>
                    <TableCell>{item.product.gender}</TableCell>
                    <TableCell>
                      {item.product.price.toLocaleString("ru-RU")} ₽
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      {(item.product.price * item.quantity).toLocaleString(
                        "ru-RU",
                      )}{" "}
                      ₽
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Итого: {getTotalPrice().toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-sm text-gray-600">
                Товаров:{" "}
                {items.reduce((total, item) => total + item.quantity, 0)} шт.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
