import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductsSchema } from './schemas/product.schema';

@Module({
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  providers: [ProductsService],
})

export class ProductsModule {

}
