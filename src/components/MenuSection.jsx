import { Coffee, Cookie, CupSoda } from "lucide-react";
import { useEffect, useState } from "react";

const iconByName = {
  "Hoku Iced Latte": Coffee,
  "Matcha Latte": CupSoda,
  Brownies: Cookie,
  "Classic Cookies": Cookie,
};

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <p className="eyebrow">Customer favorites</p>
        <h2>Featured Menu</h2>
      </div>

      {isLoading && <p className="menu-status">Loading menu...</p>}
      {errorMessage && <p className="menu-status">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <div className="category-filter">
          {categories.map((category) => (
            <button
              type="button"
              className={selectedCategory === category ? "is-active" : ""}
              onClick={() => setSelectedCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="menu-grid">
        {filteredMenuItems.map((item) => {
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