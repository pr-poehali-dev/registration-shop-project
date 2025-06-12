import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{product.type}</Badge>
          <Badge variant="outline">{product.gender}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <p className="text-xl font-bold text-primary">
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button
          onClick={() => addItem(product)}
          className="bg-primary hover:bg-primary/90"
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />В корзину
        </Button>
        {quantity > 0 && (
          <div className="flex items-center">
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            <span className="font-semibold">{quantity}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
