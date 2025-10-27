import { Button } from '@/components/ui/button';
import { getCategoryById } from '@/lib/categories';
import { ArrowLeft } from 'lucide-react';

interface SubCategorySelectorProps {
  categoryId: string;
  selectedSubCategory: string;
  onSelect: (subCategoryId: string) => void;
  onBack: () => void;
}

export const SubCategorySelector = ({ 
  categoryId, 
  selectedSubCategory, 
  onSelect,
  onBack 
}: SubCategorySelectorProps) => {
  const category = getCategoryById(categoryId);
  
  if (!category) return null;

  // Special case: "nuevo" category has no subcategories
  if (category.subCategories.length === 0) {
    onSelect('custom');
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{category.name}</h2>
          <p className="text-sm text-muted-foreground">Elige tu enfoque</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {category.subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelect(sub.id)}
            className={`p-4 rounded-2xl border-2 transition-all active:scale-95 flex items-center gap-3 ${
              selectedSubCategory === sub.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-2xl">{sub.icon}</div>
            <div className="font-semibold text-left">{sub.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};