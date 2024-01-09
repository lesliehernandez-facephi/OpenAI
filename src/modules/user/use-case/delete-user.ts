import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from "src/modules/common";

@Injectable()
export class DeleteUserUseCase {

    constructor(private readonly userRepo: UserRepository) {}
    async execute(id: string) {
        try {
            await this.userRepo.delete(id); 
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}