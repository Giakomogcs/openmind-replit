import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto as any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`MCP Server running on http://localhost:${port}`);
}
bootstrap();
