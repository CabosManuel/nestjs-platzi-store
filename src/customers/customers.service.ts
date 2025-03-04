import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private counterId = 2;
  private customers = [
    {
      id: 1,
      name: 'Customer 1',
      email: 'test@gmail.com',
      phone: '987654321',
      address: 'Address 1',
    },
  ];

  create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = {
      id: this.counterId++,
      ...createCustomerDto,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ID ${id} not found`);
    }
    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((c) => c.id === id);
    this.customers[index] = { ...customer, ...updateCustomerDto };
    return this.customers[index];
  }

  remove(id: number) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((c) => c.id === customer.id);
    this.customers.splice(index, 1);
    return { message: `Customer ${id} deleted` };
  }
}
