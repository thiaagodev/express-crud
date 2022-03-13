import { client } from '../../prisma/client'

interface InterfaceCreatePost {
    text: string,
    authorId: string
}


export class CreatePostService {
    async execute(data: InterfaceCreatePost): Promise<{result: InterfaceCreatePost, status: number}> {
        const post = await client.post.create({
            data: data
        })

        return {result: post, status: 201}
    }
}
