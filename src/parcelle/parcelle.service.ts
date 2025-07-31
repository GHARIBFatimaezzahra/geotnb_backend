import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcelle } from './parcelle.entity';
import { CreateParcelleDto } from './dto/create-parcelle.dto';
import { UpdateParcelleDto } from './dto/update-parcelle.dto';

@Injectable()
export class ParcelleService {
  constructor(
    @InjectRepository(Parcelle)
    private parcelleRepository: Repository<Parcelle>,
  ) {}

  findAll(): Promise<Parcelle[]> {
    return this.parcelleRepository.find();
  }

  findOne(id: number): Promise<Parcelle | null> {
    return this.parcelleRepository.findOneBy({ id });
  }

  create(data: CreateParcelleDto): Promise<Parcelle> {
    const parcelle = this.parcelleRepository.create(data);
    return this.parcelleRepository.save(parcelle);
  }

  async update(id: number, data: UpdateParcelleDto): Promise<Parcelle> {
    const parcelle = await this.parcelleRepository.findOneBy({ id });
    if (!parcelle) throw new NotFoundException('Parcelle non trouvée');
    await this.parcelleRepository.update(id, data);
    return this.findOne(id) as Promise<Parcelle>;
  }

  async remove(id: number): Promise<void> {
    await this.parcelleRepository.delete(id);
  }
}