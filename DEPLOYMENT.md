# Deployment Guide

## Vercel Deployment Strategy

This project uses a custom build process for Vercel deployments that optimizes for speed on production builds while maintaining code quality on preview deployments.

### How It Works

The deployment process uses different strategies based on the environment:

#### Preview Deployments (PRs, branches)

- ✅ **Runs ESLint** before building
- ✅ Catches linting errors early
- ✅ Ensures code quality in previews
- Command: `pnpm lint && pnpm build`

#### Production Deployments (main branch)

- ⚡ **Skips ESLint** during build
- ⚡ Faster deployments
- ✅ Assumes code quality already validated via:
  - Pre-commit hooks (husky + lint-staged)
  - PR review process
  - Preview deployment checks
- Command: `pnpm build`

### Configuration Files

#### `vercel.json`

```json
{
  "buildCommand": "pnpm vercel-build",
  "installCommand": "pnpm install"
}
```

#### `scripts/vercel-build.sh`

Conditional build script that checks `VERCEL_ENV` environment variable:

- `production` → Skip lint, build only
- `preview` → Run lint + build

#### `package.json`

```json
{
  "scripts": {
    "vercel-build": "./scripts/vercel-build.sh"
  }
}
```

### Environment Variables

Vercel automatically sets these:

- `VERCEL_ENV`: `production` | `preview` | `development`
- `VERCEL_GIT_COMMIT_REF`: Branch name

### Local Testing

Test preview mode:

```bash
VERCEL_ENV=preview pnpm vercel-build
```

Test production mode:

```bash
VERCEL_ENV=production pnpm vercel-build
```

### Benefits

1. **Faster Production Deploys** - No linting overhead
2. **Code Quality Maintained** - Linting happens at multiple checkpoints:
   - Pre-commit (husky + lint-staged)
   - PR previews (full lint)
   - Manual runs (`pnpm lint`)
3. **Consistent CI/CD** - Same commands work locally and in Vercel
4. **Cost Efficient** - Faster builds = lower build minutes usage

### Troubleshooting

If you need to force linting on production:

```bash
# Temporarily modify scripts/vercel-build.sh
# Remove the VERCEL_ENV check
pnpm lint && pnpm build
```

Or run lint separately:

```bash
pnpm lint
```
