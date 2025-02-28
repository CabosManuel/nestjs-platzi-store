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
} from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  @Get('filter')
  getProductFilter(): string {
    return `Product filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    return {
      message: `Product ${productId}`,
    };
  }

  // Usando Response de express
  @Get('express/:productId')
  @HttpCode(HttpStatus.ACCEPTED) // 202
  getProductExpress(
    @Res() response: Response,
    @Param('productId') productId: string,
  ) {
    response.status(HttpStatus.OK).send({
      message: `Product ${productId} (Response Express)`,
    });
  }

  @Get('')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'default',
  ) {
    return {
      limit,
      offset,
      brand,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create action',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
