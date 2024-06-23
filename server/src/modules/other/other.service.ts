import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OtherService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    public async getToken() {
        const token = this.jwtService.sign({});
        const data = await this.prismaService.tokens.create({ data: { token } });

        return { token: data.token };
    }
    public async getPositions() {
        const users = await this.prismaService.users.findMany({
            select: {
                id: true,
                position: true,
            }
        })

        return {
            positions: users.map(({ id, position }) => ({
                id,
                name: position,
            })),
        }
    }
}
