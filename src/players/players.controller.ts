import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { PlayersService } from './players.service';
import { Players } from './interfaces/players.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playerservice:PlayersService){}

    @Post()
    async createOrUpdatePlayer(@Body() createplayer:CreatePlayer){
        await this.playerservice.createOrUpdatePlayer(createplayer);
    }

    @Get()
    async getPlayers():Promise<Players[]>{
        return this.playerservice.findAllPlayers();
    }
}
