# Utilities

## cn(...classValues)

- Source: `src/lib/utils.ts`
- Signature: `cn(...inputs: ClassValue[]): string`
- Combines arbitrary class name values using `clsx` and merges Tailwind classes with `tailwind-merge`.

Example:
```tsx
import { cn } from "@/lib/utils";

const Pill = ({ active }: { active?: boolean }) => (
  <span className={cn("px-2 py-1 rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted")}>Pill</span>
);
```