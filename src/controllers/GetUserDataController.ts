import { Request, Response } from 'express'
import { GetUserDataService } from '../services/GetUserDataService'


export class GetUserDataController {
    async handle(request: Request, response: Response) {
        const id = request['user'].id

        const service = new GetUserDataService()

        const {result, status} = await service.execute(id)

        if (result instanceof Error) {
            return response.status(status).json({message: result.message})
        }

        return response.status(status).json(result)

    }
}
