export class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  async match(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    const now = Date.now();
    if (entry.expiresAt && entry.expiresAt <= now) {
      this.store.delete(key);
      return undefined;
    }
    return new Response(entry.body, { headers: entry.headers });
  }

  async put(key, response) {
    const headers = {};
    response.headers?.forEach((value, header) => {
      headers[header] = value;
    });
    const body = await response.clone().text();
    const cacheControl = headers["cache-control"] || headers["Cache-Control"] || "";
    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/i);
    const expiresAt = maxAgeMatch ? Date.now() + parseInt(maxAgeMatch[1], 10) * 1000 : null;
    this.store.set(key, { body, headers, expiresAt });
  }
}
