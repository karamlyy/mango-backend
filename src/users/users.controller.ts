import {
    Controller,
    Get,
    Patch,
    Body,
    Param,
    UseGuards,
    Request,
    NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('me')
    async getProfile(@Request() req) {
        const user = await this.usersService.findById(req.user.sub);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }

    @Patch('me')
    async updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
        const updated = await this.usersService.update(req.user.sub, dto);
        const { password, ...result } = updated;
        return result;
    }
}
