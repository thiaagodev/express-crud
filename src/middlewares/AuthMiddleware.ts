import 'dotenv/config'
import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'
import { client } from '../prisma/client'

interface InterfaceAccessToken {
    type: string,
    sub: string
}

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    try {

        const [ _, token ]  = request.headers.authorization.split(' ')

        const accessToken = verify(token, process.env.JWT_SECRET) as InterfaceAccessToken

        if (accessToken.type !== 'access') {
            throw new Error()
        }

        const user = await client.user.findFirst({ 
            where: {
                id: accessToken.sub
            }
        })

        if (!user) {
            throw new Error()
        }

        request['user'] = user

        next()

    } catch(err){
        return response.status(401).json({message: 'Access denied!'})
    }

}
