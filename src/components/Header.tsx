import plane from '../assets/icons/plane.svg';

export default function Header() {
  return (
    <header>
      <img src={plane} alt="" className="planeIcon" />
      <span className="headerTitle">Поиск авиабилетов</span>
    </header>
  );
}

