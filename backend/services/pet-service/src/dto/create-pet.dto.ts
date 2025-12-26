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
  neutered?: boolean;

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
