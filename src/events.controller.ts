/* eslint-disable */
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    private events: Event[] = [];
    @Get()
    findAll() {
        return this.events;
    }
    @Get(':id')
    findOne(@Param() id) {
        const event = this.events.find(event => event.id === parseInt(id));

    }
    @Post()
    create(@Body() input: CreateEventDto) {
        const event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1,
        };
        this.events.push(event);
        return event;
    }
    @Patch(':id')
    update(@Param() id, @Body() input: UpdateEventDto) {
        const index = this.events.findIndex(event => event.id === parseInt(id));
        this.events[index] = {
            ...this.events[index],
            ...input,
            when: input.when ? new Date(input.when) : this.events[index].when,
        }
        return this.events[index];
    }
    @Delete(':id')
    @HttpCode(204)
    delete(@Param() id) {
        this.events = this.events.filter(event => event.id !== parseInt(id));
    }
}
