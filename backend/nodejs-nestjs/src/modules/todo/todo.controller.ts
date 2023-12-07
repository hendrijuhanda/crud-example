import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  @Get()
  index(@Query() query: any): any {
    return `this is get: ${JSON.stringify(query)}`;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  store(@Body() body: CreateTodoDto): any {
    return `this is store: ${JSON.stringify(body)}`;
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): any {
    return `this is show id ${id}`;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto,
  ): any {
    return `this is update: id=${id},body=${JSON.stringify(body)}`;
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): any {
    return `this is delete: ${id}`;
  }
}
