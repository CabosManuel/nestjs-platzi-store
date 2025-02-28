import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;

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

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    const newProduct = {
      id: this.counterId++,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: Partial<Product>): Product {
    const product = this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products[index];
  }

  delete(id: number): string {
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, 1);
    return `Product ${id} deleted.`;
  }
}
