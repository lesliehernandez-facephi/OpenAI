import { Controller, Get } from "@nestjs/common";
import { GetManyUsersUseCase } from "../use-case/get-many-user";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";

@Controller('/user')
@ApiTags('user')
export class GetMAnyUserController {
    constructor(private getManyUserCaseUse: GetManyUsersUseCase) {}

    @ApiOkResponse({ type: UserDto, isArray: true })
    @Get('')
    handle() {
        return this.getManyUserCaseUse.execute();
    }
}