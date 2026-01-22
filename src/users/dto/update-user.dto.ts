import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe Updated', required: false })
    @IsOptional()
    @IsNotEmpty()
    fullName?: string;

    @ApiProperty({ example: '+1234567890', required: false })
    @IsOptional()
    phoneNumber?: string;
}
