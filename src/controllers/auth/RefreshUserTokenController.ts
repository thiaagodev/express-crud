import {Request, Response} from 'express'
import { RefreshUserTokenService } from '../../services/auth/RefreshUserTokenService'


export class RefreshUserTokenController {
    async handle(request: Request, response: Response) {
        const { refresh } = request.body

        const service = new RefreshUserTokenService()

        const {result, status} = await service.execute(refresh)

        if (result instanceof Error) {
            return response.status(status).json({message: result.message})
        }

        return response.status(status).json(result)

    }
}
