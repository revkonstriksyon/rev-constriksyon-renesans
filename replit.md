# Rev Konstriksyon - Full Stack Web Application

## Overview

This is a full-stack web application for Rev Konstriksyon, a construction company in Haiti. The application serves as a complete business website with content management capabilities, built using modern web technologies and following a monorepo structure.

## System Architecture

**Frontend Architecture:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Tailwind CSS for styling with shadcn/ui component library
- React Router for client-side routing
- Tanstack Query for server state management
- React Hook Form with Zod validation

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API design pattern
- Middleware-based request handling
- In-memory storage abstraction for development
- Production-ready database integration with PostgreSQL

**Database:**
- PostgreSQL with Drizzle ORM
- Neon database for serverless PostgreSQL
- Migration system for schema management

## Key Components

**Frontend Components:**
- Responsive header with navigation
- Hero section with dynamic content
- Services showcase
- Project gallery with filtering
- Blog system with categorization
- Contact forms with validation
- Admin dashboard for content management
- SEO optimization with structured data

**Backend Services:**
- Express server with middleware stack
- Database abstraction layer
- Storage interface for CRUD operations
- Route registration system
- Error handling middleware

**Content Management:**
- Multi-language support (Haitian Creole, French, English)
- Dynamic content management
- Image upload and management
- Blog post creation and editing
- Project showcase management

## Data Flow

1. **Client Requests:** Frontend makes API calls to Express server
2. **Server Processing:** Express routes handle requests using storage interface
3. **Database Operations:** Drizzle ORM handles database interactions
4. **Response:** JSON responses sent back to client
5. **State Management:** Tanstack Query manages client-side caching

## External Dependencies

**Core Dependencies:**
- React ecosystem (React, React-DOM, React-Router)
- UI Library (Radix UI components, Tailwind CSS)
- Backend (Express, Drizzle ORM)
- Database (PostgreSQL via Neon)
- Development tools (Vite, TypeScript, ESLint)

**Notable Integrations:**
- Supabase for database and authentication
- Neon for serverless PostgreSQL
- Replit-specific plugins for development environment

## Deployment Strategy

**Development:**
- Vite development server for frontend
- Express server with hot reload
- Database migrations handled by Drizzle Kit
- Environment variables for configuration

**Production:**
- Vite build process creates optimized bundle
- Express server bundled with esbuild
- Static assets served from dist/public
- Database provisioned via environment variables

**Commands:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```