import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { json, urlencoded } from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Disable all default body parsing
  });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix("api/v1");
  app.use(helmet());

  // Custom middleware to conditionally parse body based on content-type
  app.use((req: any, res: any, next: any) => {
    const contentType = req.headers["content-type"] || "";

    // Skip body parsing for multipart/form-data - keep as raw stream
    if (contentType.includes("multipart/form-data")) {
      return next();
    }

    // Parse JSON requests
    if (contentType.includes("application/json")) {
      return json({ limit: "10mb" })(req, res, next);
    }

    // Parse urlencoded requests
    if (contentType.includes("application/x-www-form-urlencoded")) {
      return urlencoded({ extended: true, limit: "10mb" })(req, res, next);
    }

    // For other content types, just continue
    next();
  });

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
    }),
  );

  app.enableCors({
    origin: configService.get("CORS_ORIGIN") || "*",
    credentials: true,
  });

  const port = configService.get("PORT") || 3000;
  await app.listen(port);

  console.log(`🌐 API Gateway running on http://localhost:${port}`);
}

bootstrap();
