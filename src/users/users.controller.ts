import { Body, Controller, ForbiddenException, Get, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import * as jwtStrategy from 'src/auth/jwt.strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users (for testing purposes)' })
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get the authenticated user' })
    async getAuthenticatedUser(@CurrentUser() user: jwtStrategy.JwtPayload) {
        return this.usersService.getUserById(user.sub);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async createUser(@Body() dto : CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
