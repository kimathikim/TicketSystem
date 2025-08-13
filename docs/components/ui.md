# UI Primitives

Import from `@/components/ui/*`.

## Button
- File: `ui/button.tsx`
- Exports: `Button`, `buttonVariants`, `ButtonProps`
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `hero`, `accent`
- Sizes: `default`, `sm`, `lg`, `icon`, `mobile`

Example:
```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline" size="lg">Click me</Button>
```

## Card
- File: `ui/card.tsx`
- Exports: `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`

Example:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Body</CardContent>
</Card>
```

## Input
- File: `ui/input.tsx`
- Exports: `Input`

```tsx
import { Input } from "@/components/ui/input";
<Input placeholder="Search" />
```

## Textarea
- File: `ui/textarea.tsx`
- Exports: `Textarea`, `TextareaProps`

```tsx
import { Textarea } from "@/components/ui/textarea";
<Textarea placeholder="Message" rows={4} />
```

## Label
- File: `ui/label.tsx`
- Exports: `Label`

```tsx
import { Label } from "@/components/ui/label";
<Label htmlFor="email">Email</Label>
```

## Tabs
- File: `ui/tabs.tsx`
- Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one">Tab one</TabsContent>
  <TabsContent value="two">Tab two</TabsContent>
</Tabs>
```

## Badge
- File: `ui/badge.tsx`
- Exports: `Badge`, `badgeVariants`, `BadgeProps`

```tsx
import { Badge } from "@/components/ui/badge";
<Badge variant="secondary">New</Badge>
```

## Checkbox
- File: `ui/checkbox.tsx`
- Exports: `Checkbox`

```tsx
import { Checkbox } from "@/components/ui/checkbox";
<Checkbox id="remember" />
```

## RadioGroup
- File: `ui/radio-group.tsx`
- Exports: `RadioGroup`, `RadioGroupItem`

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="a">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="a" value="a" />
    <label htmlFor="a">Option A</label>
  </div>
</RadioGroup>
```

## Separator
- File: `ui/separator.tsx`
- Exports: `Separator`

```tsx
import { Separator } from "@/components/ui/separator";
<Separator className="my-4" />
```

## Switch
- File: `ui/switch.tsx`
- Exports: `Switch`

```tsx
import { Switch } from "@/components/ui/switch";
<Switch defaultChecked />
```

## Select
- File: `ui/select.tsx`
- Exports: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectSeparator`, `SelectLabel`, `SelectScrollUpButton`, `SelectScrollDownButton`

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select defaultValue="nairobi">
  <SelectTrigger className="w-[200px]"><SelectValue placeholder="Location" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="nairobi">Nairobi</SelectItem>
    <SelectItem value="mombasa">Mombasa</SelectItem>
  </SelectContent>
</Select>
```

## Tooltip
- File: `ui/tooltip.tsx`
- Exports: `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>Hint</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Popover
- File: `ui/popover.tsx`
- Exports: `Popover`, `PopoverTrigger`, `PopoverContent`

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

## Calendar
- File: `ui/calendar.tsx`
- Exports: `Calendar`, `CalendarProps`

```tsx
import { Calendar } from "@/components/ui/calendar";
<Calendar mode="single" />
```

## Toasts
- Files: `ui/toast.tsx`, `ui/toaster.tsx`, `ui/use-toast.ts`
- Exports: `Toaster` (renderer), `useToast`, `toast` (hook + imperative)

```tsx
import { Toaster } from "@/components/ui/toaster"; // mounted in App
import { useToast } from "@/components/ui/use-toast";

const Demo = () => {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: "Hi" })}>Toast</button>;
};
```

## Sonner Toaster (alternative)
- File: `ui/sonner.tsx`
- Exports: `Toaster`, `toast`

```tsx
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
<Sonner />
<button onClick={() => toast.success("Done")}>Notify</button>
```

## Sheet
- File: `ui/sheet.tsx`
- Exports: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetPortal`, `SheetOverlay`, `SheetClose`

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Breadcrumb
- File: `ui/breadcrumb.tsx`
- Exports: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Events</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## AspectRatio
- File: `ui/aspect-ratio.tsx`
- Exports: `AspectRatio`

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
<AspectRatio ratio={16 / 9}><img src="/image.jpg" className="object-cover w-full h-full" /></AspectRatio>
```

## Carousel
- File: `ui/carousel.tsx`
- Exports: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

<Carousel>
  <CarouselContent>
    {[1,2,3].map((i) => (
      <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
        Slide {i}
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Charts
- File: `ui/chart.tsx`
- Exports: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`, `ChartConfig`

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

<ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
  <LineChart data={[{ day: "Mon", revenue: 100 }, { day: "Tue", revenue: 150 }]}>
    <XAxis dataKey="day" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" />
  </LineChart>
</ChartContainer>
```

## Collapsible
- File: `ui/collapsible.tsx`
- Exports: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Show</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

## Dialog
- File: `ui/dialog.tsx`
- Exports: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogPortal`, `DialogOverlay`, `DialogClose`

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>
```

## Alert
- File: `ui/alert.tsx`
- Exports: `Alert`, `AlertTitle`, `AlertDescription`

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something happened.</AlertDescription>
</Alert>
```

## HoverCard
- File: `ui/hover-card.tsx`
- Exports: `HoverCard`, `HoverCardTrigger`, `HoverCardContent`

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>Preview content</HoverCardContent>
</HoverCard>
```

## Drawer
- File: `ui/drawer.tsx`
- Exports: `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerPortal`, `DrawerOverlay`, `DrawerClose`

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

## Dropdown Menu
- File: `ui/dropdown-menu.tsx`
- Exports: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuShortcut`

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Note: Additional primitives exist in `ui/*`