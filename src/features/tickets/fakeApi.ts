import type { Ticket } from './types';

const tickets: Ticket[] = [
  {
    id: 1, from: 'SVO', to: 'LED', company: 'Победа', price: 12680, currency: 'RUB',
    time: { startTime: '12:00', endTime: '16:30' }, duration: 270, date: '2025-10-01', connectionAmount: 1
  },
  {
    id: 2, from: 'SVO', to: 'LED', company: 'Red Wings', price: 21500, currency: 'RUB',
    time: { startTime: '14:00', endTime: '16:00' }, duration: 120, date: '2025-10-01', connectionAmount: 0
  },
  {
    id: 3, from: 'SVO', to: 'LED', company: 'S7 Airlines', price: 23995, currency: 'RUB',
    time: { startTime: '04:50', endTime: '13:30' }, duration: 520, date: '2025-10-02', connectionAmount: 2
  },
];

export async function fetchTicketsApi(): Promise<Ticket[]> {
  await new Promise(r => setTimeout(r, 400));
  return tickets;
}
