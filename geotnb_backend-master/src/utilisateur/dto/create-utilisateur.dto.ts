import { IsString, IsEmail, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateUtilisateurDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profil?: string;

  @IsOptional()
  @IsBoolean()
  estActif?: boolean;

  @IsOptional()
  dernierAcces?: Date;
}