import { Request, Response } from "express"
import { CreatePostService } from "../../services/posts/CreatePostService"

export class CreatePostController {
    async handle(request: Request, response: Response) {
        const { text } = request.body
        const authorId = request['user'].id

        const service = new CreatePostService()

        const { result, status } = await service.execute({text, authorId})

        if (result instanceof Error) {
            return response.status(status).json({message: result.message})
        }

        return response.status(status).json(result)

    }
}
