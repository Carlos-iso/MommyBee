import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): object {
    return {
      title: 'Mommybee API',
      version: '0.0.1',
      environment: process.env.NODE_ENV,
    };
  }
}
