// Cache simples em memória com TTL
class TTLCache {
  private ttl: number;
  private map: Map<string, { value: any; timestamp: number }>;

  constructor(ttlSeconds = 300) {
    this.ttl = ttlSeconds * 1000;
    this.map = new Map();
  }

  get(key: string) {
    const v = this.map.get(key);
    if (!v) return null;
    const isExpired = Date.now() - v.timestamp > this.ttl;
    if (isExpired) {
      this.map.delete(key);
      return null;
    }
    return v.value;
  }

  set(key: string, value: any) {
    this.map.set(key, { value, timestamp: Date.now() });
  }

  clear() {
    this.map.clear();
  }
}
module.exports = TTLCache;