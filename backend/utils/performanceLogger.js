/**
 * Utility for fine-grained performance instrumentation of backend endpoints.
 * Measures: Total request duration, MongoDB query time, Controller processing time,
 * Cloudinary operations time, and Response serialization time.
 */
export class PerfTimer {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.startTime = process.hrtime.bigint();
    this.metrics = {
      dbTimeMs: 0,
      controllerTimeMs: 0,
      cloudinaryTimeMs: 0,
      serializationTimeMs: 0,
    };
  }

  /**
   * Measure execution time of a MongoDB query or operation
   */
  async measureDb(fn) {
    const start = process.hrtime.bigint();
    const result = await fn();
    const end = process.hrtime.bigint();
    this.metrics.dbTimeMs += Number(end - start) / 1e6;
    return result;
  }

  /**
   * Measure execution time of a Cloudinary API call
   */
  async measureCloudinary(fn) {
    const start = process.hrtime.bigint();
    const result = await fn();
    const end = process.hrtime.bigint();
    this.metrics.cloudinaryTimeMs += Number(end - start) / 1e6;
    return result;
  }

  /**
   * Record controller processing overhead
   */
  recordController(durationMs) {
    this.metrics.controllerTimeMs += durationMs;
  }

  /**
   * Measure serialization & sending response JSON
   */
  sendJsonResponse(res, statusCode, body, reqMethod = 'GET') {
    const serialStart = process.hrtime.bigint();
    const jsonString = JSON.stringify(body);
    const serialEnd = process.hrtime.bigint();
    this.metrics.serializationTimeMs = Number(serialEnd - serialStart) / 1e6;

    const totalMs = Number(process.hrtime.bigint() - this.startTime) / 1e6;
    const parts = [
      `Total: ${totalMs.toFixed(2)}ms`,
      `DB Query: ${this.metrics.dbTimeMs.toFixed(2)}ms`,
      `Controller: ${this.metrics.controllerTimeMs.toFixed(2)}ms`,
    ];
    if (this.metrics.cloudinaryTimeMs > 0) {
      parts.push(`Cloudinary: ${this.metrics.cloudinaryTimeMs.toFixed(2)}ms`);
    }
    parts.push(`Serialization: ${this.metrics.serializationTimeMs.toFixed(2)}ms`);

    console.log(`[PERF] ${reqMethod} ${this.endpoint} - ${parts.join(' | ')}`);

    res.setHeader('X-Response-Time', `${totalMs.toFixed(2)}ms`);
    res.setHeader('Content-Type', 'application/json');
    return res.status(statusCode).send(jsonString);
  }
}
