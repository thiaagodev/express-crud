import { client } from "../../prisma/client"

interface InterfacePosts {
    id: string,
    text: string,
    authorId: string
}

export class GetAllPostsService {
    async execute(): Promise<InterfacePosts[]> {
        const posts = await client.post.findMany()

        return posts

    }
}
