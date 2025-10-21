#!/bin/bash

# Exit on error
set -e

echo "🔍 Checking deployment context..."

# Check if this is a production deployment (merging to main)
if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ Production deployment - skipping lint, running build only"
  pnpm build
else
  echo "🔬 Preview deployment - running lint + build"
  pnpm lint
  pnpm build
fi

