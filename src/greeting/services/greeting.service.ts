import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GreetingModel } from '../models/greeting.model';

@Injectable()
export class GreetingServiceImpl {
    private greetings: Array<GreetingModel> = [
        {
            "id": 1,
            "country": "Brazil",
            "message": "Olá mundo."
        },
        {
            "id": 2,
            "country": "USA",
            "message": "Hello world."
        },
        {
            "id": 3,
            "country": "France",
            "message": "Bonjour le monde."
        },
        {
            "id": 4,
            "country": "Germany",
            "message": "Hallo Welt."
        },
        {
            "id": 5,
            "country": "Japan",
            "message": "こんにちは、世界。"
        },
        {
            "id": 6,
            "country": "China",
            "message": "你好，世界。"
        },
        {
            "id": 7,
            "country": "Russia",
            "message": "Привет, мир."
        },
        {
            "id": 8,
            "country": "Spain",
            "message": "Hola mundo."
        },
        {
            "id": 9,
            "country": "Italy",
            "message": "Ciao mondo."
        },
        {
            "id": 10,
            "country": "Portugal",
            "message": "Olá mundo."
        },
        {
            "id": 11,
            "country": "South Korea",
            "message": "안녕하세요, 세계."
        },
        {
            "id": 12,
            "country": "India",
            "message": "नमस्ते दुनिया।"
        },
        {
            "id": 13,
            "country": "Arabic",
            "message": "مرحباً بالعالم."
        },
        {
            "id": 14,
            "country": "Turkey",
            "message": "Merhaba dünya."
        },
        {
            "id": 15,
            "country": "Greece",
            "message": "Γειά σας κόσμος."
        },
        {
            "id": 16,
            "country": "Netherlands",
            "message": "Hallo wereld."
        },
        {
            "id": 17,
            "country": "Sweden",
            "message": "Hej världen."
        },
        {
            "id": 18,
            "country": "Finland",
            "message": "Hei maailma."
        },
        {
            "id": 19,
            "country": "Norway",
            "message": "Hei verden."
        },
        {
            "id": 20,
            "country": "Denmark",
            "message": "Hej verden."
        },
        {
            "id": 21,
            "country": "Poland",
            "message": "Witaj świecie."
        },
    ];
    private readonly logger = new Logger(GreetingServiceImpl.name);

    public findAll(): Array<GreetingModel> {
        this.logger.log('Returning all greetings');

        return this.greetings;
    }

    public findOne(id: number): GreetingModel {
        this.logger.log(`Returning greeting with id: ${id}`);

        const greeting: GreetingModel = this.greetings.find((item) => item.id === id);

        if (!greeting) {
            throw new NotFoundException('Greeting not found.');
        }

        return greeting;
    }

    public create(todo: GreetingModel): GreetingModel {
        this.logger.log(`Creating greeting with message: ${todo.message}`);

        // if the message is already in use by another greeting
        const messageExists: boolean = this.greetings.some((item) => item.message === todo.message);

        if (messageExists) {
            throw new UnprocessableEntityException('Greeting message already exists.');
        }

        // find the next id for a new blog greeting
        const maxId: number = Math.max(...this.greetings.map((item) => item.id), 0);
        const id: number = maxId + 1;

        const blogGreeting: GreetingModel = {
            ...todo,
            id,
        };

        this.greetings.push(blogGreeting);

        return blogGreeting;
    }

    public delete(id: number): void {
        this.logger.log(`Deleting greeting with id: ${id}`);

        const index: number = this.greetings.findIndex((item) => item.id === id);

        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Greeting not found.');
        }

        this.greetings.splice(index, 1);
    }

    public update(id: number, greeting: GreetingModel): GreetingModel {
        this.logger.log(`Updating greeting with id: ${id}`);

        const index: number = this.greetings.findIndex((item) => item.id === id);

        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Greeting not found.');
        }

        // if the message is already in use by another post
        const messageExists: boolean = this.greetings.some((item) => item.message === greeting.message && item.id !== id);

        if (messageExists) {
            throw new UnprocessableEntityException('Greeting message already exists.');
        }

        const blogGreeting: GreetingModel = {
            ...greeting,
            id,
        };

        this.greetings[index] = blogGreeting;

        return blogGreeting;
    }
}
