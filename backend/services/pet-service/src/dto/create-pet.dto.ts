import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";

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
  @Transform(({ value }) => value === "true" || value === true)
  vaccinated?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true)
  neutered?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true)
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
