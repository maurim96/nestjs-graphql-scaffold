import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new WinstonCloudWatch({
          logGroupName: `Scaffold-${process.env.NODE_ENV}`,
          logStreamName: `Scaffold-${process.env.NODE_ENV}-logs`,
          awsRegion: process.env.AWS_DEFAULT_REGION,
          awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
          awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}
