import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Map frontend userType to database role
   * Frontend: 'adopter', 'breeder', 'both'
   * Database: 'user', 'business', 'admin', 'moderator'
   */
  private mapUserTypeToRole(userType: string): string {
    const mapping: Record<string, string> = {
      adopter: "user",
      breeder: "business",
      both: "business",
    };
    return mapping[userType] || "user";
  }

  /**
   * Map database role to frontend userType
   */
  private mapRoleToUserType(role: string): string {
    const mapping: Record<string, string> = {
      user: "adopter",
      business: "breeder",
      admin: "admin",
      moderator: "moderator",
    };
    return mapping[role] || "adopter";
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, userType, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      displayName: name,
      role: role || this.mapUserTypeToRole(userType || "adopter"),
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.displayName,
        userType: this.mapRoleToUserType(user.role),
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.displayName,
        userType: this.mapRoleToUserType(user.role),
      },
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException("Invalid token");
      }

      return {
        valid: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.displayName,
          userType: this.mapRoleToUserType(user.role),
        },
      };
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      userType: this.mapRoleToUserType(user.role),
    };

    return this.jwtService.sign(payload);
  }
}
