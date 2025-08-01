// src/parcelle/dto/update-parcelle.dto.ts
import { IsString, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class UpdateParcelleDto {
  @IsString()
  @IsOptional()
  referenceFonciere?: string;

  @IsNumber()
  @IsOptional()
  surfaceTotale?: number;

  @IsNumber()
  @IsOptional()
  surfaceImposable?: number;

  @IsString()
  @IsOptional()
  statutFoncier?: string;

  @IsString()
  @IsOptional()
  statutOccupation?: string;

  @IsString()
  @IsOptional()
  zonage?: string;

  @IsString()
  @IsOptional()
  categorieFiscale?: string;

  @IsNumber()
  @IsOptional()
  prixUnitaireM2?: number;

  @IsNumber()
  @IsOptional()
  montantTotalTNB?: number;

  @IsBoolean()
  @IsOptional()
  exonereTNB?: boolean;

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
