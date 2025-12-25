import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix("api/v1");

  // Security middleware
  app.use(helmet());
  app.use(cookieParser());

  // CORS configuration
  app.enableCors({
    origin: configService.get("CORS_ORIGIN") || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Pet Platform - Marketplace Service")
    .setDescription("Marketplace and E-commerce API")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("marketplace", "Marketplace endpoints")
    .addTag("products", "Product management endpoints")
    .addTag("orders", "Order management endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // Get port from environment
  const port = configService.get("PORT") || 3006;

  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🐾 Pet Platform - Marketplace Service              ║
  ║                                                       ║
  ║   Server:  http://localhost:${port}                     ║
  ║   API:     http://localhost:${port}/api/v1              ║
  ║   Docs:    http://localhost:${port}/api/docs            ║
  ║   Health:  http://localhost:${port}/api/v1/health       ║
  ║                                                       ║
  ║   Environment: ${configService.get("NODE_ENV")}                       ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();
