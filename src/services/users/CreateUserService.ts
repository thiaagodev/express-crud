import { client } from "../../prisma/client"
import { hash } from "bcryptjs"

interface InterfaceUserRequest {
    name: string
    email: string
    password: string
}

interface InterfaceUser {
    id: string
    name: string
    email: string
}


export class CreateUserService {
    async execute({name, email, password}: InterfaceUserRequest): Promise<{result: InterfaceUser | Error, status: number}> {

        const userExists = await client.user.findFirst({
            where: {
                email
            }
        })

        if (userExists) {
            return {result: new Error("User already exists!"), status: 400}
        }

        const passwordHash = await hash(password, 8)

        const user = await client.user.create({
            data: {
                name, 
                email, 
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return {result: user, status: 201}
    }
}