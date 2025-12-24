import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  gender: string;

  @IsString()
  size: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  temperament?: string; // JSON string

  @IsOptional()
  @IsString()
  healthStatus?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  vaccinated?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  neutered?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  microchipped?: boolean;

  @IsOptional()
  @IsString()
  specialNeeds?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  adoptionFee?: number;
}
