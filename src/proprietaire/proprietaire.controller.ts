// src/proprietaire/proprietaire.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProprietaireService } from './proprietaire.service';
import { CreateProprietaireDto } from './dto/create-proprietaire.dto';
import { UpdateProprietaireDto } from './dto/update-proprietaire.dto';
import { Proprietaire } from './proprietaire.entity';

@Controller('proprietaires')
export class ProprietaireController {
  constructor(private readonly proprietaireService: ProprietaireService) {}

  // Route pour créer un propriétaire
  @Post()
  async create(@Body() createProprietaireDto: CreateProprietaireDto): Promise<Proprietaire> {
    return this.proprietaireService.create(createProprietaireDto);
  }

  // Route pour récupérer tous les propriétaires
  @Get()
  async findAll(): Promise<Proprietaire[]> {
    return this.proprietaireService.findAll();
  }

  // Route pour récupérer un propriétaire par son ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Proprietaire> {
    return this.proprietaireService.findOne(id);
  }

  // Route pour mettre à jour un propriétaire
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProprietaireDto: UpdateProprietaireDto): Promise<Proprietaire> {
    return this.proprietaireService.update(id, updateProprietaireDto);
  }

  // Route pour supprimer un propriétaire
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.proprietaireService.remove(id);
  }
}
