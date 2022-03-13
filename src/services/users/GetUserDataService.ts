import { client } from '../../prisma/client'


interface InterfacePosts {
    id: string,
    text: string,
    authorId: string
}
interface InterfaceUserData {
    id: string,
    name: string,
    email: string,
    post?: InterfacePosts[]
}

export class GetUserDataService {
    async execute(id: string, posts: boolean): Promise<{result: InterfaceUserData | Error, status: number}> {
        const user = await client.user.findFirst({
            where: {
                id
            },
            select: {
                id: true, 
                name: true,
                email: true,
                post: posts ? true: false
            }
        })

        if (!user) {
            return {result: Error('User not found'), status:404}
        }

        return {result: user, status: 200}

    }
}
