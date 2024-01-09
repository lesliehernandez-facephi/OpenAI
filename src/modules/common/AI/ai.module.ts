import { Module } from "@nestjs/common";
import { EnvModules } from "../env";
import { AIChatGenerator } from "./interface/ai-chat-generator";
import { AIChat } from "./ai-chat";

@Module({
    imports: [ EnvModules ],
    providers: [ 
        {
            provide: AIChatGenerator,
            useClass: AIChat
        }
     ],
    exports: [ AIChatGenerator ]
})

export class AIModule { }