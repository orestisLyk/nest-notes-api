import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get("/by-user/:userId")
    async getNotesByUserId(@Param('userId') userId: string) {
        return this.notesService.getAllByUserId(userId);
    }

    @Get(':id')
    async getNoteById(@Param('id') id: string) {
        return this.notesService.getById(id);
    }

    @Post()
    async createNote(@Body() dto: CreateNoteDto) {
        return this.notesService.createNote(dto);
    }

}
