# Sophie

## Development

### Requirements

- Node.js
- pnpm

### Setup

1. Install dependencies

```bash
pnpm i
```

2. Copy Environment Variables

```bash
# frontend
cp ./apps/frontend/.env.local.example ./apps/frontend/.env.local
# backend
cp ./apps/backend/.dev.vars.example ./apps/backend/.dev.vars
```

Fill in the environment variables in the files as needed.

3. Start the development server

```bash
pnpm dev
```

### Scripts

- `pnpm dev` - Start the development server
- `pnpm check` - Run linting and formatting checks
- `pnpm fix` - Fix linting and formatting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm build` - Build frontend and backend
