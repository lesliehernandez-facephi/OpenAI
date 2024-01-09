import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "./repository/user.repository";

import { AnswerRepository } from "./repository/answer.repository";
import { QuestionRepository } from "./repository/question.repository";
import { PrismaUserRepository } from "./prisma/repository/prisma-user.repository";
import { PrismaQuestionRepository } from "./prisma/repository/prisma-question.repository";
import { PrismaAnswerRepository } from "./prisma/repository/prisma-answer.repository";


@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: QuestionRepository,
            useClass: PrismaQuestionRepository
        },
        {
            provide: AnswerRepository,
            useClass: PrismaAnswerRepository
        }
    ],

    exports: [PrismaService, UserRepository, QuestionRepository, AnswerRepository]
})

export class DatabaseModule { }