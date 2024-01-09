import { QuestionRepository } from "src/modules/common";

export class GetManyQuestionsUseCase {
    constructor(private readonly questionRepository: QuestionRepository) {}

    async execute( ) {
        const questions = await this.questionRepository.findMany();

        return questions;
    }
}