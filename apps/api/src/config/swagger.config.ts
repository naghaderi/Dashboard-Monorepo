import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export function swaggerConfigInit(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Auth")
    .setDescription("Endpoints Authentication Monorepo")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
}
