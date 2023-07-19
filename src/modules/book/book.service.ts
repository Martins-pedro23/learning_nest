import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prismaService.book.findFirst({
      where: {
        barCode: data.barCode,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prismaService.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return await this.prismaService.book.findMany();
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book not found');
    }

    const updatedBook = await this.prismaService.book.update({
      data,
      where: {
        id,
      },
    });
  }
}
