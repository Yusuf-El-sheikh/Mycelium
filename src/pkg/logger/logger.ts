type LogLevel = "Error" | "Debug" | "Info" | "Warn";

export class Logger {
  log(level: LogLevel, message: string, metadata: Record<string, unknown> = {}): void {
    const entry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    console.log(JSON.stringify(entry));
  }

  error(message: string, metadata: Record<string, unknown> = {}): void {
    this.log("Error", message, metadata);
  }

  debug(message: string, metadata: Record<string, unknown> = {}): void {
    this.log("Debug", message, metadata);
  }

  info(message: string, metadata: Record<string, unknown> = {}): void {
    this.log("Info", message, metadata);
  }

  warn(message: string, metadata: Record<string, unknown> = {}): void {
    this.log("Warn", message, metadata);
  }
}

// modules are cached by Node, so exporting one instance is already a singleton
export const logger = new Logger();
