import { Controller, Get, Param, Query } from '@nestjs/common';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  // localhost:3000/products/filter (Las rutas no dinámicas van primero!!)
  @Get('filter')
  getProductFilter(): string {
    return `Product filter`;
  }

  // localhost:3000/products/p01
  @Get(':productId')
  getProduct(@Param('productId') productId: string): string {
    return `Product ID: ${productId}`;
  }

  // localhost:3000/products?limit=100&offset=40&brand=webos
  @Get('')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'default',
  ): string {
    return `Products - limit: ${limit}, offset: ${offset}, brand: ${brand}`;
  }
}
