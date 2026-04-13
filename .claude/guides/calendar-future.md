# Future: Availability Calendar

This is a backlog feature — do not implement in v1.

## Option A — Embeddable Widget (Recommended)

**Smoobu**, **Lodgify**, or **Superhote** provide a free embeddable availability widget that auto-syncs with Airbnb and Booking.com calendars via iCal. Drop the embed script into a new `Availability.astro` section.

Prerequisite: owner must have a Smoobu/Lodgify account and have synced their listings.

## Option B — FullCalendar.js + iCal Feed (Custom)

Parse Airbnb/Booking.com iCal feeds via a Vercel Edge Function and render with FullCalendar.

### Architecture

```
Vercel Edge Function (api/calendar.ts)
  → fetches Airbnb iCal URL  (from env var)
  → fetches Booking.com iCal URL  (from env var)
  → parses VEVENT blocks with ical.js
  → returns merged JSON array of booked date ranges

Calendar.astro (client:load island)
  → calls /api/calendar on mount
  → renders FullCalendar with booked dates greyed out
```

### Dependencies (when ready)

```bash
npm install @fullcalendar/core @fullcalendar/daygrid ical.js
```

### Environment Variables

```
AIRBNB_ICAL_URL=https://www.airbnb.fr/calendar/ical/XXXXX.ics?s=...
BOOKING_ICAL_URL=https://ical.booking.com/v1/export?t=...
```

Both URLs are available in the host platform dashboard under "Calendar sync" or "iCal export".

### Edge Function skeleton

```ts
// api/calendar.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const AIRBNB_ICAL = process.env.AIRBNB_ICAL_URL!;
const BOOKING_ICAL = process.env.BOOKING_ICAL_URL!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const [a, b] = await Promise.all([
    fetch(AIRBNB_ICAL).then(r => r.text()),
    fetch(BOOKING_ICAL).then(r => r.text()),
  ]);
  const events = parseIcal(a + b); // use ical.js
  res.json(events);
}
```

### Tradeoff vs Option A

| | Option A (widget) | Option B (custom) |
|---|---|---|
| Setup time | ~30 min | ~1 day |
| Maintenance | Zero (hosted) | You own the parser |
| Customization | Limited (widget styles) | Full control |
| Platform sync | Auto via iCal | Manual via env vars |

**Recommendation:** start with Option A. Move to Option B only if the owner needs specific UI control.
