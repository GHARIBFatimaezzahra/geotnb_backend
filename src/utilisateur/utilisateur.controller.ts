import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(+id);
  }

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateUtilisateurDto) {
    return this.utilisateurService.create(dto);
  }

  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUtilisateurDto) {
    return this.utilisateurService.update(+id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}