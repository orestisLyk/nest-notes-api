import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtPayload } from 'src/auth/jwt.strategy/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get("my")
    async getNotesByUserId(@CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.getAllByUserId(userId);
    }

    @Get(':id')
    async getNoteById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.getById(id, userId);
    }

    @Post()
    async createNote(@Body() dto: CreateNoteDto, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        console.log(`Creating note for user ID: ${userId}`);
        return this.notesService.createNote(dto, userId);
    }

    @Delete(':id')
    async deleteNote(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.deleteNote(id, userId);
    }

}
