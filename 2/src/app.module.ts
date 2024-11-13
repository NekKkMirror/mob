import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'dev',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}