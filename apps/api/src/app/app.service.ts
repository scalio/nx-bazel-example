import { Injectable } from '@nestjs/common';
import { IMessage } from '@proto-interface';

@Injectable()
export class AppService {
  getData(): Required<IMessage> {
    return { message: 'Welcome to api!' };
  }
}
