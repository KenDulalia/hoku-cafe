import { Mail } from "lucide-react";

export default function VisitSection() {
  return (
    <section className="visit-section" id="visit">
      <div>
        <p className="eyebrow">Come by soon</p>
        <h2>Visit Hoku Cafe</h2>
        <p>
          Open daily from 11:00 PM to 7:00 AM. Perfect for coffee dates, study
          sessions, and quiet breaks.
        </p>
      </div>

      <a className="visit-button" href="mailto:hello@hokucafe.test">
        <Mail size={18} />
        Contact us
      </a>
    </section>
  );
}
