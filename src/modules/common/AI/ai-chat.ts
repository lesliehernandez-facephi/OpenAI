import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { ChatGPTAPI as IChatGPTAPI, ChatMessage } from 'chatgpt';

import { AIChatGenerator } from "./interface/ai-chat-generator";
import { EnvService } from "../env";

@Injectable()
export class AIChat implements AIChatGenerator, OnModuleInit {
    private API: IChatGPTAPI;
    
    constructor( private envService: EnvService) {}

    async onModuleInit() {
        const importDynamic = Function('modulePath', 'return import(modulePath)')
        const { ChatGPTAPI } = await importDynamic('chatgpt')

        this.API = new ChatGPTAPI({
            apiKey: this.envService.get('OPENAI_API_KEY'),
        });
    }


    async ask(question: string): Promise<ChatMessage | null> {
        try {

            const resp = await this.API.sendMessage(question);
            return resp;
            
        } catch (error) {
            throw new InternalServerErrorException('Was no possible to generate the answers ')
        }

        return null
    }
}