import { Body, Controller,
         Delete,
         Get,
         Inject,
         Param,
         Patch,
         Post } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../config/services';
import { ClientProxy } from '@nestjs/microservices';

import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';

@Controller('categories')
export class CategoriesController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post('/create')
  async createCategory(
    @Body() body: any
  ){
    return "Creando Categoría";
  }

  @Get('/get-paginated')
  async getAllCategories(
    @Body() pageOptionsDto: PageOptionsDto
  ){
    //Lo que tenemos dentro del send, el primer argumento es el nombre que le dimos en el @MessagePattern
    //que en este caso fue { cmd: 'get_categories_paginated' }, y el segundo es el Payload, es decir, el cuerpo
    //de la petición para enviar los parámetros
    return this.productsClient.send({ cmd: 'get_categories_paginated' }, pageOptionsDto )
  }

  @Get('/get-by-id/:id')
  async getCategoryById(
    @Param('id') id: number
  ){
    return "Obtener categoría por ID " + id;
  }

  @Patch('/update/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: any
  ){
    return "Actualizar Categoría " + id;
  }

  @Delete('/delete/:id')
  async deleteCategory(
    @Param('id') id: number
  ){
    return "Eliminar Categoría " + id;
  }

}