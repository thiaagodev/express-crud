import { Request, Response } from 'express'
import { GetAllPostsService } from '../../services/posts/GetAllPostsService'

export class GetAllPostsController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPostsService()
        
        const posts = await service.execute()

        return response.status(200).json(posts)

    }
}
