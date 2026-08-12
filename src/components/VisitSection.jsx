import { Mail } from "lucide-react";
import { useState } from "react";

export default function VisitSection() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFormData({
        customerName: "",
        email: "",
        message: "",
      });
      setStatusMessage("Thanks! Your message was saved.");
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="visit-section" id="visit">
      <div className="visit-copy">
        <p className="eyebrow">Come by soon</p>
        <h2>Visit Hoku Cafe</h2>
        <p>
          Open daily from 11:00 PM to 7:00 AM. Perfect for coffee dates, study
          sessions, and quiet breaks.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Your name"
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
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you want to ask or order."
            rows="4"
            required
          ></textarea>
        </label>

        <button className="visit-button" type="submit" disabled={isSubmitting}>
          <Mail size={18} />
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {statusMessage && <p className="form-status">{statusMessage}</p>}
      </form>
    </section>
  );
}
