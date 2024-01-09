import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetManyQuestionsUseCase } from "../use-case/get-many-question";
import { QuestionDto } from "../dto/question.dto";
import { Controller, Get } from "@nestjs/common";


@Controller('/question')
@ApiTags('question')
export class GetManyQuestionsController {
    constructor(private getManyQuestionUseCase: GetManyQuestionsUseCase) {}

    @ApiOkResponse({ type: QuestionDto, isArray: true })
    @Get('')
    handle() {
        this.getManyQuestionUseCase.execute();
    }
}