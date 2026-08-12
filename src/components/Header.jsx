import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={closeMenu}>
        <span className="brand-mark">H</span>
        <span>Hoku Cafe</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`site-nav ${isMenuOpen ? "is-open" : ""}`}>
        <a href="#menu" onClick={closeMenu}>
          Menu
        </a>
        <a href="#story" onClick={closeMenu}>
          Story
        </a>
        <a href="#visit" onClick={closeMenu}>
          Visit
        </a>
      </nav>
    </header>
  );
}
