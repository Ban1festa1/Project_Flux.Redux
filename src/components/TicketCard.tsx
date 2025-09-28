import type { Ticket } from '../features/tickets/types';
import pobeda from '../assets/logos/pobeda.svg';
import redwings from '../assets/logos/redwings.svg';
import s7 from '../assets/logos/s7.svg';

const logos: Record<string, string> = {
  'победа': pobeda,
  'red wings': redwings,
  's7 airlines': s7,
};

function getCompanyLogo(name: string): string | null {
  const key = name.trim().toLowerCase();
  return logos[key] ?? null;
}

const fmt = (m: number) => `${Math.floor(m / 60)} ч ${m % 60} мин`;

function plural(n: number) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} пересадка`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} пересадки`;
  return `${n} пересадок`;
}

export default function TicketCard({ t }: { t: Ticket }) {
  const logo = getCompanyLogo(t.company);

  return (
    <article className="card">
      <div className="row">
        <div style={{ minWidth: 160 }}>
          <div className="price">{t.price.toLocaleString('ru-RU')} ₽</div>
        </div>

        <div className="meta">
          <div className="metaItem">
            <div className="metaLabel">{t.from} – {t.to}</div>
            <div className="metaValue">{t.time.startTime} – {t.time.endTime}</div>
          </div>

          <div className="metaItem">
            <div className="metaLabel">В пути</div>
            <div className="metaValue">{fmt(t.duration)}</div>
          </div>

          <div className="metaItem">
            <div className="metaLabel">Пересадки</div>
            <div className="metaValue">
              {t.connectionAmount === 0 ? 'Без пересадок' : plural(t.connectionAmount)}
            </div>
          </div>
        </div>

        <div className="airline">
          {logo ? <img src={logo} alt={t.company} className="airlineLogo" /> : t.company}
        </div>
      </div>
    </article>
  );
}
