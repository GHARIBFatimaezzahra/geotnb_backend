// src/parcelle/dto/create-parcelle.dto.ts
import { IsString, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class CreateParcelleDto {
  @IsString()
  referenceFonciere: string;

  @IsNumber()
  surfaceTotale: number;

  @IsNumber()
  surfaceImposable: number;

  @IsString()
  statutFoncier: string;

  @IsString()
  statutOccupation: string;

  @IsString()
  zonage: string;

  @IsString()
  categorieFiscale: string;

  @IsNumber()
  prixUnitaireM2: number;

  @IsNumber()
  montantTotalTNB: number;

  @IsBoolean()
  exonereTNB: boolean;

  @IsDate()
  @IsOptional()
  datePermis?: Date;

  @IsNumber()
  @IsOptional()
  dureeExoneration?: number;

  @IsString()
  @IsOptional()
  etatValidation?: string;
}
