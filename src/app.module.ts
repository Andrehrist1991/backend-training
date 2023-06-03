import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(`mongodb+srv://AndriiKhrystoiev:gjj3Rilm0RBqrTSh@cluster0.s7dzb.gcp.mongodb.net/products?retryWrites=true&w=majority`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
