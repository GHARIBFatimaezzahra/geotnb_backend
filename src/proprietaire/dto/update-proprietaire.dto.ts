// src/proprietaire/dto/update-proprietaire.dto.ts
import { IsString, IsNumber, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateProprietaireDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  nature?: string;

  @IsString()
  @IsOptional()
  cin_ou_rc?: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsPhoneNumber()
  @IsOptional()
  telephone?: string;

  @IsNumber()
  @IsOptional()
  quotePart?: number;
}
