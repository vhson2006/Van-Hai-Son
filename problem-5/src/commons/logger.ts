import {createLogger, format, transports} from "winston";

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console({level: 'debug'}), 
    new transports.File({ filename: 'error.log', level: 'error' })
  ],
});

export default logger