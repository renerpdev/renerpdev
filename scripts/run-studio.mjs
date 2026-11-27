import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"

const require = createRequire(import.meta.url)
const manifestPath = require.resolve("sanity/package.json")
const { bin } = require(manifestPath)
const [command, ...args] = process.argv.slice(2)
const studioOutput = "out/studio"
const building = command === "build"
const studioArgs = building ? ["build", studioOutput, "--yes"] : [command, ...args]

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!projectId || !dataset) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET")

const result = spawnSync(process.execPath, [resolve(dirname(manifestPath), bin.sanity), ...studioArgs], {
  stdio: "inherit",
  env: {
    ...process.env,
    SANITY_STUDIO_PROJECT_ID: projectId,
    SANITY_STUDIO_DATASET: dataset,
    SANITY_STUDIO_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-10"
  }
})

if (result.error) throw result.error
if (building && result.status === 0 && !existsSync(resolve(studioOutput, "index.html"))) {
  throw new Error("Sanity Studio build did not produce an index.html file")
}
process.exitCode = result.status ?? 1
