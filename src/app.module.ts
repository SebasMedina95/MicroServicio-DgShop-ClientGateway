import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ProductsModule, 
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
