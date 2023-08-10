import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GreetingServiceImpl } from '../services/greeting.service';
import { GreetingModel } from '../models/greeting.model';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('api/greetings')
@ApiTags('greetings')
@UseFilters(HttpExceptionFilter)
export class GreetingControllerImpl {
    constructor(private readonly greetingService: GreetingServiceImpl) { }

    @Get()
    @ApiOkResponse({ description: 'Greetings retrieved successfully.' })
    public findAll(): Array<GreetingModel> {
        return this.greetingService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Greeting retrieved successfully.' })
    @ApiNotFoundResponse({ description: 'Greeting not found.' })
    public findOne(@Param('id', ParseIntPipe) id: number): GreetingModel {
        return this.greetingService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ description: 'Greeting created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Greeting message already exists.' })
    public create(@Body() post: GreetingModel): GreetingModel {
        return this.greetingService.create(post);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Greeting deleted successfully.' })
    @ApiNotFoundResponse({ description: 'Greeting not found.' })
    public delete(@Param('id', ParseIntPipe) id: number): void {
        this.greetingService.delete(id);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Greeting updated successfully.' })
    @ApiNotFoundResponse({ description: 'Greeting not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Greeting message already exists.' })
    public update(
        @Param('id', ParseIntPipe) id: number,
        @Body() post: GreetingModel,
    ): GreetingModel {
        return this.greetingService.update(id, post);
    }
}
