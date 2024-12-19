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
