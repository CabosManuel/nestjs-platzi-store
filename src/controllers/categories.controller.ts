import { Controller, Get, Param } from '@nestjs/common';

// localhost:3000/categories
@Controller('categories')
export class CategoriesController {
  // localhost:3000/categories/c01/products/p01
  @Get(':id/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ): string {
    return `Category ID: ${id} - Product ID: ${productId}`;
  }
}
