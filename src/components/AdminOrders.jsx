import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await fetch("/api/orders");
      const data = await response.json();

      setOrders(data);
    }

    loadOrders();
  }, []);

  return (
    <section className="admin-section">
      <p className="eyebrow">Admin</p>
      <h2>Recent Orders</h2>

      <div className="admin-list">
        {orders.map((order) => (
          <article className="admin-message" key={`${order.order_id}-${order.item_name}`}>
            <h3>Order #{order.order_id}</h3>
            <p>{order.customer_name}</p>
            <p>{order.email}</p>
            <p>
              {order.item_name} x {order.quantity}
            </p>
            <strong>PHP {order.total_amount}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}