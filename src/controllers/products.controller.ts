import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

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
  getProduct(@Param('productId') productId: string) {
    return { productId }; // Respuesta en formato JSON
  }

  // localhost:3000/products?limit=100&offset=40&brand=webos
  @Get('')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'default',
  ) {
    // Respuesta en formato JSON
    return {
      limit,
      offset,
      brand,
    };
  }

  // localhost:3000/products (POST)
  @Post()
  create(@Body() payload: any) {
    // Respuesta en formato JSON
    return {
      message: 'Create action',
      payload,
    };
  }

  // localhost:3000/products/p01 (PUT)
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  // localhost:3000/products/p01 (DELETE)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
