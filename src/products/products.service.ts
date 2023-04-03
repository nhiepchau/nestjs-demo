import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      username: 'Chau',
      activity: 'visited',
    },
    {
      id: '2',
      username: 'Nhu',
      activity: 'downloaded log',
    },
    {
      id: '3',
      username: 'Hieu',
      activity: 'read info',
    },
    {
      id: '4',
      username: 'Vy',
      activity: 'updated info',
    },
    {
      id: '5',
      username: 'Bao Nguyen',
      activity: 'do nothing',
    },
    {
      id: '6',
      username: 'Duc',
      activity: 'edited',
    },
    {
      id: '7',
      username: 'Viet',
      activity: 'write',
    },
  ];

  findProduct(id: string) {
    return this.products.findIndex((value) => value.id == id);
  }

  getProducts() {
    // Return a copy of the array
    return [...this.products];
  }

  getProduct(prodId: string) {
    // Find the product with the given id
    const index = this.findProduct(prodId);

    // If the product is not found, throw an error
    if (index == -1) {
      throw new NotFoundException('Product not found');
    }

    // Return a copy of the product
    return { ...this.products[index] };
  }

  insertProduct(prodTitle: string, prodDesc: string) {
    // Get the last productId in the array
    const lastId = this.products[this.products.length - 1].id;

    // Convert the last product's id to a number and add 1
    const nextId = (parseInt(lastId) + 1).toString();

    // Add the new product to the array
    this.products.push({
      id: nextId,
      username: prodTitle,
      activity: prodDesc,
    });

    return nextId;
  }

  deleteProduct(id: string) {
    const productIndex = this.findProduct(id);

    // If the product is not found, throw an error
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      // Remove the product from the array
      this.products.splice(productIndex, 1);
      return id;
    }
  }

  updateProduct(id: string, prodTitle: string, prodDesc: string) {
    const productIndex = this.findProduct(id);

    // If the product is not found, throw an error
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = this.products[productIndex];

    // Update the product's properties
    updatedProduct.activity = prodDesc ?? updatedProduct.activity;
    updatedProduct.username = prodTitle ?? updatedProduct.username;

    this.products[productIndex] = updatedProduct;
    return { ...this.products[productIndex] };
  }
}
