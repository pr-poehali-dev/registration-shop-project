import * as XLSX from "xlsx";
import { CartItem } from "@/types/product";

export const exportCartToExcel = (items: CartItem[], userPhone: string) => {
  const data = items.map((item, index) => ({
    "№": index + 1,
    Название: item.product.name,
    Бренд: item.product.brand,
    Тип: item.product.type,
    Пол: item.product.gender,
    "Цена за шт.": item.product.price,
    Количество: item.quantity,
    Сумма: item.product.price * item.quantity,
  }));

  const totalSum = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // Добавляем итоговую строку
  data.push({
    "№": "",
    Название: "",
    Бренд: "",
    Тип: "",
    Пол: "",
    "Цена за шт.": "",
    Количество: "ИТОГО:",
    Сумма: totalSum,
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Заказ");

  const fileName = `заказ_${userPhone}_${new Date().toLocaleDateString("ru-RU").replace(/\./g, "-")}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
