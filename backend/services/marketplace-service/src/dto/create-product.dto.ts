import { IsString, IsNumber, IsOptional, IsArray, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  category: string;

  @IsString()
  petType: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;
}
