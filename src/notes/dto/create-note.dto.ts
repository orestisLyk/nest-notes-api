import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateNoteDto {
    @ApiProperty({ example: 'My Note' })
    @IsString()
    @MinLength(1)
    title!: string;
    @ApiProperty({ example: 'This is the content of my note.' })
    @IsString()
    @MinLength(1)
    content!: string;
}