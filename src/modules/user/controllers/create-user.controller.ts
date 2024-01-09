import { Body, ConflictException, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../use-case/create-user";
import { CreateUserDto } from "../dto/create-user.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";

@Controller('/user')
@ApiTags('user')
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    @ApiOkResponse({ type: UserDto })
    @HttpCode(HttpStatus.CREATED)
    @Post('')
    handle(@Body() createUserDto: CreateUserDto) {
        try {
            const user = this.createUserUseCase.execute(createUserDto);
            return user;
        } catch (error) {
            if(error instanceof ConflictException) {
                throw new HttpException('This username is already in use', HttpStatus.CONFLICT);
            }

            throw new HttpException('Was not possible to register', HttpStatus.BAD_REQUEST);
            
        }
    }
}