import { Coffee, Cookie, CupSoda } from "lucide-react";
import { useEffect, useState } from "react";

const iconByName = {
  "Hoku Iced Latte": Coffee,
  "Matcha Latte": CupSoda,
  "Classic Cookies": Cookie,
};

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const response = await fetch("/api/menu");

        if (!response.ok) {
          throw new Error("Unable to load menu items.");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMenuItems();
  }, []);

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <p className="eyebrow">Customer favorites</p>
        <h2>Featured Menu</h2>
      </div>

      {isLoading && <p className="menu-status">Loading menu...</p>}
      {errorMessage && <p className="menu-status">{errorMessage}</p>}

      <div className="menu-grid">
        {menuItems.map((item) => {
          const Icon = iconByName[item.name] ?? Coffee;

          return (
            <article className="menu-item" key={item.id}>
              <img src={item.image} alt={item.alt} />
              <div className="menu-item-content">
                <div className="menu-title">
                  <span className="menu-icon">
                    <Icon size={20} />
                  </span>
                  <h3>{item.name}</h3>
                </div>
                <p>{item.description}</p>
                <strong>PHP {item.price}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
