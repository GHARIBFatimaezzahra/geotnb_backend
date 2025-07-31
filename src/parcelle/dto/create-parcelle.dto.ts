import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

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
  @IsOptional()
  exonereTNB?: boolean;

  @IsOptional()
  datePermis?: Date;

  @IsOptional()
  dureeExoneration?: number;

  geometry: object;

  @IsOptional()
  dateCreation?: Date;

  @IsOptional()
  dateModification?: Date;

  @IsOptional()
  etatValidation?: string;
}