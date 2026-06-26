import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [NotesModule],
  providers: [],
})
export class AppModule {}
