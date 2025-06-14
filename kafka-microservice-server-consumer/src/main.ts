import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: process.env.KAFKA_CLIENT_ID,
          brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID, //hero-consumer-client
        },
      },
    },
  );
  app.listen(null);
}
bootstrap();
