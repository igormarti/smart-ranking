import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { PlayersService } from './players.service';
import { Players } from './interfaces/players.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playerservice:PlayersService){}

    @Post()
    async createOrUpdatePlayer(@Body() createplayer:CreatePlayer){
       return await this.playerservice.createOrUpdatePlayer(createplayer);
    }

    @Get()
    async getPlayers(@Query('email') email:string):Promise<Players[]|Players>
    {
        return await !email?this.playerservice.findAllPlayers():this.playerservice.findPlayerByEmail(email);
    }

    @Delete()
    async deletePlayer(@Query('email') email:string):Promise<void>{
        this.playerservice.deletePlayer(email);
    }
}
