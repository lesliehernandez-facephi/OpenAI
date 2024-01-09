import { NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/modules/common";

export class GetUserByIdUseCase {
    constructor(private readonly userReposi: UserRepository) {}

    async execute(id: string) {
        const user =await this.userReposi.findById(id);

        if(!user) throw new NotFoundException();

        return user;
    }
}