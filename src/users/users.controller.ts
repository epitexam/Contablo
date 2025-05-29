import { Controller, Get, Body, Patch, Param, Delete, Query, NotFoundException, UseGuards, Request, HttpCode, HttpStatus, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiOperation, ApiTags, ApiParam, ApiQuery, ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({
    summary: 'List users',
    description: 'Returns a paginated list of users.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Current page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of results per page (max 100)',
  })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Math.max(parseInt(page ?? '1', 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit ?? '10', 10), 1), 100);
    return this.usersService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find user by ID',
    description: 'Returns a user by their unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates the authenticated user\'s information.',
  })
  @ApiNoContentResponse({ description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { uuid } = req.user;
    const user = await this.usersService.findOneByUuid(uuid);
    if (!user) throw new NotFoundException(`User not found`);
    await this.usersService.update(+user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes the authenticated user\'s account.',
  })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async remove(@Request() req) {
    const { uuid } = req.user;
    const user = await this.usersService.findOneByUuid(uuid);
    if (!user) throw new NotFoundException(`User not found`);
    await this.usersService.remove(+user.id);
  }
}
