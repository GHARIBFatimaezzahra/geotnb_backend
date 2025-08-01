// src/proprietaire/proprietaire.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parcelle } from '../parcelle/parcelle.entity';

@Entity('proprietaire')
export class Proprietaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nom: string;

  @Column({ type: 'varchar', length: 50 })
  nature: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  cin_ou_rc: string; // CIN ou RC (registre des commerçants) pour identifier le propriétaire

  @Column({ type: 'text' })
  adresse: string;

  @Column({ type: 'varchar', length: 30 })
  telephone: string;

  @Column({ type: 'double precision', default: 0 })
  quotePart: number;

  // Relation avec Parcelle (un propriétaire peut avoir plusieurs parcelles)
  @OneToMany(() => Parcelle, (parcelle) => parcelle.proprietaire)
  parcelles: Parcelle[];
}
