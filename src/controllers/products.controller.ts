import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductFilter(): string {
    return `Product filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    return this.productService.findOne(+productId); // Agrega un + para convertir a number
  }

  // Usando Response de express
  @Get('express/:productId')
  @HttpCode(HttpStatus.ACCEPTED) // 202
  getProductExpress(
    @Res() response: Response,
    @Param('productId') productId: string,
  ) {
    // Si no se utiliza Response el request se queda esperando
    return this.productService.findOne(+productId);
  }

  @Get('')
  getProducts(): Product[] {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: Omit<Product, 'id'>): Product {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Omit<Product, 'id'>,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
