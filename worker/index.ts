/* global Env, ExportedHandler */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const asset = await env.ASSETS.fetch(request)
    if (
      asset.status === 404 &&
      url.pathname.startsWith("/studio/") &&
      (request.method === "GET" || request.method === "HEAD") &&
      request.headers.get("Accept")?.includes("text/html")
    ) {
      return env.ASSETS.fetch(new Request(new URL("/studio", url), request))
    }
    return asset
  }
} satisfies ExportedHandler<Env>
