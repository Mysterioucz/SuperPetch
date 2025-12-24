import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pet } from "../entities/pet.entity";
import { CreatePetDto } from "../dto/create-pet.dto";

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>
  ) {}

  async create(createPetDto: CreatePetDto, files: Array<any>): Promise<Pet> {
    const { temperament, ...petData } = createPetDto;

    // Parse temperament if it's a JSON string
    let parsedTemperament: string[] = [];
    if (temperament) {
      try {
        parsedTemperament = JSON.parse(temperament);
      } catch (e) {
        // If it's not JSON, treat it as a single string or ignore
        parsedTemperament =
          typeof temperament === "string" ? [temperament] : [];
      }
    }

    // Mock image upload - in production this would upload to MinIO/S3
    // For now, we just generate a placeholder URL using the filename
    const imageUrls = files
      ? files.map(
          (file) =>
            `https://placehold.co/600x400?text=${encodeURIComponent(file.originalname)}`
        )
      : [];

    const pet = this.petRepository.create({
      ...petData,
      temperament: parsedTemperament,
      images: imageUrls,
      // ownerId: user.id // TODO: Extract user from request
    });

    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findOne(id: string): Promise<Pet> {
    return this.petRepository.findOneBy({ id });
  }
}
