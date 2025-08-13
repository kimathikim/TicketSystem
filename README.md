# TicketKenya

A modern event ticketing platform built with React, TypeScript, and Supabase.

## Features

### 🎫 Core Features
- **Event Discovery**: Browse and search for events across Kenya
- **Ticket Booking**: Secure ticket purchasing with multiple payment options
- **User Dashboard**: Manage tickets, view purchase history
- **Event Management**: Admin dashboard for event organizers
- **Mobile Responsive**: Optimized for all devices

### 🔐 Authentication System (Feature 1)
- **User Registration**: Email-based signup with verification
- **Secure Login**: JWT-based authentication with HTTP-only cookies
- **User Profiles**: Complete user profile management
- **Role-based Access**: User and admin role separation
- **Protected Routes**: Authentication-required pages
- **Session Management**: Automatic token refresh and logout

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ticketkenya.git
   cd ticketkenya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**

   a. **Create a new Supabase project** at [supabase.com](https://supabase.com)
   
   b. **Get your project credentials** from the Supabase dashboard:
      - Go to Settings > API
      - Copy your Project URL and anon/public key

   c. **Configure environment variables**
      ```bash
      cp .env.local.example .env.local
      ```
      
      Update `.env.local` with your Supabase credentials:
      ```env
      VITE_SUPABASE_URL=your_supabase_project_url
      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
      VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
      ```

4. **Set up the database**

   a. **Run the migrations** in your Supabase SQL editor:
      ```sql
      -- Copy and run the contents of:
      -- supabase/migrations/20240101000000_create_users_table.sql
      -- supabase/migrations/20240101000001_create_rls_policies.sql
      ```

   b. **Deploy Edge Functions** (optional, for production):
      ```bash
      npx supabase functions deploy auth-me
      npx supabase functions deploy auth-register
      npx supabase functions deploy auth-login
      npx supabase functions deploy auth-logout
      ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Database Schema

The authentication system uses the following database structure:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- User roles enum
CREATE TYPE user_role AS ENUM ('user', 'admin');
```

### Authentication Flow

1. **Registration**:
   - User fills registration form
   - Supabase Auth creates user account
   - Trigger automatically creates user profile
   - Email verification sent (optional)

2. **Login**:
   - User provides email/password
   - Supabase Auth validates credentials
   - JWT token stored in HTTP-only cookie
   - User profile fetched from database

3. **Protected Routes**:
   - `ProtectedRoute` component checks authentication
   - Redirects to login if not authenticated
   - Preserves intended destination

4. **Session Management**:
   - Automatic token refresh
   - Persistent sessions across browser restarts
   - Secure logout with cookie clearing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── ProtectedRoute.tsx  # Authentication wrapper
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Route components
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── MyTickets.tsx   # User dashboard
│   └── ...
├── lib/               # Utilities and configurations
│   └── supabase.ts    # Supabase client setup
└── hooks/             # Custom React hooks

supabase/
├── migrations/        # Database migrations
├── functions/         # Edge Functions
│   ├── auth-me/      # Get current user
│   ├── auth-login/   # User login
│   ├── auth-register/ # User registration
│   └── auth-logout/  # User logout
└── config.toml       # Supabase configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication API

The app includes Edge Functions for authentication:

### GET /api/auth/me
Returns the current user's profile with role information.

### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+254712345678"
}
```

### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST /api/auth/logout
Clears authentication cookies and signs out the user.

## Security Features

- **Row Level Security (RLS)**: Database-level access control
- **HTTP-only Cookies**: Secure token storage
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Client and server-side validation
- **Password Hashing**: Secure password storage via Supabase Auth

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@ticketkenya.com or join our community Discord.

---

Built with ❤️ for the Kenyan events community
