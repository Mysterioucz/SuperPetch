import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { HealthController } from "./controllers/health.controller";
import { PetController } from "./controllers/pet.controller";
import { PetService } from "./services/pet.service";
import { Pet } from "./entities/pet.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("DATABASE_HOST"),
        port: config.get("DATABASE_PORT"),
        username: config.get("DATABASE_USER"),
        password: config.get("DATABASE_PASSWORD"),
        database: config.get("DATABASE_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: config.get("NODE_ENV") === "development",
        logging: config.get("NODE_ENV") === "development",
      }),
    }),

    TypeOrmModule.forFeature([Pet]),

    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>("RABBITMQ_URL", "amqp://localhost:5672")],
            queue: "main_queue",
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [HealthController, PetController],
  providers: [PetService],
})
export class AppModule {}
