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

  // localhost:3000/products/filter (Las rutas no dinámicas van primero!!)
  @Get('products/filter')
  getProductFilter(): string {
    return `Product filter`;
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

  /* *********** Query Params *********** */
  // localhost:3000/products?limit=100&offset=40&brand=webos
  @Get('products')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'default',
  ): string {
    return `Products - limit: ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  // localhost:3000/products?limit=100&offset=40
  // @Get('products')
  // getProducts(@Query() params: any): string {
  //   const { limit, offset } = params;
  //   return `Product - limit: ${limit}, offset: ${offset}`;
  // }
}
