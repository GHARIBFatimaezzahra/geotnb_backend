import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parcelle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  referenceFonciere: string;

  @Column('float')
  surfaceTotale: number;

  @Column('float')
  surfaceImposable: number;

  @Column({ length: 50 })
  statutFoncier: string;

  @Column({ length: 50 })
  statutOccupation: string;

  @Column({ length: 50 })
  zonage: string;

  @Column({ length: 50 })
  categorieFiscale: string;

  @Column('float')
  prixUnitaireM2: number;

  @Column('float')
  montantTotalTNB: number;

  @Column({ default: false })
  exonereTNB: boolean;

  @Column({ type: 'date', nullable: true })
  datePermis: Date;

  @Column({ nullable: true })
  dureeExoneration: number;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  geometry: object;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  dateCreation: Date;

  @Column({ type: 'date', nullable: true })
  dateModification: Date;

  @Column({ length: 50, nullable: true })
  etatValidation: string;
}
