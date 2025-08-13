# App Components

## Header
- File: `src/components/Header.tsx`
- Export: `Header`
- Props:
  - `onNavigate?: (path: string) => void` — called when navigation buttons are clicked

Example:
```tsx
import { Header } from "@/components/Header";

<Header onNavigate={(path) => console.log("navigate", path)} />
```

## Footer
- File: `src/components/Footer.tsx`
- Export: `Footer`
- Props:
  - `onNavigate?: (path: string) => void`

Example:
```tsx
import { Footer } from "@/components/Footer";

<Footer onNavigate={(p) => console.log("nav", p)} />
```

## HeroSection
- File: `src/components/HeroSection.tsx`
- Export: `HeroSection`
- Props:
  - `onNavigate?: (path: string) => void`

Example:
```tsx
import { HeroSection } from "@/components/HeroSection";

<HeroSection onNavigate={(p) => console.log(p)} />
```

## EventCard
- File: `src/components/EventCard.tsx`
- Export: `EventCard`
- Props:
  - `event: { id: string; title: string; category: string; image: string; date: string; time: string; location: string; prices: { regular: number; vip: number; vvip: number }; capacity: number; tags: string[]; featured?: boolean; }`
  - `onClick?: (eventId: string) => void`

Example:
```tsx
import { EventCard } from "@/components/EventCard";

<EventCard
  event={{
    id: "1",
    title: "Tech Conference",
    category: "tech",
    image: "/hero.jpg",
    date: "2025-11-20",
    time: "18:00",
    location: "KICC, Nairobi",
    prices: { regular: 1000, vip: 2500, vvip: 5000 },
    capacity: 5000,
    tags: ["AI", "Cloud"],
  }}
  onClick={(id) => console.log("event", id)}
/>
```

## TestimonialSection
- File: `src/components/TestimonialSection.tsx`
- Export: `TestimonialSection`
- Props: none

Example:
```tsx
import { TestimonialSection } from "@/components/TestimonialSection";

<TestimonialSection />
```

## WhyChooseUs
- File: `src/components/WhyChooseUs.tsx`
- Export: `WhyChooseUs`
- Props: none

Example:
```tsx
import { WhyChooseUs } from "@/components/WhyChooseUs";

<WhyChooseUs />
```