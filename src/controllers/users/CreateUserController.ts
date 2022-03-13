import { Request, Response } from "express"
import { CreateUserService } from "../../services/users/CreateUserService"


class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body

        const service = new CreateUserService()

        const {result, status} = await service.execute({name, email, password})

        if (result instanceof Error) {
            return response.status(status).json({'msg': result.message})
        }

        return response.status(status).json(result)
    }
}

export { CreateUserController } 
