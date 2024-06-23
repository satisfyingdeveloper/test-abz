import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/prisma.service";
import * as jwt from 'jsonwebtoken';

export class TokenGuard implements CanActivate {

    constructor(
        @Inject(PrismaService) private readonly prismaService: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['token'];

        if (!token) {
            return false;
        }
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;

        if (!decodedToken) {
            return false;
        }

        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('The token expired.');
        }
        const tokenExists = await this.prismaService.tokens.findUnique({
            where: {
                token,
            },
        });

        if (!tokenExists || tokenExists.used) {
            return false;
        }

        await this.prismaService.tokens.update({
            where: {
                token,
            },
            data: {
                used: true,
            },
        })

        return true;

    }
}