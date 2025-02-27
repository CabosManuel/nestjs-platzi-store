import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Enpoint vacío por defecto localhost:3000/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Endpoint localhost:3000/new
  @Get('new')
  newEndpoint(): string {
    return 'New endpoint in NestJS!';
  }

  // Endpoint localhost:3000/home
  @Get('/home/')
  homePage(): string {
    return 'Home page';
  }
}
