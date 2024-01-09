import { Injectable, NotFoundException } from "@nestjs/common";
import { QuestionRepository } from "src/modules/common";

@Injectable()
export class GetQuestionByIdUseCase {
    constructor(private readonly questionRepository: QuestionRepository) { }
    async execute(id: string) {
        const question = await this.questionRepository.findById(id);
        if(!question) throw new NotFoundException();

        return question; 
    }
}