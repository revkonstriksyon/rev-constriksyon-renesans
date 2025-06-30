# Rev Konstriksyon - Construction Company Website

## Overview

Rev Konstriksyon is a premium construction company website built with React, TypeScript, and Vite. The application serves as a comprehensive digital presence for a Haitian construction company, featuring a modern, bilingual interface (French/Haitian Creole) with full content management capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router for client-side navigation
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Database**: Supabase PostgreSQL with real-time subscriptions
- **Authentication**: Supabase Auth for admin authentication
- **API**: Supabase's auto-generated REST API
- **Real-time Updates**: Supabase realtime for live content updates

## Key Components

### Public Website
- **Hero Section**: Dynamic hero with configurable content
- **Services Display**: Showcase of construction services with icons and features
- **Project Portfolio**: Before/after project galleries with filtering
- **Team Profiles**: Staff information and expertise areas
- **Blog System**: Article management with categories and SEO
- **Contact Forms**: Multiple contact methods with form handling
- **Testimonials**: Client feedback with ratings and project details

### Admin Dashboard
- **Content Management**: CRUD operations for all dynamic content
- **Blog Management**: Article creation, editing, and publishing
- **Project Management**: Portfolio item management with image uploads
- **Services Management**: Service offerings configuration
- **Static Content**: Editable site-wide text and messaging
- **Contact Info**: Business contact details management

### Database Schema
- `blogs`: Article content with SEO fields
- `projects`: Portfolio items with before/after images
- `services`: Service offerings with features and pricing
- `static_content`: Site-wide configurable text content
- Authentication managed by Supabase Auth

## Data Flow

1. **Content Delivery**: Static content loaded via custom hooks using TanStack Query
2. **Real-time Updates**: Supabase subscriptions provide live updates without refresh
3. **Admin Actions**: CRUD operations immediately sync across all connected clients
4. **SEO Optimization**: Dynamic meta tags and structured data for search engines
5. **Form Handling**: Contact forms with validation and submission tracking

## External Dependencies

### Core Dependencies
- **@supabase/supabase-js**: Database and authentication client
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **lucide-react**: Modern icon library
- **react-router-dom**: Client-side routing
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **TypeScript**: Type safety and better development experience
- **ESLint**: Code quality and consistency
- **Vite**: Fast development server and build tool
- **PostCSS**: CSS processing and optimization

### Design System
- **Custom Color Palette**: Brand-specific colors with CSS variables
- **Typography**: Poppins for headings, Inter for body text
- **Component Library**: Consistent, accessible components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Deployment Strategy

### Build Configuration
- **Development**: Hot reload with source maps
- **Production**: Optimized bundles with tree shaking
- **Environment Variables**: Supabase credentials and API keys
- **Static Assets**: Optimized images and fonts

### Hosting Considerations
- **Static Site**: Can be deployed to any static hosting service
- **Database**: Supabase handles all backend infrastructure
- **CDN**: Images and assets served via CDN for performance
- **SSL**: HTTPS required for Supabase authentication

### Performance Optimizations
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Caching**: TanStack Query provides intelligent caching
- **Bundle Analysis**: Vite build analyzer for optimization

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### June 30, 2025 - Multilingual System Implementation
- ✓ Complete i18n system with 3 languages (Haitian Creole, French, English)
- ✓ LanguageContext with React Context for global language state
- ✓ LanguageSelector component with flag icons
- ✓ Translation helpers for multilingual content
- ✓ Database schema updated with multilingual fields
- ✓ Admin translation management interface
- ✓ Blog, Projects, Services translation support
- ✓ UI components updated with translation keys
- ✓ Static translations file with comprehensive key-value pairs

### Architecture Updates
- Added `src/contexts/LanguageContext.tsx` for language management
- Added `src/components/LanguageSelector.tsx` for language switching
- Added `src/translations/index.ts` for static translations
- Added `src/components/admin/TranslationManagement.tsx` for admin interface
- Updated all hooks (useBlogs, useProjects, useServices) for multilingual support
- Database tables now include language-specific columns (title_ht, title_fr, title_en, etc.)

### User Interface
- Language selector integrated in header (desktop & mobile)
- Translation management in admin dashboard
- Globe icon for translation actions
- Professional translations for all content types

## Changelog

Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Complete multilingual system implementation