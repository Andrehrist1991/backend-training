import {
  Body,
  Controller,
  Delete,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  async getAll(
    @Query('skip') skip: number = 1,
    @Query('take') take: number = 10,
  ): Promise<{ products: Product[]; totalCount: number }> {
    const [products, totalCount] = await Promise.all([
      this.productsService.getAll(skip, take),
      this.productsService.totalCount(),
    ]);

    return {
      products,
      totalCount,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}
