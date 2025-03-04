import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dto/products.dtos';

@Injectable()
export class ProductsService {
  private counterId = 2;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'https://picsum.photos/200',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ID ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.counterId++,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products[index];
  }

  delete(id: number) {
    const product = this.findOne(id);
    const index = this.products.findIndex((p) => p.id === product.id);
    this.products.splice(index, 1);
    return { message: `Product ${id} deleted.` };
  }
}
