import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {

    const pageNum = Math.max(parseInt(page ?? '1', 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit ?? '10', 10), 1), 100);

    return this.usersService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    
    return this.usersService.remove(+id);
  }
}
