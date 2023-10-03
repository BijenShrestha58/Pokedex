import { Logo } from "./logo";
export const Nav = () => {
  return (
    <div className="nav">
      <div className="logo">
        <Logo />
      </div>
      <div className="nav-items">
        <div className="nav-item">Pokédex</div>
        <div className="nav-item">Quiz</div>
      </div>
    </div>
  );
};
