import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 6 })
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    fullName: string;
}
