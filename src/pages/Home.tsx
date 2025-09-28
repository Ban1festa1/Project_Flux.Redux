import { useEffect } from 'react';
import SortTabs from '../components/SortTabs';
import FilterBar from '../components/FilterBar';
import TicketCard from '../components/TicketCard';
import MobileFilter from '../components/MobileFilter';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadTickets, loadMore } from '../features/tickets/ticketsSlice';
import { selectFilteredSorted, selectStatus, selectError } from '../features/tickets/selectors';

export default function Home() {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(selectFilteredSorted);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => { dispatch(loadTickets()); }, [dispatch]);

  return (
    <main className="container">
      <div className="layout">
        <aside className="sidebar">
          <FilterBar />
        </aside>

        <section>
          <div className="tabsWrap">
            <SortTabs />
          </div>

          <div className="mobileFilterWrap">
            <MobileFilter />
          </div>

          {status === 'loading' && <p>Загрузка…</p>}
          {status === 'failed' && <p>Ошибка: {error}</p>}

          <div className="tickets">
            {tickets.map(t => <TicketCard key={t.id} t={t} />)}
          </div>

          <button className="primaryBtn" onClick={() => dispatch(loadMore())}>
            Загрузить ещё билеты
          </button>
        </section>
      </div>
    </main>
  );
}
