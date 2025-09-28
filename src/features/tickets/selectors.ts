import { createSelector } from '@reduxjs/toolkit';
import { ticketsSelectors } from './ticketsSlice';
import type { RootState } from '../../app/store';
import type { Ticket } from './types';

const filters = (s: RootState) => s.tickets.filters;

const sortBy = (mode: 'cheapest' | 'fastest' | 'optimal') =>
  (a: Ticket, b: Ticket) => {
    if (mode === 'cheapest') return a.price - b.price;
    if (mode === 'fastest') return a.duration - b.duration;
    return (a.price * 0.7 + a.duration * 0.3) - (b.price * 0.7 + b.duration * 0.3);
  };

export const selectAllCompanies = (s: RootState) => s.tickets.companiesAll;
export const selectFilterState = (s: RootState) => s.tickets.filters;
export const selectStatus = (s: RootState) => s.tickets.status;
export const selectError = (s: RootState) => s.tickets.error;

export const selectFilteredSorted = createSelector(
  ticketsSelectors.selectAll,
  filters,
  (list, f) => {
    const byCompany = f.companies.length ? new Set(f.companies) : null;
    const byConn = f.connections.length ? new Set(f.connections) : null;
    const filtered = list.filter(t =>
      (byCompany ? byCompany.has(t.company) : true) &&
      (byConn ? byConn.has(t.connectionAmount) : true)
    );
    return filtered.sort(sortBy(f.sort)).slice(0, f.limit);
  }
);
