import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcelle } from './parcelle.entity';
import { CreateParcelleDto } from './dto/create-parcelle.dto';
import { UpdateParcelleDto } from './dto/update-parcelle.dto';

@Injectable()
export class ParcelleService {
  constructor(
    @InjectRepository(Parcelle)
    private readonly parcelleRepository: Repository<Parcelle>,
  ) {}

  // Créer une nouvelle parcelle
  async create(createParcelleDto: CreateParcelleDto): Promise<Parcelle> {
    const parcelle = this.parcelleRepository.create(createParcelleDto);
    return this.parcelleRepository.save(parcelle);
  }

  // Trouver toutes les parcelles
  async findAll(): Promise<Parcelle[]> {
    return this.parcelleRepository.find({
      relations: ['proprietaire'], // Charger la relation si nécessaire
    });
  }

  // Trouver une parcelle par son ID
  async findOne(id: number): Promise<Parcelle> {
    return this.parcelleRepository.findOne({ where: { id } });
  }

  // Mettre à jour une parcelle
  async update(id: number, updateParcelleDto: UpdateParcelleDto): Promise<Parcelle> {
    await this.parcelleRepository.update(id, updateParcelleDto);
    return this.parcelleRepository.findOne({ where: { id } });
  }

  // Supprimer une parcelle
  async remove(id: number): Promise<void> {
    await this.parcelleRepository.delete(id);
  }
}
