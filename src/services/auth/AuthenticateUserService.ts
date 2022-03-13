import 'dotenv/config'
import { client } from '../../prisma/client'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

interface InterfaceUserLogin {
    email: string,
    password: string
}

interface InterfaceUserAccess {
    access: string,
    refresh: string
}

export class AuthenticateUserService {
    async execute({ email, password }: InterfaceUserLogin): Promise<{result: InterfaceUserAccess | Error, status: number }> {
        const user = await client.user.findFirst({
            where: { 
                email
            }
        })

        if (!user) {
            return { result: Error('User credentials are incorrect!'), status:400}
        }

        const passwordIsCorrect = await compare(password, user.password)

        if (!passwordIsCorrect) {
            return {result: Error('User credentials are incorrect!'), status: 400}
        }

        const access = sign({ type: 'access'}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '5m'
        })

        const refresh = sign({ type: 'refresh'}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '7d'
        })

        const result: InterfaceUserAccess = {
            access,
            refresh
        }

        return {result, status: 200}
    }
}


