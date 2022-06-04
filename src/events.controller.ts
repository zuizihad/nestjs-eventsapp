/* eslint-disable */
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
    ) { }
    @Get()
    async findAll() {
        return await this.repository.find();
    }
    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'when'],
            where: [{
                id: MoreThan(3),
                when: MoreThan(new Date('2021-02-12T13:00:00')),
            },
            {
                description: Like('%meet%')
            }
            ],
            take: 2,
            order: {
                id: 'DESC',
            }
        })
    }
    @Get(':id')
    async findOne(@Param() id) {
        return await this.repository.findOne(id);
    }

    @Post()
    async create(@Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }
    @Patch(':id')
    async update(@Param() id, @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto) {
        const event = await this.repository.findOne(id);

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when,
        });
    }
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param() id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);
    }
}
