import { ListView } from '@/components/ListView';
import type { GroceryItem } from '@/types';

interface ListPageProps {
  groceryList: GroceryItem[];
  onRemoveFromList: (id: number) => void;
  onNavigate: (tab: string) => void;
}

export function ListPage({ groceryList, onRemoveFromList, onNavigate }: ListPageProps) {
  return (
    <ListView
      groceryList={groceryList}
      onRemoveFromList={onRemoveFromList}
      onNavigate={onNavigate}
    />
  );
}
