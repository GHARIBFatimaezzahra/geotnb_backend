// src/proprietaire/dto/create-proprietaire.dto.ts
import { IsString, IsNumber, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateProprietaireDto {
  @IsString()
  nom: string;

  @IsString()
  nature: string;

  @IsString()
  cin_ou_rc: string;

  @IsString()
  adresse: string;

  @IsPhoneNumber()
  telephone: string;

  @IsNumber()
  @IsOptional()
  quotePart?: number;
}
