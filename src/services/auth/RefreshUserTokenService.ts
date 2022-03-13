import 'dotenv/config'
import { verify, sign } from 'jsonwebtoken'

interface TokenInterface {
    type: string,
    sub: string
}

interface InterfaceAccessToken {
    access: string
}

export class RefreshUserTokenService {
    async execute(refresh: string): Promise<{result: InterfaceAccessToken | Error, status: number}> {

        try {
            const refreshToken = verify(refresh, process.env.JWT_SECRET)  as TokenInterface
            
            if (refreshToken.type === 'refresh') {
                const access = sign({ type: 'access'}, process.env.JWT_SECRET, {
                    subject: refreshToken.sub,
                    expiresIn: '5m'
                })

                const result: InterfaceAccessToken = {
                    access
                }

                return {result, status: 200}
            }

            return {result: Error('Refresh token is invalid!'), status: 400}
        }
        catch (err) {
            return {result: Error('Refresh token is invalid!'), status: 400}
        }
    }
}
