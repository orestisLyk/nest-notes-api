import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotesController } from './notes/notes.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [PrismaModule, NotesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
