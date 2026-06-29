import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UpdateNoteDto {
    @ApiProperty({ example: 'Updated Note Title', required: false })
    @IsString()
    title?: string;
    @ApiProperty({ example: 'Updated Note Content', required: false })
    @IsString()
    content?: string;
}