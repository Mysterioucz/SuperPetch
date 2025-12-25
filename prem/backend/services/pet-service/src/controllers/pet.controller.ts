import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { PetService } from "../services/pet.service";
import { CreatePetDto } from "../dto/create-pet.dto";
import { GetPetsFilterDto } from "../dto/get-pets-filter.dto";

@Controller("pets")
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.petService.create(createPetDto, files);
  }

  @Get()
  findAll(@Query() filterDto: GetPetsFilterDto) {
    return this.petService.findAll(filterDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.petService.findOne(id);
  }
}
