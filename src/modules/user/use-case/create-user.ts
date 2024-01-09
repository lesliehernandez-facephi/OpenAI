import { UserRepository } from "src/modules/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { BadRequestException, ConflictException } from "@nestjs/common";

export class CreateUserUseCase {
    constructor(private readonly userRespository: UserRepository) {}

    async execute(createUserDto: CreateUserDto) {
        const isUsernameAvailable = await this.userRespository.findByUsername(createUserDto.username);

        if(isUsernameAvailable) throw new ConflictException('this already exist ')

        try {
            
            const user = await this.userRespository.create(createUserDto);
            return user;

        } catch (error) {
            throw new BadRequestException('was not possible registrar')
        }
    }

}