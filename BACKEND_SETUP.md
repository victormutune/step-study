# STEP Study Backend Setup Guide

This guide will help you set up and run the complete backend for the STEP Study website.

## Architecture Overview

The backend is built using:
- **Next.js 14 App Router** with Server Actions
- **PostgreSQL** database (using existing Vercel Postgres)
- **JWT** for authentication
- **bcrypt** for password hashing
- **TypeScript** for type safety

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (already configured via Vercel)
- Access to environment variables

## Installation Steps

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jose` - JWT handling
- `zod` - Schema validation

### 2. Environment Variables

Your environment variables are already configured. The backend uses:

\`\`\`
POSTGRES_URL - Main database connection URL
POSTGRES_PRISMA_URL - Prisma-specific connection URL
POSTGRES_URL_NON_POOLING - Non-pooling connection URL
JWT_SECRET - Secret key for JWT tokens (auto-generated if not set)
\`\`\`

### 3. Database Setup

Run the SQL migration script to create all necessary tables:

1. **Option A: Using the v0 interface**
   - The script is in `scripts/001-create-database-schema.sql`
   - v0 will automatically execute it

2. **Option B: Using psql**
   \`\`\`bash
   psql $POSTGRES_URL -f scripts/001-create-database-schema.sql
   \`\`\`

3. **Option C: Using a PostgreSQL client**
   - Copy the contents of `scripts/001-create-database-schema.sql`
   - Execute in your PostgreSQL client

This creates the following tables:
- `users` - User accounts
- `sessions` - Active user sessions
- `research_data` - Research data points
- `user_activity` - Activity logs

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

#### Register User
\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "institution": "University Name"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
\`\`\`

#### Login
\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
\`\`\`

#### Logout
\`\`\`http
POST /api/auth/logout
\`\`\`

#### Get Current User
\`\`\`http
GET /api/auth/me
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "institution": "University Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-05T10:30:00.000Z"
  }
}
\`\`\`

### Research Data Endpoints

#### Get Research Data
\`\`\`http
GET /api/research/data?chartType=zonal_progress
\`\`\`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": 1,
      "chart_type": "zonal_progress",
      "data_point": "Northern Zone",
      "value": 85.5,
      "metadata": { "schools": 120 },
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
\`\`\`

#### Create Research Data
\`\`\`http
POST /api/research/data
Content-Type: application/json

{
  "chartType": "zonal_progress",
  "dataPoint": "Southern Zone",
  "value": 78.2,
  "metadata": { "schools": 95 }
}
\`\`\`

## Server Actions (Recommended)

For better integration with Next.js, use Server Actions:

\`\`\`typescript
import { loginAction, registerAction, logoutAction } from '@/lib/actions/auth-actions';

// In your component
async function handleLogin(formData: FormData) {
  const result = await loginAction(formData);
  
  if (result.error) {
    console.error(result.error);
  } else {
    // Redirect to dashboard
    router.push('/dashboard');
  }
}
\`\`\`

## Authentication Flow

1. **Registration/Login:**
   - User submits credentials
   - Backend validates input
   - Password is hashed with bcrypt
   - JWT token is created
   - Session is stored in database
   - Token is set as HTTP-only cookie

2. **Authenticated Requests:**
   - Cookie is automatically sent with requests
   - Middleware verifies token
   - User data is available via `getCurrentUser()`

3. **Logout:**
   - Session is deleted from database
   - Cookie is cleared

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ HTTP-only cookies (XSS protection)
- ✅ Secure cookies in production
- ✅ Input validation with Zod
- ✅ SQL injection protection via parameterized queries
- ✅ Session management in database
- ✅ Password strength requirements

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique, indexed
- `password_hash` - Bcrypt hashed password
- `first_name` - User's first name
- `last_name` - User's last name
- `role` - User role (default: 'user')
- `institution` - Optional institution
- `created_at` - Registration timestamp
- `updated_at` - Last update timestamp
- `last_login` - Last login timestamp
- `is_active` - Account status

### Sessions Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `token` - JWT token (unique, indexed)
- `expires_at` - Session expiration
- `created_at` - Session creation timestamp

## Frontend Integration

### Update Login Page

\`\`\`typescript
'use client'

import { loginAction } from '@/lib/actions/auth-actions'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  
  async function handleSubmit(formData: FormData) {
    const result = await loginAction(formData)
    
    if (result.error) {
      // Show error message
      alert(result.error)
    } else {
      // Clear redirectedFromChart flag
      sessionStorage.removeItem('redirectedFromChart')
      
      // Check if user was redirected from research
      const chartData = sessionStorage.getItem('selectedChartData')
      
      if (chartData) {
        router.push('/research-details')
      } else {
        router.push('/dashboard')
      }
    }
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
\`\`\`

### Update Register Page

\`\`\`typescript
'use client'

import { registerAction } from '@/lib/actions/auth-actions'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  
  async function handleSubmit(formData: FormData) {
    const result = await registerAction(formData)
    
    if (result.error) {
      alert(result.error)
    } else {
      router.push('/dashboard')
    }
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
\`\`\`

### Protected Pages

\`\`\`typescript
import { getCurrentUser } from '@/lib/middleware/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {/* Dashboard content */}
    </div>
  )
}
\`\`\`

## Testing

### Test Registration
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "User"
  }'
\`\`\`

### Test Login
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
\`\`\`

## Deployment

The backend is ready for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Environment variables are automatically configured
4. Deploy

The backend will automatically:
- Use production database
- Enable secure cookies
- Optimize for serverless functions

## Troubleshooting

### Database Connection Issues
- Verify `POSTGRES_URL` is set correctly
- Check network connectivity
- Ensure database exists and is accessible

### Authentication Not Working
- Clear cookies and try again
- Check JWT_SECRET is set
- Verify session table exists

### CORS Issues
- Next.js API routes handle CORS automatically
- For external domains, add CORS middleware

## Support

For issues or questions:
1. Check the logs: `npm run dev` shows detailed error messages
2. Verify environment variables are set
3. Ensure database migration completed successfully
4. Check PostgreSQL connection

## Next Steps

1. ✅ Database schema created
2. ✅ Authentication system implemented
3. ✅ API endpoints ready
4. 🔄 Update frontend pages to use Server Actions
5. 🔄 Add protected routes
6. 🔄 Implement user dashboard
7. 🔄 Add admin panel (optional)

Your backend is now fully functional and ready to handle user authentication, session management, and research data storage!
