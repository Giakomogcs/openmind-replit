# MCP Platform - Replit Setup

## Overview
MCP Platform (Model Context Protocol Platform) is a full-stack web application that enables dynamic connections to RESTful APIs and PostgreSQL databases, translating natural language into API calls and SQL queries.

## Project Structure
This is a monorepo using npm Workspaces:
- `mcp-server/` - NestJS backend server (runs on port 3000)
- `mcp-client/` - React TypeScript frontend (runs on port 5000)
- `schemas/` - JSON Schema for UI Dictionary

## Recent Changes
**2025-10-24** - Arquitetura completa refatorada
- Installed all dependencies (zustand, recharts, lucide-react, axios)
- Configured environment variables for development
- Set up frontend on port 5000 with proxy support
- Set up backend on port 3000 (localhost)
- Configured .gitignore to exclude .env files and build artifacts
- Created workflow to run both frontend and backend concurrently
- **MAJOR**: Refatorada arquitetura completa para suportar renderização dinâmica
- Implementado chat collapsível no footer
- Criado sistema de componentes dinâmicos (Card, Table, Chart, Form, Grid, Text)
- Adicionado gerenciamento de estado global com Zustand
- Criadas páginas: Canvas (área de trabalho), Collections, Connections
- Layout responsivo moderno com sidebar collapsível

## Architecture

### Backend (Hub Central)
NestJS application with:
- **AuthModule**: User management (JWT, OAuth)
- **OrchestratorModule**: LLM agent for processing requests (POST /orchestrate)
- **ProvisionerModule**: Container orchestration for adapters
- **Database**: PostgreSQL for users and connections
- **MCP Integration**: Model Context Protocol support

### Frontend (Dynamic UI Platform)
React + TypeScript application with modular architecture:

#### State Management (Zustand)
- `useAppStore`: Global state management
  - Chat messages with component schemas
  - Dynamic pages registry
  - MCP session metadata
  - UI state (footer chat, sidebar collapse)
  - Persistent storage (localStorage + IndexedDB)

#### Components Structure
1. **Layout Components**:
   - `App.tsx`: Main shell (Sidebar + Canvas + FooterChat)
   - `Canvas`: Dynamic component rendering area
   - `Collections`: Saved dynamic pages
   - `Connections`: API/DB connection management
   - `FooterChat`: Collapsible chat interface

2. **Dynamic Rendering System** (`components/dynamic/`):
   - `DynamicRenderer`: Schema-based component selector
   - `TextComponent`: Rich text display
   - `CardComponent`: Metrics cards with trends
   - `TableComponent`: Sortable/searchable tables
   - `ChartComponent`: Line/Bar/Area charts (Recharts)
   - `FormComponent`: Dynamic forms with validation
   - `GridComponent`: Responsive grid layouts

3. **Service Layer**:
   - `mcpService`: API integration with backend orchestrator
   - Mock responses for development/testing

#### Data Flow
1. User sends message via FooterChat
2. Message sent to MCP backend (`/orchestrate`)
3. Backend returns ComponentSchema
4. Store updates currentPage with schema
5. DynamicRenderer interprets schema
6. Component rendered in Canvas
7. History persisted in localStorage

## Development Setup

### Environment Variables

**Backend** (`mcp-server/.env`):
- `PORT=3000` - Backend server port
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `ENCRYPTION_KEY` - 32-byte key for encrypting credentials
- `LLM_API_KEY` - API key for LLM provider

**Frontend** (`mcp-client/.env`):
- `PORT=5000` - Frontend dev server port
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Required for Replit proxy
- `WDS_SOCKET_PORT=443` - WebSocket configuration for Replit
- `REACT_APP_API_URL=http://localhost:3000` - Backend API URL

### Running the Application
The application runs using a single workflow that starts both frontend and backend:
```bash
npm run dev
```

This uses `concurrently` to run:
- Backend: `npm run start:dev --workspace=mcp-server`
- Frontend: `npm start --workspace=mcp-client`

### Database
The application uses PostgreSQL with TypeORM. The schema is auto-synchronized in development mode.

Main entities:
- `users` - User accounts
- `connections` - API and database connections

## User Preferences
(To be added as work continues)

## Next Steps
- Set up PostgreSQL database with proper credentials
- Configure LLM API key (OpenAI, Anthropic, etc.)
- Implement connection diagnostic pipeline
- Build adapter provisioning system
