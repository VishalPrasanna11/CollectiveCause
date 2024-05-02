import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { randomBytes } from 'crypto';

const { combine, timestamp, json, printf } = winston.format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const appVersion = process.env.npm_package_version;

const generateLogId = () => randomBytes(16).toString('hex');

// Define the formatHTTPLoggerResponse function
const formatHTTPLoggerResponse = (message, statusCode) => {
  return `${statusCode}: ${message}`;
};

// Logger for API endpoints
const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        logId: generateLogId(),
        timestamp,
        appInfo: {
          appVersion,
          environment: process.env.NODE_ENV,
          proccessId: process.pid,
        },
        message: formatHTTPLoggerResponse(message, data.statusCode), // Incorporate formatHTTPLoggerResponse here
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: './logs/rotating-logs-%DATE%.log',
      datePattern: 'MMMM-DD-YYYY',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
});

export { httpLogger };
