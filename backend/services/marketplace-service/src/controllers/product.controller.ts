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
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { GetProductsFilterDto } from "../dto/get-products-filter.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.productService.create(createProductDto, files);
  }

  @Get()
  findAll(@Query() filterDto: GetProductsFilterDto) {
    return this.productService.findAll(filterDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }
}
