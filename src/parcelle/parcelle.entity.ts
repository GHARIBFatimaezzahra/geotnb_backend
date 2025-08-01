// src/parcelle/parcelle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proprietaire } from '../proprietaire/proprietaire.entity';

@Entity('parcelle')
export class Parcelle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  referenceFonciere: string;

  @Column({ type: 'double precision' })
  surfaceTotale: number;

  @Column({ type: 'double precision' })
  surfaceImposable: number;

  @Column({ type: 'varchar', length: 50 })
  statutFoncier: string;

  @Column({ type: 'varchar', length: 50 })
  statutOccupation: string;

  @Column({ type: 'varchar', length: 50 })
  zonage: string;

  @Column({ type: 'varchar', length: 50 })
  categorieFiscale: string;

  @Column({ type: 'double precision' })
  prixUnitaireM2: number;

  @Column({ type: 'double precision' })
  montantTotalTNB: number;

  @Column({ type: 'boolean', default: false })
  exonereTNB: boolean;

  @Column({ type: 'date', nullable: true })
  datePermis: Date;

  @Column({ type: 'int', nullable: true })
  dureeExoneration: number;

  @ManyToOne(() => Proprietaire, (proprietaire) => proprietaire.parcelles)
  @JoinColumn({ name: 'proprietaireId' })
  proprietaire: Proprietaire;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  geometry: any;  // Remplace 'any' par le type correct selon ta version de TypeORM

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  dateCreation: Date;

  @Column({ type: 'date', nullable: true })
  dateModification: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  etatValidation: string;
}
