import Pino from "pino";
import type { Logger as LoggerType } from "pino";

class Logger {
  $: LoggerType;
  constructor() {
    this.$ = Pino();
  }
  /**
   * API调用的错误
   * @param path
   * @param error
   */
  errorAPI(path: string, error: unknown | string) {
    if (typeof error === "string") {
      this.$.error(`[API ERROR] ${path}:${error}`);
    } else {
      this.$.error(
        `[API ERROR] ${path}:${
          error?.toString ? error.toString() : "未知错误!"
        }`
      );
    }
  }
}

export const logger = new Logger();
