import { Body, Controller, HttpCode, HttpException, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { CreateQuestionUseCase } from "../use-case/create-question";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { QuestionDto } from "../dto/question.dto";

@Controller('/question')
@ApiTags('question')
export class CreateQuestionControllers {
    constructor(private createQuestionUseCase: CreateQuestionUseCase) { }

    @ApiOkResponse({ type: QuestionDto })
    @HttpCode(HttpStatus.CREATED)
    @Post('')
    handle(@Body() createQuestionDto: CreateQuestionDto) {
        try {
            const question = this.createQuestionUseCase.execute(createQuestionDto); 
            return question;

        } catch (error) {
            if( error instanceof NotFoundException) {
                throw new HttpException('no hay autor', HttpStatus.CONFLICT);
            } 
            throw new HttpException('Was not possible to register', HttpStatus.BAD_REQUEST);
        }
    }


}