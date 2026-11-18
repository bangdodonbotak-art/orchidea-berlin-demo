export default function Datenschutz() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.25em] uppercase gold">STUB — demo only</p>
      <h1 className="font-display text-5xl font-semibold mt-3">Datenschutzerklärung</h1>
      <p className="muted mt-4">
        This is <b>not</b> a compliant privacy policy (GDPR / BDSG). It is a structured placeholder
        showing what the real policy must cover. Real wording must come from the client /
        a German legal-text provider before launch.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">1. Verantwortlicher</h2>
        <p className="muted mt-2">
          <span className="text-sm">To be supplied: name, address, contact of the data controller; data protection officer if required.</span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">2. What this demo collects</h2>
        <p className="muted mt-2">
          This demo collects no real personal data and sets no tracking cookies. Simulated bookings
          stay in your browser only and are never sent anywhere. In the real build this section must
          list: booking data (name, e-mail, slot), payment data (processed by PayPal — see their
          privacy notice), hosting/server logs, and any analytics — each with purpose, legal basis
          (Art. 6 GDPR), retention period, and recipients.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">3. Cookies &amp; consent</h2>
        <p className="muted mt-2">
          The demo sets no cookies. The real site must list every cookie/tracker, obtain consent
          before non-essential cookies (TTDSG), and offer a way to withdraw consent at any time.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">4. Your rights</h2>
        <p className="muted mt-2">
          Access, rectification, erasure, restriction, portability, objection (Art. 15–21 GDPR),
          and the right to complain to a supervisory authority. <span className="text-sm">Contact details and the competent authority to be supplied by the client.</span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">5. Processors (Auftragsverarbeiter)</h2>
        <p className="muted mt-2">
          <span className="text-sm">To be supplied: hosting (Vercel), payment (PayPal), and any e-mail/SMS providers — each with a data-processing agreement (Art. 28 GDPR).</span>
        </p>
      </section>

      <p className="mt-10"><a className="underline" href="/">← Back to the demo</a></p>
    </main>
  );
}
