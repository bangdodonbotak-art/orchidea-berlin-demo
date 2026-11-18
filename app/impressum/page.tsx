export default function Impressum() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.25em] uppercase gold">STUB — demo only</p>
      <h1 className="font-display text-5xl font-semibold mt-3">Impressum</h1>
      <p className="muted mt-4">
        This is <b>not</b> a compliant legal notice (§ 5 DDG). It is a structured placeholder showing
        what the real Impressum must contain. The real text must be supplied by the client /
        a German legal-text provider before launch.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">1. Angaben gemäß § 5 DDG</h2>
        <p className="muted mt-2">
          Orchidea Beauty Parlours (illustration brand, not a real business)<br />
          Berlin, Germany — demo address only.<br />
          <span className="text-sm">To be supplied: full legal name / legal form, street address, telephone, e-mail.</span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">2. Vertretung &amp; Registereintrag</h2>
        <p className="muted mt-2">
          <span className="text-sm">To be supplied: managing director(s), register court + register number (if registered), VAT ID (USt-IdNr.) under § 27a UStG.</span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">3. Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p className="muted mt-2">
          <span className="text-sm">To be supplied: name and address of the person responsible for content.</span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">4. Verbraucherstreitbeilegung</h2>
        <p className="muted mt-2">
          We are not willing or obliged to participate in dispute resolution proceedings before a
          consumer arbitration board. <span className="text-sm">(Confirm with the client&apos;s lawyer — this line must match the real position.)</span>
        </p>
      </section>

      <p className="mt-10"><a className="underline" href="/">← Back to the demo</a></p>
    </main>
  );
}
