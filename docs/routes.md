# Routes

Public routes configured in `src/App.tsx`:

- `/` → `src/pages/Index.tsx`
- `/events` → `src/pages/Events.tsx`
- `/events/:id` → `src/pages/EventDetails.tsx`
- `/checkout` → `src/pages/Checkout.tsx`
- `/confirmation` → `src/pages/Confirmation.tsx`
- `/my-tickets` → `src/pages/MyTickets.tsx`
- `/login` → `src/pages/Login.tsx`
- `/admin/login` → `src/pages/admin/AdminLogin.tsx`
- `/admin/dashboard` → `src/pages/admin/AdminDashboard.tsx`
- `*` (catch-all) → `src/pages/NotFound.tsx`

Example usage in a component:
```tsx
import { useNavigate } from "react-router-dom";

const Example = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/events")}>Go to Events</button>;
};
```