import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string; // Frontend sends species (Cat, Dog, Bird, Rabbit)

  @IsOptional()
  @IsString()
  petType?: string; // Generated from species (lowercase)

  @IsString()
  breed: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ageYears?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ageMonths?: number;

  @IsString()
  gender: string;

  @IsString()
  size: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weightKg?: number;

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
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (
      value === "true" ||
      value === true ||
      value === "1" ||
      value === 1 ||
      value === "on"
    )
      return true;
    if (value === "false" || value === false || value === "0" || value === 0)
      return false;
    return undefined;
  })
  vaccinated?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (
      value === "true" ||
      value === true ||
      value === "1" ||
      value === 1 ||
      value === "on"
    )
      return true;
    if (value === "false" || value === false || value === "0" || value === 0)
      return false;
    return undefined;
  })
  spayedNeutered?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (
      value === "true" ||
      value === true ||
      value === "1" ||
      value === 1 ||
      value === "on"
    )
      return true;
    if (value === "false" || value === false || value === "0" || value === 0)
      return false;
    return undefined;
  })
  microchipped?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (
      value === "true" ||
      value === true ||
      value === "1" ||
      value === 1 ||
      value === "on"
    )
      return true;
    if (value === "false" || value === false || value === "0" || value === 0)
      return false;
    return undefined;
  })
  hasSpecialNeeds?: boolean;

  @IsOptional()
  @IsString()
  specialNeedsDescription?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  adoptionFee?: number;
}
