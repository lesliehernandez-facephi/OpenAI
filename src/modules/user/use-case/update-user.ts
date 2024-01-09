import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/modules/common";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userReposi: UserRepository) {}

    async execute(id: string, updateUserDto: UpdateUserDto){
        const user = await this.userReposi.findById(id);
        if(!user) throw new NotFoundException();

        try {
            const updateData = {
                ...user,
                ...updateUserDto
            };

            const userUpdated = await this.userReposi.update(id, updateData);
            return userUpdated;
            
        } catch (error) {
            throw new BadRequestException('No te puedees registrar man!! ')
        }
    }
}