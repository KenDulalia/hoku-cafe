import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const response = await fetch("/api/messages");
      const data = await response.json();

      setMessages(data);
      setIsLoading(false);
    }

    loadMessages();
  }, []);

  return (
    <section className="admin-section">
      <p className="eyebrow">Admin</p>
      <h2>Contact Messages</h2>

      {isLoading && <p>Loading messages...</p>}

      {!isLoading && messages.length === 0 && (
        <p>No messages yet.</p>
      )}

      <div className="admin-list">
        {messages.map((message) => (
          <article className="admin-message" key={message.id}>
            <h3>{message.customer_name}</h3>
            <p>{message.email}</p>
            <p>{message.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}