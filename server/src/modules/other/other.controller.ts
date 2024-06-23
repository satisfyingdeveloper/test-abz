import { Controller, Get } from '@nestjs/common';
import { OtherService } from './other.service';

@Controller()
export class OtherController {
    
    constructor(
        private readonly otherService: OtherService
    ) {}
    
    @Get('token')
    async getToken() {
        return this.otherService.getToken();
    }

    @Get('positions')
    async getPositions() {
        return this.otherService.getPositions();
    }
}
