import { Module } from "@nestjs/common";
import { CreateQuestionControllers } from "./controllers/create-question.controller";
import { GetManyQuestionsController } from "./controllers/get-many-question.controller";
import { GetQuestionByIdController } from "./controllers/get-question-by-id";
import { AIModule, DatabaseModule } from "../common";
import { CreateQuestionUseCase } from "./use-case/create-question";
import { GetQuestionByIdUseCase } from "./use-case/get-question-by-id";
import { GetManyQuestionsUseCase } from "./use-case/get-many-question";

@Module({
    controllers: [CreateQuestionControllers, GetManyQuestionsController, GetQuestionByIdController],
    imports: [DatabaseModule, AIModule],
    providers: [CreateQuestionUseCase, GetQuestionByIdUseCase, GetManyQuestionsUseCase],
    exports: []
})

export class QuestionModule { }