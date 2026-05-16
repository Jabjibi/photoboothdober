# CHANGELOG

All notable changes to Sparkle Booth are recorded here.

---

## [Unreleased]

### 2026-05-16 — แก้ไข dot background หายเมื่อ scroll ใน FramePreviewPane

**Fixed**
- `components/frame-select/frame-preview-pane.tsx` — ย้าย dot background จาก `position: absolute` overlay div มาเป็น `background-image` บน container โดยตรง เพื่อแก้ปัญหาจุดหายเมื่อ scroll (overlay เดิมครอบคลุมแค่ visible height ของ container); ใช้ `color-mix(in srgb, var(--ink) 15%, transparent)` แทน `opacity: 0.15`

### 2026-05-13 — Result screen component refactor + mobile fixes

**Added**
- `components/result/result-header.tsx` — step label + h2 title + retake button (แยกออกจาก result-screen)
- `components/result/printer-mouth.tsx` — status bar บนสุดของ printer box (dot indicator + status text + version)
- `components/result/printer-box.tsx` — printer container ทั้งหมด: dot bg, PrinterMouth, GSAP drop animation, GSAP swing, strip, confetti, `@keyframes confetti`; ย้าย `printing` state + refs + GSAP effects มาไว้ใน component นี้
- `components/result/downloads-card.tsx` — download buttons card (Strip / Photos / Video)
- `components/result/receipt-card.tsx` — receipt block (layout / style / shots / date / time)

**Changed**
- `components/result/result-screen.tsx` — เหลือแค่ orchestrator: download handlers (`downloadStrip`, `downloadPhotos`, `downloadVideo`) + จัด layout → import component ข้างบนมาใช้; แก้ variable shadowing ใน `downloadVideo` (`w`/`h` → `dw`/`dh`)
- `lib/pixel-filters.ts` (**new file**) — แยก pixel filter helpers ออกจาก `use-photo-session.ts` (`bakeFilter` + 6 primitive ops)
- `lib/hook/use-photo-session.ts` — import `bakeFilter` จาก `pixel-filters.ts`, ลบ `FILTERS` import ที่ไม่ใช้แล้ว
- `lib/hook/use-print-animation.ts` (**new**) — แยก GSAP drop + swing logic + `printing` state + refs ออกจาก `printer-box.tsx`; return `{ printing, stripRef, stripWrapRef }`
- `lib/hook/use-confetti.ts` (**new**) — แยก `seededRand` + `useMemo` confetti positions ออกจาก `printer-box.tsx`; return `ConfettiItem[]`
- `components/result/printer-box.tsx` — เหลือแค่ JSX; import `usePrintAnimation` + `useConfetti` มาใช้แทน inline logic

**Fixed**
- `components/result/printer-box.tsx` + `lib/hook/use-print-animation.ts` — tall strip layouts (strip4, strip3v, strip3h) สามารถดูรูปได้ครบทุกช่องบนมือถือ: หลัง GSAP animation เสร็จ (`y: 0`) ล้าง inline transform ด้วย `clearProps: "transform"` แล้วสลับ strip div จาก `absolute` เป็น normal flow (`mx-auto paddingTop: 80`); container ขยายตามเนื้อหาเอง ไม่ต้องวัด height; outer page scroll ใน `result-screen` จัดการ scroll แทน
- `components/result/printer-mouth.tsx` — text ใน printer status bar ไม่ wrap เป็น 2 บรรทัดอีกต่อไป: เปลี่ยนจาก `justify-center` เป็น `justify-between`, จัดกลุ่ม dot+status ซ้าย / version ขวา, เพิ่ม `whitespace-nowrap`, ลด font size บน mobile (`text-[9px] sm:text-[11px]`)
- `components/result/result-header.tsx` — h2 title เล็กลงบน mobile: `text-3xl` → `text-2xl sm:text-3xl` ลดการซ้อนทับกับ nav badge
- `lib/hook/use-photo-session.ts` — filter ไม่ถูก bake ลงรูปใน LINE in-app browser (WKWebView ไม่รองรับ `ctx.filter`): แทน `ctx.filter` ด้วย `getImageData` + `bakeFilter` pixel manipulation ที่ทำงานได้ทุก WebView

---

### 2026-05-08 — Full responsive layout (mobile / iPad / laptop / desktop)

**Changed**
- `app/globals.css` — เพิ่ม `.screen-grid` CSS class: mobile/tablet (< 1024px) เป็น flex column single-column ที่ scroll ได้, laptop+ (≥ 1024px) เป็น 2-column grid `minmax(0,1fr) + min(380px,100%)`
- `components/frame-select/frame-select-screen.tsx` — แทน inline `gridTemplateColumns` style ด้วย `screen-grid` class, padding เปลี่ยนเป็น responsive (`px-4 sm:px-6`)
- `components/camera/camera-screen.tsx` — เช่นเดียวกัน, 2-column grid collapse บน mobile
- `components/result/result-screen.tsx` — เช่นเดียวกัน
- `components/booth/booth-screen.tsx` — ซ่อน corner labels (top-left/top-right) บน mobile ด้วย `hidden sm:block` เพื่อป้องกันการชนกับ booth canvas
- `components/booth/booth-canvas.tsx` — ปรับ booth width จาก `clamp(260px, 35vw, 460px)` เป็น `clamp(240px, 46vw, 460px)` — tablet portrait (768px) ได้ 353px แทน 268px

---

### 2026-05-08 — Camera fix + frame preview + hydration final fix

**Fixed**
- `components/camera/camera-screen.tsx` — กล้องไม่ขึ้นใน dev mode: React StrictMode run `useEffect` 2 รอบทำให้ `play()` ถูก interrupt โดย `srcObject` ใหม่ → แก้ด้วย `cancelled` flag (local per-invocation), เช็คหลัง `await getUserMedia`, set `srcObject = null` ใน cleanup, และ ignore `AbortError` จาก play() เมื่อ cancelled=true
- `components/booth/booth-screen.tsx` — hydration mismatch บน `bgItems` (seeded random): เปลี่ยนจาก `useEffect + setState` เป็น `useSyncExternalStore` (server snapshot=false, client snapshot=true) ทำให้ SSR ไม่ render bgItems เลย ไม่มี mismatch
- `components/booth/booth-screen.tsx` — ม่านไม่เปิดหลัง zoom: เพิ่ม phase `"curtain"` กลับ, `BoothCanvas curtainOpen={phase === "curtain"}`, ใน GSAP `onComplete` → setPhase("curtain") + setTimeout(onStart, 1900) รอ CSS transition จบ (0.4s delay + 1.4s duration)
- `components/frames/strip3h.tsx`, `strip3v.tsx`, `strip4.tsx` — ตัวอักษรขาวบนพื้นชมพู (fairy style): เพิ่ม `isFairy` check → ใช้ `s.palette.ink` แทน `s.palette.paper` สำหรับ header/footer text ใน fairy style

**Changed**
- `components/frame-select/frame-select-screen.tsx` — frame preview: ใช้ CSS `zoom` property แทน `transform: scale() + clipping container` — zoom กระทบ layout flow จริงทำให้ flex centering ถูกต้อง, เปลี่ยน preview pane เป็น `overflow: auto` เพื่อให้ scroll ดู frame ทั้งหมดได้, อัปเดต `FRAME_DIMS` ให้ถูกต้อง (คำนวณจาก CSS `aspectRatio` จริง: height = width / aspect)

---

### 2026-05-08 — Icon refactor + hydration error fix

**Added**
- `components/icons/sparkle-icon.tsx` — pure 4-point sparkle SVG (no positioning/animation)
- `components/icons/star5-icon.tsx` — pure 5-point star SVG
- `components/icons/heart-icon.tsx` — pure heart SVG
- ทั้ง 3 ไฟล์ accept standard `SVGProps` ใช้งานได้ทุกที่ไม่ผูกกับ animation

**Fixed**
- `components/shared/sparkle.tsx`, `star5.tsx`, `heart.tsx` — แก้ hydration mismatch ที่ server truncate float (`"96.6833%"`) ไม่ตรงกับ client (`"96.68333493468708%"`) โดยใช้ `.toFixed(4)` ให้ consistent ทั้งสองฝั่ง
- shared wrappers ตอนนี้ import SVG จาก `components/icons/` แทนการ define inline

---

### 2026-05-08 — Home page UI fixes

**Fixed**
- `components/booth/booth-screen.tsx` — floating labels ("4 SHOTS", "cute mode ✦ on", "★ NEW ✿ 2026") ไม่ซ่อนหลังม่านอีกแล้ว: เพิ่ม `zIndex: 10` ทุก label + ครอบ BoothCanvas ด้วย `zIndex: 1` wrapper เพื่อแยก stacking context ให้ชัด
- `components/booth/booth-screen.tsx` — กด START แล้วซูมเข้าพาไปหน้าต่อไปเลย ไม่บาวน์กลับ: ย้าย `gsap.to()` มาเรียกตรงใน `handleStart()` แทน `useEffect` — ไม่มี cleanup ที่ revert transform อีกต่อไป, เรียก `onStart()` ตรงใน `onComplete` callback
- ตัด phase `"curtain"` ออก เหลือแค่ `"idle"` | `"zooming"`

---


### 2026-05-08 — All 4 screens complete (Frame Select, Camera, Result)

**Added**
- `lib/booth-context.tsx` — global state context (`BoothProvider`, `useBoothContext`):
  manages `screen`, `config` (layoutId, styleId, meta), `photos` across all pages
- `components/booth/booth-app.tsx` — screen router (Client Component), maps screen state to components
- Updated `app/page.tsx` — wraps with `<BoothProvider>` and renders `<BoothApp>`

**Frame renderers** (`components/frames/`) — reusable across frame-select + result:
- `types.ts` — `FRAME_STYLES` dict, `FrameProps` interface
- `photo-cell.tsx` — single photo cell (src or placeholder)
- `strip4.tsx` — 4-shot vertical strip
- `strip3h.tsx` — 3-shot horizontal triptych
- `strip3v.tsx` — 3-shot vertical stack
- `card-frame.tsx` — 1-photo creative license card
- `index.tsx` — `LAYOUTS` map + re-exports for easy import

**Frame Select Screen** (`components/frame-select/`):
- `layout-thumb.tsx` — SVG thumbnail for each layout (no inline component definition)
- `frame-field.tsx` — labeled text input (reusable)
- `frame-select-screen.tsx` — 2-column layout: live preview pane + style/meta sidebar
  - 4 layout cards (2×2 on mobile, 4-col on sm+)
  - 4 style swatches
  - meta fields: header/date for strips, name/birthday/title for card

**Camera Screen** (`components/camera/`):
- `camera-screen.tsx` — webcam access via `getUserMedia`, mirrored video
  - 5 CSS filters (Original, B&W, Warm, Fairy, Noir)
  - 3-2-1 countdown + flash overlay per shot
  - Shot grid tracker (ring highlight on active slot)
  - Demo mode fallback if camera denied
  - Auto-navigates to result after all shots captured

**Result Screen** (`components/result/`):
- `download-button.tsx` — icon download button (reusable)
- `result-screen.tsx` — GSAP print-drop animation (`gsap.fromTo y:-700 → 0`)
  - GSAP swing after reveal (`gsap.to rotation yoyo repeat:-1`)
  - Seeded confetti (Star5 + Sparkle) — no hydration mismatch
  - Download Strip (SVG foreignObject → PNG canvas)
  - Download Photos (individual JPG)
  - Download Video (MediaRecorder WebM slideshow)
  - Receipt block with layout/style/date/time

---

### 2026-05-08 — Home page (BoothScreen) initial implementation

**Added**
- `app/layout.tsx` — 5 Google Fonts loaded via `next/font/google`:
  Bagel Fat One (`--font-bagel`), Caveat (`--font-caveat`), Space Grotesk (`--font-space`),
  Pirata One (`--font-pirata`), DM Mono (`--font-dm-mono`)
- `app/globals.css` — Booth design tokens (`--paper`, `--ink`, `--red`, `--gold`, etc.) +
  keyframes (`twinkle`, `float`, `spin-slow`, `halo-pulse`) + utility classes
  (`font-display`, `font-hand`, `font-news`, etc.)
- `app/page.tsx` — Home route; renders `<BoothNav>` + `<BoothScreen>`

**Shared components** (`components/shared/`) — reusable across all pages:
- `sparkle.tsx` — 4-point sparkle SVG with `twinkle` animation
- `star5.tsx` — 5-point star SVG with `twinkle` animation
- `heart.tsx` — heart SVG with `twinkle` animation
- `marquee-row.tsx` — blinking light-bulb marquee strip (`"use client"`)

**Booth components** (`components/booth/`):
- `booth-canvas.tsx` — physical photobooth visual (sign, body, curtain, interior, stickers)
  — fully responsive via `clamp()` width + percentage-based positioning
- `booth-screen.tsx` — home page screen (`"use client"`):
  - stable seeded random decorations (no hydration mismatch)
  - GSAP zoom animation on START click (`gsap.to` scale 2.4)
  - CSS transition curtain slide (`translateY(-110%)`)
  - responsive Tailwind classes (`sm:` breakpoints)
  - floating label badges hidden on mobile, visible sm+
- `booth-nav.tsx` — top navigation bar with brand mark + step progress pill
  — step pill hidden on mobile

**Dependencies added**
- `gsap@^3.15.0` — animation library
- `shadcn/ui` (init) — component system, `components/ui/button.tsx` + `lib/utils.ts`

**Responsive breakpoints**
- Mobile (< 640px): booth scales down via `clamp()`, floating badges hidden, step pill hidden
- Tablet (640px+): badges visible, step pill visible
- Desktop (1024px+): full layout

**Design source**
- Converted from `photobooth/project/src/booth.jsx` + `app.jsx`
- Theme: cream `#fbf6ee` · ink `#161313` · red `#d8201f` · gold `#f5c542`
