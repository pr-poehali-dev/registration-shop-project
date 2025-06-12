import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterState {
  type: string;
  gender: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Сбросить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label>Тип</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => updateFilter("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Все типы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все типы</SelectItem>
              <SelectItem value="солнцезащитные">Солнцезащитные</SelectItem>
              <SelectItem value="оптические">Оптические</SelectItem>
              <SelectItem value="компьютерные">Компьютерные</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Пол</Label>
          <Select
            value={filters.gender}
            onValueChange={(value) => updateFilter("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Для всех" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Для всех</SelectItem>
              <SelectItem value="мужские">Мужские</SelectItem>
              <SelectItem value="женские">Женские</SelectItem>
              <SelectItem value="унисекс">Унисекс</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Бренд</Label>
          <Select
            value={filters.brand}
            onValueChange={(value) => updateFilter("brand", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Все бренды" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все бренды</SelectItem>
              <SelectItem value="Ray-Ban">Ray-Ban</SelectItem>
              <SelectItem value="Oakley">Oakley</SelectItem>
              <SelectItem value="Persol">Persol</SelectItem>
              <SelectItem value="Tom Ford">Tom Ford</SelectItem>
              <SelectItem value="Warby Parker">Warby Parker</SelectItem>
              <SelectItem value="TechSpecs">TechSpecs</SelectItem>
              <SelectItem value="Chanel">Chanel</SelectItem>
              <SelectItem value="Gucci">Gucci</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Цена от</Label>
          <Input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
          />
        </div>

        <div>
          <Label>Цена до</Label>
          <Input
            type="number"
            placeholder="100000"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
