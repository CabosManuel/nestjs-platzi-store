import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/categories.dtos';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 2;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category ID ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: this.counterId++,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((c) => c.id === id);
    this.categories[index] = { ...category, ...payload };
    return this.categories[index];
  }

  delete(id: number) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((c) => c.id === category.id);
    this.categories.splice(index, 1);
    return { message: `Category ${id} deleted` };
  }
}
