import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Ticket } from './types';
import { fetchTicketsApi } from './fakeApi';

export const loadTickets = createAsyncThunk('tickets/load', async () => fetchTicketsApi());

export type SortMode = 'cheapest' | 'fastest' | 'optimal';

interface FiltersState {
  companies: string[];
  connections: number[];
  sort: SortMode;
  limit: number;
}

const adapter = createEntityAdapter<Ticket>({ selectId: t => t.id });

type TicketsState = ReturnType<typeof adapter.getInitialState> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  filters: FiltersState;
  companiesAll: string[];
};

const initialState: TicketsState = adapter.getInitialState({
  status: 'idle',
  filters: { companies: [], connections: [], sort: 'cheapest', limit: 5 },
  companiesAll: [],
});

const slice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSort(s, a: PayloadAction<SortMode>) { s.filters.sort = a.payload; },
    loadMore(s) { s.filters.limit += 5; },
    toggleCompany(s, a: PayloadAction<string>) {
      const i = s.filters.companies.indexOf(a.payload);
      i === -1 ? s.filters.companies.push(a.payload) : s.filters.companies.splice(i, 1);
    },
    toggleConnection(s, a: PayloadAction<number>) {
      const i = s.filters.connections.indexOf(a.payload);
      i === -1 ? s.filters.connections.push(a.payload) : s.filters.connections.splice(i, 1);
    },
    resetFilters(s) { s.filters.companies = []; s.filters.connections = []; },
  },
  extraReducers: b => {
    b.addCase(loadTickets.pending, s => { s.status = 'loading'; s.error = undefined; });
    b.addCase(loadTickets.fulfilled, (s, { payload }) => {
      s.status = 'succeeded';
      adapter.setAll(s, payload);
      s.companiesAll = Array.from(new Set(payload.map(t => t.company)));
    });
    b.addCase(loadTickets.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; });
  }
});

export const { setSort, loadMore, toggleCompany, toggleConnection, resetFilters } = slice.actions;
export default slice.reducer;

export const ticketsSelectors = adapter.getSelectors<RootState>(st => st.tickets);
