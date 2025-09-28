import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllCompanies, selectFilterState } from '../features/tickets/selectors';
import { toggleCompany, toggleConnection } from '../features/tickets/ticketsSlice';

const connections = [0, 1, 2, 3] as const;

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const f = useAppSelector(selectFilterState);

  return (
    <>
      <div className="filterCard">
        <div className="filterCard__title">Количество пересадок</div>
        <div className="checkList">
          {connections.map(n => (
            <label key={n} className="checkRow checkRow--box">
              <input
                type="checkbox"
                checked={f.connections.includes(n)}
                onChange={() => dispatch(toggleConnection(n))}
              />
              <span>{n === 0 ? 'Без пересадок' : `${n} пересадк${n === 1 ? 'а' : 'и'}`}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filterCard">
        <div className="filterCard__title">Компании</div>
        <div className="checkList">
          {allCompanies.map(c => (
            <label key={c} className="checkRow checkRow--dot">
              <input
                type="checkbox"
                checked={f.companies.includes(c)}
                onChange={() => dispatch(toggleCompany(c))}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
