import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PRODUCT_SERVICE } from '../../config/services';
import { envs } from '../../config/envs';

import { ProductsController } from './products.controller';
import { CategoriesController } from './categories.controller';
import { ProvidersController } from './providers.controller';

@Module({
  controllers: [
    ProductsController,
    CategoriesController,
    ProvidersController
  ],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, 
        transport: Transport.TCP, //Debe ser el mismo que tenemos en el MS de Productos
        options: {
          host: envs.products_ms_host,
          port: envs.products_ms_port
        }
      },
    ]),
  ]
})
export class ProductsModule {}
