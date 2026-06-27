import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteReadonlyDto } from './dto/note-readonly.dto';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) {}

    async getAllByUserId(userId: string) : Promise<NoteReadonlyDto[]> {
        const notes = await this.prisma.note.findMany({
            where: { userId }
        });
        return notes.map(note => ({
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            userId: note.userId
        }));
    }

    async getById(id: string) : Promise<NoteReadonlyDto> {
        const note = await this.prisma.note.findUnique({
            where: { id }
        });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            userId: note.userId
        };
    }

    async createNote(dto: CreateNoteDto) : Promise<NoteReadonlyDto> {
        const newNote = await this.prisma.note.create({
            data: {
                title: dto.title,
                content: dto.content,
                userId: dto.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        return {
            id: newNote.id,
            title: newNote.title,
            content: newNote.content,
            createdAt: newNote.createdAt,
            updatedAt: newNote.updatedAt,
            userId: newNote.userId
        };

    }
}
