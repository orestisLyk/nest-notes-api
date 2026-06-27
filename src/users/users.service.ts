import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserReadonlyDto } from './dto/user-readonly.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers(): Promise<UserReadonlyDto[]> {
        const users = await this.prisma.user.findMany({
            include: { notes: true }
        });
        return users.map(user => {
            const returnedDto: UserReadonlyDto = {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            return returnedDto;
        });
    }

    async getUserById(id: string): Promise<UserReadonlyDto> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { notes: true }
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const returnedDto: UserReadonlyDto = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return returnedDto;
    }

    async getUserByEmail(email: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        return user;
    }

    async createUser(dto : CreateUserDto): Promise<UserReadonlyDto> {
        try {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword
            }
            });
            const returnedDto: UserReadonlyDto = {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt

            }
            return returnedDto;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Email already exists');
                }
            }
            throw error;
        }
    }
}
