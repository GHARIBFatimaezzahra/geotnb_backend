import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  profil: string; // admin, technicien, agent, lecteur...

  @Column({ default: true })
  estActif: boolean;

  @Column({ type: 'date', nullable: true })
  dernierAcces: Date;
}