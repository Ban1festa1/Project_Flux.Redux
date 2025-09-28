import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleCompany, toggleConnection } from '../features/tickets/ticketsSlice';

const CONNECTIONS = [0, 1, 2, 3];

export default function MobileFilter() {
  const dispatch = useAppDispatch();

  const companiesAll = useAppSelector(s => s.tickets.companiesAll);
  const companies = useAppSelector(s => s.tickets.filters.companies);
  const selectedConnections = useAppSelector(s => s.tickets.filters.connections);

  const [open, setOpen] = useState(false);

  const summary = useMemo(() => {
    const c = companies.length ? companies.join(', ') : 'Любая авиакомпания';
    const n = selectedConnections.length
      ? `${selectedConnections.length} пересадк(и)`
      : 'любое кол-во пересадок';
    return `${c}, ${n}`;
  }, [companies, selectedConnections]);

  return (
    <div className="mobileFilter">
      <button
        type="button"
        className={`filterSummary ${open ? 'open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="filterDrop"
      >
        <span className="filterSummary__text">{summary}</span>
        <span className="filterSummary__chevron" aria-hidden>▾</span>
      </button>

      <div id="filterDrop" className={`filterDrop ${open ? 'open' : ''}`}>
        <div className="filterDrop__cols">
          <div className="filterCol">
            <div className="filterDrop__title">Компании</div>
            {companiesAll.map(c => (
              <label key={c} className="checkRow checkRow--dot">
                <input
                  type="checkbox"
                  checked={companies.includes(c)}
                  onChange={() => dispatch(toggleCompany(c))}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className="filterCol">
            <div className="filterDrop__title">Количество пересадок</div>
            {CONNECTIONS.map(n => (
              <label key={n} className="checkRow checkRow--box">
                <input
                  type="checkbox"
                  checked={selectedConnections.includes(n)}
                  onChange={() => dispatch(toggleConnection(n))}
                />
                <span>{n === 0 ? 'Без пересадок' : `${n} пересадк${n === 1 ? 'а' : 'и'}`}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
