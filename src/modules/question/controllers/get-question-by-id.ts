import { Param } from "@nestjs/common";
import { GetQuestionByIdUseCase } from "../use-case/get-question-by-id";

export class GetQuestionByIdController {
    constructor(private getQuestionByIdUsease: GetQuestionByIdUseCase) {}

    handle(@Param('id') id: string) {
        return this.getQuestionByIdUsease.execute(id); 
    }

}