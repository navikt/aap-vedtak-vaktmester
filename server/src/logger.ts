import winston from 'winston';

const stdoutLogger = winston.createLogger({
  level: 'info',
  format: process.env.NODE_ENV === 'development' ? winston.format.cli() : winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const LogInfo = (message: string, ...meta: any[]) => {
  stdoutLogger.info(message, ...meta);
};

export const LogWarning = (message: string, ...meta: any[]) => {
  stdoutLogger.warn(message, ...meta);
};

export const LogError = (message: string, ...meta: any[]) => {
  stdoutLogger.error(message, ...meta);
};
