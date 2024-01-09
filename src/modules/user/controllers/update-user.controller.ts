import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateUserUseCase } from "../use-case/update-user";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from "../dto/user.dto";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

@Controller('/user')
@ApiTags('user')
export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase) {}

    
    @ApiOkResponse({ type: UserDto })
    @Patch(':id')
    @ApiParam({ name: 'id' })
    handle(@Param('id') id, @Body() upddateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute(id,upddateUserDto);
    }
}