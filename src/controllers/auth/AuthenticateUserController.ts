import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../services/auth/AuthenticateUserService'


export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const service = new AuthenticateUserService()

        const {result, status} = await service.execute({email, password})

        if (result instanceof Error) {
            return response.status(status).json({message: result.message})
        }

        return response.status(status).json(result)

    }
}
