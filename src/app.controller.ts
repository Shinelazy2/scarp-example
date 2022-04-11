import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tiket')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/go')
  // getHello(): any {
  //   return this.appService.interParkTiket();
  // }

  @Get('/check')
  check(): any {
    return this.appService.archCheck();
  }
}
