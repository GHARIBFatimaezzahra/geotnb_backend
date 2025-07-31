import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.utilisateurRepository.findOne({
      where: [{ username: registerDto.username }, { email: registerDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('Username ou email déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Créer l'utilisateur
    const user = this.utilisateurRepository.create({
      ...registerDto,
      password: hashedPassword,
      estActif: true,
      dernierAcces: new Date(),
    });

    await this.utilisateurRepository.save(user);

    return {
      message: 'Compte créé avec succès',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profil: user.profil,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Trouver l'utilisateur
    const user = await this.utilisateurRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier si le compte est actif
    if (!user.estActif) {
      throw new UnauthorizedException('Compte désactivé');
    }

    // Mettre à jour la date de dernier accès
    user.dernierAcces = new Date();
    await this.utilisateurRepository.save(user);

    // Générer le token JWT avec le champ 'profil' pour la gestion des rôles
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      profil: user.profil, // <-- important pour la gestion des rôles
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profil: user.profil,
      },
    };
  }

  async validateUserByCredentials(username: string, password: string): Promise<any> {
    const user = await this.utilisateurRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser(id: number): Promise<any> {
    return this.utilisateurRepository.findOne({ where: { id } });
  }
}