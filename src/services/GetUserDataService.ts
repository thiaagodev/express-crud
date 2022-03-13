import { client } from '../prisma/client'

interface InterfaceUserData {
    id: string,
    name: string,
    email: string
}

export class GetUserDataService {
    async execute(id: string): Promise<{result: InterfaceUserData | Error, status: number}> {
        const user = await client.user.findFirst({
            where: {
                id
            },
            select: {
                id: true, 
                name: true,
                email: true
            }
        })

        if (!user) {
            return {result: Error('User not found'), status:404}
        }

        return {result: user, status: 200}

    }
}
