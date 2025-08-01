// src/proprietaire/proprietaire.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proprietaire } from './proprietaire.entity';
import { CreateProprietaireDto } from './dto/create-proprietaire.dto';
import { UpdateProprietaireDto } from './dto/update-proprietaire.dto';

@Injectable()
export class ProprietaireService {
  constructor(
    @InjectRepository(Proprietaire)
    private readonly proprietaireRepository: Repository<Proprietaire>,
  ) {}

  // Créer un nouveau propriétaire
  async create(createProprietaireDto: CreateProprietaireDto): Promise<Proprietaire> {
    const proprietaire = this.proprietaireRepository.create(createProprietaireDto);
    return this.proprietaireRepository.save(proprietaire);
  }

  // Trouver tous les propriétaires
  async findAll(): Promise<Proprietaire[]> {
    return this.proprietaireRepository.find();
  }

  // Trouver un propriétaire par son ID
  async findOne(id: number): Promise<Proprietaire> {
    return this.proprietaireRepository.findOne({ where: { id } });
  }

  // Mettre à jour un propriétaire
  async update(id: number, updateProprietaireDto: UpdateProprietaireDto): Promise<Proprietaire> {
    await this.proprietaireRepository.update(id, updateProprietaireDto);
    return this.proprietaireRepository.findOne({ where: { id } });
  }

  // Supprimer un propriétaire
  async remove(id: number): Promise<void> {
    await this.proprietaireRepository.delete(id);
  }
}
