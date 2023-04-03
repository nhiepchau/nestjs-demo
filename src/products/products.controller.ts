import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  // GET /products/:id
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  // POST /products
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc);
    return { id: generatedId };
  }

  // DELETE /products/:id
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const deletedId = this.productsService.deleteProduct(id);
    return deletedId;
  }

  // PATCH /products/:id
  @Patch(':id')
  updateProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Param('id') id: string,
  ) {
    return this.productsService.updateProduct(id, prodTitle, prodDesc);
  }
}
