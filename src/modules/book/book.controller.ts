import { Controller, Body, Post, Get, Put, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO){
    if(!data.barCode){
      throw new Error('Bar code is required');
    }

    if(!data.title){
      throw new Error('Title is required');
    }

    if(!data.description){
      throw new Error('Description is required');
    }
    
    return await this.bookService.create(data);
  }


  @Get()
  async findAll(){
    return await this.bookService.findAll();
  }

  @Put(":id")
  async update(@Param('id') id: string, @Body() data: BookDTO){
    return await this.bookService.update(id, data);
  }
}
