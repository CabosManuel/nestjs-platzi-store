import { Controller, Get, Param } from '@nestjs/common';
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

  // localhost:3000/products/p01
  @Get('/products/:productId')
  getProduct(@Param('productId') productId: string): string {
    return `Product ID: ${productId}`;
  }

  // localhost:3000/categories/c01/products/p01
  @Get('/categories/:id/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ): string {
    return `Category ID: ${id} - Product ID: ${productId}`;
  }

  // localhost:3000/tcategories/c01/tproducts/p01
  // @Get('/tcategories/:id/tproducts/:productId')
  // getCategory2(@Param() params: any): string {
  //   return `Category ID: ${params.id} - Product ID: ${params.productId}`;
  // }
}
