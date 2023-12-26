import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async index({ page, per_page } = { page: 1, per_page: 15 }): Promise<{}> {
    const [result, total] = await this.todoRepository.findAndCount({
      take: per_page,
      skip: (page - 1) * page,
    });

    return {
      data: result,
      meta: {},
    };
  }
}
