import { rm } from "node:fs/promises"

// Start each export with fresh responses from Sanity.
await rm(new URL("../.next/cache/fetch-cache/", import.meta.url), { recursive: true, force: true })
