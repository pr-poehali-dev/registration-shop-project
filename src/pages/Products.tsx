import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface FilterState {
  type: string;
  gender: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
}

const Products = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [filters, setFilters] = useState<FilterState>({
    type: "",
    gender: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.type && product.type !== filters.type) return false;
      if (filters.gender && product.gender !== filters.gender) return false;
      if (filters.brand && product.brand !== filters.brand) return false;
      if (filters.minPrice && product.price < parseInt(filters.minPrice))
        return false;
      if (filters.maxPrice && product.price > parseInt(filters.maxPrice))
        return false;
      return true;
    });
  }, [filters]);

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Каталог очков</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Привет, {user?.phone}
              </span>
              <Link to="/cart">
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Корзина
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
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
        <ProductFilters filters={filters} onFiltersChange={setFilters} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Найдено товаров: {filteredProducts.length}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon
                name="Search"
                size={48}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры фильтра
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
