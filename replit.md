# Rev Konstriksyon Construction Website

## Overview

This is a full-stack web application for Rev Konstriksyon, a construction company in Haiti. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence. The site is built as a multilingual (Haitian Creole/French) construction company website with content management capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Routing**: React Router DOM for client-side navigation
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with Vite integration in development mode

### Key Components

#### 1. Frontend Components
- **Layout Components**: Header, Footer, Hero sections
- **Content Sections**: Services, Projects, Testimonials, Blog, Contact
- **Admin Dashboard**: Full CRUD interface for content management
- **Responsive Design**: Mobile-first approach with Tailwind utilities

#### 2. Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory fallback
- **Route Registration**: Modular route organization
- **Database Connection**: Pooled connections using Neon serverless
- **Static Content Management**: Dynamic content delivery system

#### 3. Database Schema
- **Users Table**: Authentication and user management
- **Static Content**: Dynamic content management for website text
- **Services**: Company service offerings with features and pricing
- **Projects**: Portfolio showcase with before/after images
- **Blogs**: Content management system for articles
- **Contact Info**: Centralized contact information management

## Data Flow

1. **Frontend Requests**: React components make API calls through custom hooks
2. **Backend Processing**: Express routes handle requests and interact with database
3. **Database Operations**: Drizzle ORM provides type-safe database queries
4. **Real-time Updates**: Supabase real-time subscriptions for live content updates
5. **Response Handling**: TanStack Query manages caching and state synchronization

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit
- **Supabase**: Authentication and real-time subscriptions

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Neon development instance
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite build generates optimized static assets
- **Backend**: esbuild bundles server code for Node.js deployment
- **Database Migrations**: Drizzle Kit handles schema migrations
- **Static Assets**: Served through Express in production

### Configuration
- **TypeScript**: Shared configuration across client/server/shared modules
- **Path Aliases**: Simplified imports with @ prefixes
- **Module Resolution**: ES modules with bundler resolution

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```