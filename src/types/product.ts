export interface Product {
  id: string;
  name: string;
  type: "солнцезащитные" | "оптические" | "компьютерные";
  gender: "мужские" | "женские" | "унисекс";
  price: number;
  brand: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}
