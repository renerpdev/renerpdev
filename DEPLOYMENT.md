# Cloudflare deployment

Workers Static Assets serves the contents of `out/` on `portfolio.renerp.dev`. The build exports the Next.js pages, compiles Sanity Studio into `out/studio/`, and prints the exported resume to `out/rene-ricardo-resume.pdf`. The Worker serves the Studio shell on deep links.

## Build and verify locally

Use Node and pnpm from `.nvmrc` and `package.json`. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in the local environment or `.env.local`. The optional `NEXT_PUBLIC_SANITY_API_VERSION` defaults to `2024-02-10`. The build clears the persisted Next.js fetch cache and reads published data directly from the Sanity API. Studio uses the same project and dataset.

```sh
corepack pnpm@10.20.0 install --frozen-lockfile
corepack pnpm@10.20.0 test
corepack pnpm@10.20.0 check:worker
corepack pnpm@10.20.0 build
corepack pnpm@10.20.0 preview
```

The PDF build uses bundled Chromium on Linux and Google Chrome on macOS. Set `PUPPETEER_EXECUTABLE_PATH` to use another Chrome or Chromium executable. The resume download URL from the previous deployment redirects to the generated PDF.

## Workers Builds

Connect the `renerpdev-portfolio` Worker to `renerpdev/renerpdev` on GitHub and select `cloudflare-production` as the production branch, with repository root `/`. The repository's protected `main` branch remains the integration branch. Configure the build with the Sanity project and `NEXT_PUBLIC_SANITY_DATASET=production`, `NODE_VERSION=22.12.0`, and `HUSKY=0`. Enable build caching and let Workers Builds install the dependencies from the lockfile.

| Setting | Value |
| --- | --- |
| Build command | `corepack pnpm@10.20.0 test && corepack pnpm@10.20.0 check:worker && corepack pnpm@10.20.0 build` |
| Deploy command | `corepack pnpm@10.20.0 run deploy` |
| Other branches | Automatic deployments disabled |
| Custom domain | `portfolio.renerp.dev` |

Create a Workers Builds Deploy Hook for `cloudflare-production` and connect it to Sanity as described in [SANITY.md](SANITY.md). Keep its URL in the provider settings. Cloudflare keeps the previous deployment available when a build fails.

## Release checks

- Confirm the home page, resume, print page, and PDF respond on the custom domain. Check `/api/resume/pdf` redirects to the file and a nonexistent page responds with HTTP 404.
- Open `/studio` and refresh a document deep link. Confirm Sanity authentication is available and the assets load.
- Confirm the portfolio serves responsive Sanity image URLs and the published content is present in the exported HTML.
- Check the Sanity webhook delivery and the matching Deploy Hook build on Cloudflare. After it finishes, verify the updated page or PDF.

[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) · [Workers Builds Deploy Hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/)
