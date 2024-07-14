import { Module } from '@nestjs/common';
import { ClientsModule, 
         Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { ORDER_HEADER_SERVICE } from '../../config/services';
import { envs } from '../../config/envs';

@Module({
  controllers: [
    OrdersController
  ],
  imports: [
    ClientsModule.register([
      { 
        name: ORDER_HEADER_SERVICE, 
        transport: Transport.TCP, //Debe ser el mismo que tenemos en el MS de Productos
        options: {
          host: envs.orders_header_ms_host,
          port: envs.orders_header_ms_port
        }
      },
    ]),
  ]
})
export class OrdersModule {}
