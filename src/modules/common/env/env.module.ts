import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "./env";
import { EnvService } from "./env.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV === 'test' ? '.env.example' : '.env',
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        })
    ],
    providers: [EnvService],
    exports: [EnvService]

})

export class EnvModules {
    
}