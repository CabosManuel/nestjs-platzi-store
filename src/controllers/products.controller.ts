import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/entities/product.entity';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dto/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductFilter(): string {
    return `Product filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  // Usando Response de express
  @Get('express/:productId')
  @HttpCode(HttpStatus.ACCEPTED) // 202
  getProductExpress(
    @Res() response: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    // Si no se utiliza Response el request se queda esperando
    return this.productService.findOne(productId);
  }

  @Get('')
  getProducts(): Product[] {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto): Product {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
