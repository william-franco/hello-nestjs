import { Module } from '@nestjs/common';
import { GreetingServiceImpl } from './services/greeting.service';
import { GreetingControllerImpl } from './controllers/greeting.controller';

@Module({
    providers: [GreetingServiceImpl],
    controllers: [GreetingControllerImpl],
    exports: [GreetingServiceImpl],
})
export class GreetingModule { }
