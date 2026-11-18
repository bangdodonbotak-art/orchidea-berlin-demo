// Shared uniform service card (v3.6) — the SINGLE service-card design,
// used identically by the homepage "Services & prices" section and the
// /services page. Dony's order 18 Nov 2026 ~12:42 WIB: all 8 cards EXACTLY
// the same size — symmetric and proportional, no featured/wide/tall/row
// variants (the old varied layout from v3.1 is deleted). Deliberate
// deviation from the SOP anti-slop "vary sizes" rule: user instruction wins.
//
// Uniformity mechanics:
// - Image: fixed aspect-[4/3], object-cover — same ratio on every card.
// - Body: same padding + type scale on every card. Title and description
//   reserve 2 lines each (min-h), so DE long words can't shift heights.
// - Footer: `mt-auto` pins price + "Book →" to the same baseline in every
//   card of a row (grid is items-stretch), above a gold-tinted hairline.
// - Grid (in both pages): 1 col mobile, 2 cols tablet, 4 cols x 2 rows
//   desktop, consistent gaps.
import { fmtEUR, type Service } from "./data";

export type ServiceCardProps = {
  s: Service;
  /** Localised display strings (helpers live in the parent page). */
  name: string;
  desc: string;
  alt: string;
  catLabel: string;
  priceFrom: string;
  priceUpTo: string;
  minUnit: string;
  bookCta: string;
  /** What "Book →" does — homepage preselects in-page, /services stores
      the choice and navigates to /#booking (see orchidea-service). */
  onBook: () => void;
  index?: number;
};

export default function ServiceCard({
  s, name, desc, alt, catLabel, priceFrom, priceUpTo, minUnit, bookCta, onBook, index = 0,
}: ServiceCardProps) {
  return (
    <article
      className="reveal visible card rounded-2xl overflow-hidden lift flex flex-col h-full"
      style={{ ["--d" as string]: `${index * 0.06}s` }}
    >
      <div className="overflow-hidden shrink-0">
        <img
          src={s.img}
          alt={alt}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-1 flex-col">
        <p className="text-xs tracking-[0.2em] uppercase gold">
          {catLabel} · {s.mins} {minUnit}
        </p>
        <h3 className="font-display text-[1.4rem] leading-snug font-semibold mt-1 min-h-[3.85rem]">
          {name}
        </h3>
        <p className="muted text-sm mt-1 min-h-[2.5rem]">{desc}</p>
        <div className="mt-auto pt-3">
          <div
            className="border-t pt-3 flex items-end justify-between gap-2"
            style={{ borderColor: "var(--line)" }}
          >
            <button
              className="text-sm font-semibold accent hover:underline shrink-0"
              onClick={onBook}
            >
              {bookCta}
            </button>
            <div className="text-right shrink-0">
              <div className="font-display text-2xl font-semibold leading-none">
                {priceFrom} {fmtEUR(s.from)}
              </div>
              <div className="muted text-xs mt-1">
                {priceUpTo} {fmtEUR(s.to)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
