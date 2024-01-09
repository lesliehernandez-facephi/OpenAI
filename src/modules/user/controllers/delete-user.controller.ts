import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserUseCase } from "../use-case/delete-user";
import { ApiTags } from "@nestjs/swagger";

@Controller('/user')
@ApiTags('user')
export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    @Delete(':id')
    handle(@Param('id') id: string) {
        return this.deleteUserUseCase.execute(id);
    }
}