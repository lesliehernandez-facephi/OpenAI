import { Type } from "class-transformer";
import { AIChatGenerator, AnswerRepository, QuestionRepository, UserRepository } from "src/modules/common";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { BadRequestException, NotFoundException } from "@nestjs/common";


type Messages = {
    text:string,
    correct: boolean;
}


export class CreateQuestionUseCase {
    private NUMBER_OF_QUESTIONS_REQUESTS = 10; 
    constructor(
        private readonly answerRespository: AnswerRepository,
        private readonly questionRespository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly aiChatGenerator: AIChatGenerator,
    ) { }

    async execute( createQuestion: CreateQuestionDto) {
        const user = await this.userRepository.findById(createQuestion.authorId);


        if(!user) throw new NotFoundException('NO hay users con eso '); 

        const encodedQuestion = encodeURIComponent(createQuestion.content);
        const AIAnswers = await this.aiChatGenerator.ask(`Generatess (${this.NUMBER_OF_QUESTIONS_REQUESTS} different answer for the question "${encodedQuestion}". 
        One of these answers must be the correct answear. follow next format [{text: 'Answer', correct: true/false}], it will be an array of objects.
        Do not provide answers as a list. Remove any apace or breakline that the response can have, send it as raw as possible)`);
        const formatAnswer = AIAnswers.text.trim();

        const regex = /\[([^\]]*)\]/;
        const match = formatAnswer.match(regex);

        if(!match) throw  new BadRequestException('la respues no esta compatable ');


        try {
            const jsonArrayString = `[${match[1]}]`;
            const answers: Messages[] = JSON.parse(jsonArrayString);

            const question = await this.questionRespository.create({
                content: createQuestion.content,
                author: {
                    connect: {
                        id: user.id
                    }
                },
            });

            if(answers.length < this.NUMBER_OF_QUESTIONS_REQUESTS) throw new BadRequestException(`It was not possible to generate the amount (${this.NUMBER_OF_QUESTIONS_REQUESTS}) of answers requested`);

           for(const answerData of answers) {
            await this.answerRespository.create({
                content: answerData.text,
                correct: answerData.correct,
                question: {
                    connect: {
                        id: question.id
                    }
                },
            });
           }

           const updatedQuestion =await this.questionRespository.findById(question.id);

           return updatedQuestion;

        } catch (error) {
            throw new BadRequestException('Was not possible to register');
        }


    }

}