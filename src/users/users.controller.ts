import { Controller, Get, Body, Patch, Param, Delete, Query, NotFoundException, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiOperation, ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Lister les utilisateurs', description: 'Retourne une liste paginée des utilisateurs.' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page courante' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Nombre de résultats par page (max 100)' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Math.max(parseInt(page ?? '1', 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit ?? '10', 10), 1), 100);
    return this.usersService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un utilisateur', description: 'Retourne un utilisateur par son identifiant.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l’utilisateur' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mettre à jour un utilisateur', description: 'Modifie ses informations.' })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { uuid } = req.user
    const user = await this.usersService.findOneByUuid(uuid)
    if (!user) { throw new NotFoundException() }
    return this.usersService.update(+user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Supprimer un utilisateur', description: 'Supprime son compte utilisateur.' })
  async remove(@Request() req) {
    const { uuid } = req
    const user = await this.usersService.findOneByUuid(uuid)
    if (!user) { throw new NotFoundException() }
    return this.usersService.remove(+user.id)
  }
}
