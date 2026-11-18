// Orchidea adapter for Arc Tabs (v4, T4).
// Feature files import ArcTabs/ArcTabsList/ArcTabsTrigger from here —
// never from the registry path directly. Thin wrappers today; the
// adapter is the seam if Arc's API changes or the component is dropped
// per the T1 fallback table.
//
// NOTE (v4, recorded limitation): the TabsList edge scroll buttons carry
// hardcoded English aria-labels ("Scroll tabs left/right") in the
// vendored component — screen-reader-only text, not visible copy.
// Changing them would mean editing the vendored module, which the
// blueprint forbids; recorded in BUILD-LOG-v4.md instead.
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs/tabs";

export function ArcTabs(props: React.ComponentProps<typeof Tabs>) {
  return <Tabs {...props} />;
}
export function ArcTabsList(props: React.ComponentProps<typeof TabsList>) {
  return <TabsList {...props} />;
}
export function ArcTabsTrigger(props: React.ComponentProps<typeof TabsTrigger>) {
  return <TabsTrigger {...props} />;
}
export function ArcTabsContent(props: React.ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props} />;
}
export default ArcTabs;
