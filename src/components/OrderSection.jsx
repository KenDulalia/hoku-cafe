import { useEffect, useState } from "react";

export default function OrderSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    menuItemId: "",
    quantity: 1,
  });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadMenuItems() {
      const response = await fetch("/api/menu");
      const data = await response.json();

      setMenuItems(data);

      if (data.length > 0) {
        setFormData((currentData) => ({
          ...currentData,
          menuItemId: String(data[0].id),
        }));
      }
    }

    loadMenuItems();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const selectedItem = menuItems.find(
      (item) => item.id === Number(formData.menuItemId)
    );

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: formData.customerName,
        email: formData.email,
        items: [
          {
            menuItemId: selectedItem.id,
            quantity: Number(formData.quantity),
            price: Number(selectedItem.price),
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setStatusMessage(`Order saved! Order ID: ${data.orderId}`);
    } else {
      setStatusMessage(data.message);
    }
  }

  return (
    <section className="order-section" id="order">
      <p className="eyebrow">Order ahead</p>
      <h2>Place an Order</h2>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Menu item
          <select
            name="menuItemId"
            value={formData.menuItemId}
            onChange={handleChange}
          >
            {menuItems.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name} - PHP {item.price}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        <button className="visit-button" type="submit">
          Save order
        </button>

        {statusMessage && <p className="form-status">{statusMessage}</p>}
      </form>
    </section>
  );
}