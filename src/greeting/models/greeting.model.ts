import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GreetingModel {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String })
    country: string;
    @ApiProperty({ type: String })
    message: string;
}
