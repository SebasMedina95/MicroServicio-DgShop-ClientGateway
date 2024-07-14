import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete, 
         Inject} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDER_HEADER_SERVICE } from '../../config/services';
import { CreateOrderDto } from '../../validators/orders/create-order.dto';
// import { UpdateOrderDto } from '../../validators/orders/update-order.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(ORDER_HEADER_SERVICE) private readonly ordersHeaderClient: ClientProxy,
  ) {}

  @Post('/create')
  async createOrderHeader(
    @Body() createOrderDto: CreateOrderDto
  ) {

    return this.ordersHeaderClient.send({ cmd: 'create_order_header' }, createOrderDto )
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )

  }

  @Get('/get-paginated')
  async getAllOrderHeader(
    @Body() pageOptionsDto: PageOptionsDto
  ) {
    
    return this.ordersHeaderClient.send({ cmd: 'get_orders_headers_paginated' }, pageOptionsDto )
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
    
  }

  @Get('/get-by-id/:id')
  async getOrderHeaderById(
    @Param('id') id: number
  ) {

    try {

      return this.ordersHeaderClient.send({ cmd: 'get_order_header_by_id' }, { 
        id 
      }).pipe(
          catchError(err => { throw new RpcException(err) })
        )

    } catch (error) {

      throw new RpcException(error);

    } 

  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }

}
