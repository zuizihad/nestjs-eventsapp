/* eslint-disable */
import { IsDateString, IsString, Length } from "class-validator";

/* eslint-disable */
export class CreateEventDto {
    @IsString()
    @Length(5, 255, { groups: ['create'], message: 'The name length must be between 5 and 255' })
    @Length(10, 20, { groups: ['update'], message: 'The name length must be between 10 and 20' })
    name: string;
    @Length(5, 255, { message: 'The description length must be between 5 and 255' })
    description: string;
    @IsDateString()
    when: string;
    @Length(5, 255, { message: 'The address length must be between 5 and 255' })
    address: string;
}