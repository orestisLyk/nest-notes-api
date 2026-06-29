import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtPayload } from 'src/auth/jwt.strategy/jwt.strategy';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get("my")
    @ApiOperation({ summary: 'Get all notes for the authenticated user' })
    async getNotesByUserId(@CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.getAllByUserId(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a note by ID for the authenticated user' })
    async getNoteById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.getById(id, userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new note for the authenticated user' })
    async createNote(@Body() dto: CreateNoteDto, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.createNote(dto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a note by ID for the authenticated user' })
    async deleteNote(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.deleteNote(id, userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a note by ID for the authenticated user' })
    async updateNote(@Param('id') id: string, @Body() dto: UpdateNoteDto, @CurrentUser() user: JwtPayload) {
        const userId = user.sub;
        return this.notesService.updateNote(id, dto, userId);
    }

}
