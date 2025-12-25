import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pet } from "../entities/pet.entity";
import { CreatePetDto } from "../dto/create-pet.dto";
import { GetPetsFilterDto } from "../dto/get-pets-filter.dto";

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

  async findAll(filterDto: GetPetsFilterDto): Promise<Pet[]> {
    const { species, breed, size, age, location, search, sort } = filterDto;
    const query = this.petRepository.createQueryBuilder("pet");

    if (species && species !== "all") {
      query.andWhere("pet.species = :species", { species });
    }

    if (breed) {
      query.andWhere("pet.breed = :breed", { breed });
    }

    if (size && size !== "all") {
      query.andWhere("pet.size = :size", { size });
    }

    if (age && age !== "all") {
      if (age === "baby") {
        query.andWhere("pet.age < 1");
      } else if (age === "young") {
        query.andWhere("pet.age >= 1 AND pet.age < 3");
      } else if (age === "adult") {
        query.andWhere("pet.age >= 3 AND pet.age < 8");
      } else if (age === "senior") {
        query.andWhere("pet.age >= 8");
      }
    }

    if (location) {
      query.andWhere(
        "(pet.city ILIKE :location OR pet.state ILIKE :location)",
        { location: `%${location}%` }
      );
    }

    if (search) {
      query.andWhere(
        "(pet.name ILIKE :search OR pet.description ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    if (sort) {
      const [field, order] = sort.split(":");
      if (field && order) {
        query.orderBy(`pet.${field}`, order.toUpperCase() as "ASC" | "DESC");
      }
    } else {
      query.orderBy("pet.createdAt", "DESC");
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Pet> {
    return this.petRepository.findOneBy({ id });
  }
}
