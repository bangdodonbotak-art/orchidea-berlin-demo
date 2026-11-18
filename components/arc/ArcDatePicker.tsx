// Orchidea adapter for Arc DatePicker (v4, T3).
// Feature files import ArcDatePicker from here — never from the registry
// path directly. Thin wrapper today; the adapter is the seam if Arc's API
// changes or the component is dropped per the T1 fallback table.
//
// NOTE (v4, recorded limitation): Arc's Calendar starts weeks on SUNDAY
// (US convention, hardcoded via getDay()) in both locales — German users
// expect Monday start. The weekday NAMES are German (Intl de-DE), only
// the ORDER is Sunday-first. Changing it would mean editing the vendored
// calendar module, which the blueprint forbids; the limitation is recorded
// in BUILD-LOG-v4.md instead. The Today button is NOT used: its label is
// hardcoded English ("Today") in the vendored calendar, and 19 Nov (today)
// is not a demo day anyway.
"use client";
import { DatePicker, type DatePickerProps } from "./date-picker/date-picker";

export type ArcDatePickerProps = DatePickerProps;

export function ArcDatePicker(props: DatePickerProps) {
  return <DatePicker {...props} />;
}

export type { DatePickerProps };
export default ArcDatePicker;
