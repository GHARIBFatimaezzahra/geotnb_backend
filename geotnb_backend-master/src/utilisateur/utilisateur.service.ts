import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  findOne(id: number): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOneBy({ id });
  }

  async create(data: CreateUtilisateurDto): Promise<Utilisateur> {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const utilisateur = this.utilisateurRepository.create({
      ...data,
      password: hashedPassword,
      estActif: data.estActif ?? true,
      dernierAcces: data.dernierAcces ?? new Date(),
    });
    return this.utilisateurRepository.save(utilisateur);
  }

  // LIGNE 44 CORRIGÉE : Gestion du cas null dans la méthode update
  async update(id: number, data: UpdateUtilisateurDto): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOneBy({ id });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.utilisateurRepository.update(id, data);
    
    // Récupérer l'utilisateur mis à jour et gérer le cas null
    const updatedUtilisateur = await this.findOne(id);
    if (!updatedUtilisateur) {
      throw new NotFoundException('Erreur lors de la récupération de l\'utilisateur mis à jour');
    }
    return updatedUtilisateur;
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}