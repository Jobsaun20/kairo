import { CATEGORIES } from '@/lib/categories';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export const CategorySelector = ({ selectedCategory, onSelect }: CategorySelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">¿Qué quieres lograr?</h2>
        <p className="text-sm text-muted-foreground">Elige una o más categorías</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`p-5 rounded-2xl border-2 transition-all active:scale-95 ${
              selectedCategory === cat.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <div className="font-semibold text-sm">{cat.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};