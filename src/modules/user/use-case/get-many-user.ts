import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/common";

@Injectable()
export class GetManyUsersUseCase { 
    constructor(private readonly userRepos: UserRepository) {}

    async execute() {
        const users = await this.userRepos.findMany();
        return users; 
    }
}