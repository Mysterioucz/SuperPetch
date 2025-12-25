import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { GetProductsFilterDto } from "../dto/get-products-filter.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Array<any>
  ): Promise<Product> {
    // Mock image upload
    const imageUrls = files
      ? files.map(
          (file) =>
            `https://placehold.co/600x400?text=${encodeURIComponent(
              file.originalname
            )}`
        )
      : [];

    const product = this.productRepository.create({
      ...createProductDto,
      images: imageUrls,
    });

    return this.productRepository.save(product);
  }

  async findAll(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { category, petType, search, minPrice, maxPrice, sort } = filterDto;
    const query = this.productRepository.createQueryBuilder("product");

    if (category && category !== "all") {
      query.andWhere("product.category = :category", { category });
    }

    if (petType && petType !== "all") {
      query.andWhere("product.petType = :petType", { petType });
    }

    if (search) {
      query.andWhere(
        "(product.name ILIKE :search OR product.description ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    if (minPrice) {
      query.andWhere("product.price >= :minPrice", { minPrice });
    }

    if (maxPrice) {
      query.andWhere("product.price <= :maxPrice", { maxPrice });
    }

    if (sort) {
      const [field, order] = sort.split(":");
      if (field && order) {
        query.orderBy(
          `product.${field}`,
          order.toUpperCase() as "ASC" | "DESC"
        );
      }
    } else {
      query.orderBy("product.createdAt", "DESC");
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
}
