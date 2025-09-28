import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSort } from '../features/tickets/ticketsSlice';
import { selectFilterState } from '../features/tickets/selectors';

const tabs = [
  { id: 'cheapest', label: 'Самый дешевый' },
  { id: 'fastest',  label: 'Самый быстрый' },
  { id: 'optimal',  label: 'Самый оптимальный' },
] as const;

export default function SortTabs() {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector(selectFilterState);

  return (
    <div className="tabs" role="tablist" aria-label="Сортировка">
      {tabs.map(t => (
        <button
          key={t.id}
          role="tab"
          aria-selected={sort === t.id}
          className={`tab ${sort === t.id ? 'active' : ''}`}
          onClick={() => dispatch(setSort(t.id as any))}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
