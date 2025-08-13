# Hooks

## useIsMobile()
- Source: `src/hooks/use-mobile.tsx`
- Returns: `boolean` that is `true` when `window.innerWidth < 768`.
- Usage:
```tsx
import { useIsMobile } from "@/hooks/use-mobile";

const ResponsiveOnly = () => {
  const isMobile = useIsMobile();
  return <div>{isMobile ? "On mobile" : "On desktop"}</div>;
};
```

## Toast system (custom)
- Source: `src/hooks/use-toast.ts`
- Public exports: `useToast`, `toast`, `reducer`
  - `useToast()` returns `{ toasts, toast, dismiss }`
  - `toast({ title?, description?, action?, ... })` enqueues a toast; returns `{ id, update, dismiss }`
  - `reducer(state, action)` pure reducer powering the store
- UI primitives for rendering are in `src/components/ui/toast.tsx`. A ready-to-use `<Toaster />` lives in `src/components/ui/toaster.tsx` and is already mounted in `App`.
- Re-export for convenience: `src/components/ui/use-toast.ts` exposes `useToast` and `toast`.

Usage (recommended import path):
```tsx
import { useToast } from "@/components/ui/use-toast";

const Example = () => {
  const { toast } = useToast();
  return (
    <button
      onClick={() =>
        toast({ title: "Saved", description: "Your changes have been saved." })
      }
    >Notify</button>
  );
};
```

Programmatic toast without hook:
```tsx
import { toast } from "@/components/ui/use-toast";

toast({ title: "Heads up", description: "This is a message." });
```

Alternative Sonner toaster:
```tsx
import { Toaster as Sonner, toast } from "@/components/ui/sonner";

// In your root:
// <Sonner />
// Then call
toast.success("Welcome back!");
```