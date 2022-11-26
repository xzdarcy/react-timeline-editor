export enum LogLevel {
  VERBOSE = 0,
  LOG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
  SILENT = Infinity
}

export const LogLevels = {
  VERBOSE: LogLevel.VERBOSE,
  LOG: LogLevel.LOG,
  INFO: LogLevel.INFO,
  WARN: LogLevel.WARN,
  ERROR: LogLevel.ERROR,
  SILENT: LogLevel.SILENT,
};

function colorize(hex: string, x: number) {
  return `color:${hex};font-size:${x}px;`;
}

export default class ConsoleLogger {
  static readonly instances: ConsoleLogger[] = [];
  static level: LogLevel = LogLevel.LOG;
  static Levels = LogLevels;
  static noColor = false;

  Levels = LogLevels;
  level: LogLevel = LogLevel.LOG;
  prefix = '';
  enabled = true;
  debugColor: string = colorize('#cccccc', 12);
  logColor: string = colorize('#bbbbbb', 12);
  infoColor: string = colorize('#2196f3', 12);
  warnColor: string = colorize('#ff00ff', 12);
  errorColor: string = colorize('#e91e63', 12);
  fatalColor: string = colorize('#9a0101', 13);

  /**
   * ConsoleLogger
   * @param   {string}  prefix  Logger prefix
   * @return  {ConsoleLogger}
   */
  constructor(prefix: string) {
    this.setPrefix(prefix);
    this.level = ConsoleLogger.level;
    ConsoleLogger.instances.push(this);
  }

  static setLevel(level: LogLevel) {
    this.level = level;
    this.instances.forEach(logger => logger.setLevel(level));
  }
  static enable(level?: LogLevel) {
    if (level) {
      this.level = level;
    }
    this.instances.forEach(logger => logger.enable());
  }
  static disable() {
    this.instances.forEach(logger => logger.disable());
  }

  /**
   * set logger prefix
   * @param prefix
   */
  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  /**
   * enable logger with optional log level
   * @param level
   */
  enable(level: LogLevel = this.level): void {
    this.level = level;
    this.enabled = true;
  }

  /**
   * disable logger
   */
  disable(): void {
    this.enabled = false;
  }

  /**
   * Set log level
   * @param   {LogLevel}  level
   * @return  {void}
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * trace
   * @param title
   * @param args
   */
  trace(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.VERBOSE) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.trace(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.trace(`%c[${this.prefix}] ${title}`, this.debugColor, ...args);
    }
  }

  /**
   * debug
   * @param title
   * @param args
   */
  debug(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.VERBOSE) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.debug(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.debug(`%c[${this.prefix}] ${title}`, this.debugColor, ...args);
    }
  }

  /**
   * log
   * @param title
   * @param args
   */
  log(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.LOG) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.log(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.log(`%c[${this.prefix}] ${title}`, this.logColor, ...args);
    }
  }

  /**
   * info
   * @param title
   * @param args
   */
  info(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.INFO) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.info(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.info(`%c[${this.prefix}] ${title}`, this.infoColor, ...args);
    }
  }

  /**
   * warn
   * @param title
   * @param args
   */
  warn(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.WARN) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.warn(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.warn(`%c[${this.prefix}] ${title}`, this.warnColor, ...args);
    }
  }

  /**
   * error
   * @param title
   * @param args
   */
  error(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.ERROR) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.error(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.error(`%c[${this.prefix}] ${title}`, this.errorColor, ...args);
    }
  }

  /**
   * fatal error
   * @param title
   * @param args
   */
  fatal(title: string, ...args: any[]): void {
    if (!this.enabled || this.level > LogLevel.FATAL) {
      return;
    }
    if (ConsoleLogger.noColor) {
      console.error(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.error(`%c[${this.prefix}] ${title}`, this.fatalColor, ...args);
    }
  }

  /**
   * start a group with label
   * @param label
   */
  group(...label: any[]) {
    if (console.group) {
      console.group(...label);
    }
  }

  /**
   * end a group
   */
  groupEnd() {
    if (console.groupEnd) {
      console.groupEnd();
    }
  }

  /**
   * collapse log group
   * @param label
   */
  groupCollapsed(...label: any[]) {
    if (console.groupCollapsed) {
      console.groupCollapsed(...label);
    }
  }
}