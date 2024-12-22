# Sophie

## Development

### Requirements

- Node.js
- pnpm

### Setup

1. Clone the repository with submodules

```bash
git clone --recurse-submodules <repo-url>
```

2. Install dependencies

```bash
pnpm i
```

3. Copy Environment Variables

```bash
# frontend
cp ./apps/frontend/.env.local.example ./apps/frontend/.env.local
# backend
cp ./apps/backend/.dev.vars.example ./apps/backend/.dev.vars
# docker
cp ./.env.example ./.env
```

Fill in the environment variables in the files as needed.

3. Start OpenTripPlanner

```bash
docker comose up -d
```

4. Start the development server

```bash
pnpm dev
```

### Scripts

- `pnpm dev` - Start the development server
- `pnpm check` - Run linting and formatting checks
- `pnpm fix` - Fix linting and formatting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm build` - Build frontend and backend

### Environment Variables

#### Frontend (`.env.local`)

- `VITE_BACKEND_BASE_URL`: Base URL of the backend API

#### Backend (`.dev.vars`)

- `FRONTEND_BASE_URL`: Base URL of the frontend
- `OPENAI_API_KEY`: API key for OpenAI
- `OPENAI_BASE_URL`: Base URL for OpenAI API
- `ODPT_ACCESS_TOKEN`: Access token for ODPT API
- `ODPT_CHALLENGE_ACCESS_TOKEN`: Access token for ODPT Challenge API
- `OTP_GTFS_API_BASEURL`: Base URL for OpenTripPlanner GTFS API

#### Docker (`.env`)

- `ODPT_CHALLENGE_ACCESS_TOKEN`: Access token for ODPT Challenge API
- `OTP_MEMORY_LIMIT`: Memory limit for OpenTripPlanner (ex: `-Xmx16G`)
- `OTP_SERVER_PORT`: Port for OpenTripPlanner server
- `OTP_OPTIONS`: Options for OpenTripPlanner server
  - `--build --save --serve`: Build and save the graph and serve the server (probably only needed for the first time)
  - `--load --serve`: Load the graph and serve the server
