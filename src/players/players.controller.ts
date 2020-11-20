import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { PlayersService } from './players.service';
import { Players } from './interfaces/players.interface';
import { PlayerValidationParamsPipe } from './pipes/player-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playerservice:PlayersService){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createplayer:CreatePlayer){
       return await this.playerservice.createPlayer(createplayer);
    }

    @Put('/:_id')
    async update(
        @Body() createplayer:CreatePlayer,
        @Param('_id',PlayerValidationParamsPipe) _id:string
    ){
        await this.playerservice.updatePlayer(_id,createplayer);
    }

    @Get()
    async index(@Query('page') page:number):Promise<Players[]>
    {
        const pageCurrent = page?page:1;
        return await this.playerservice.findAllPlayers(pageCurrent);
    }

    @Get('/:_id')
    async show(@Param('_id',PlayerValidationParamsPipe) id:string):Promise<Players>
    {
        return await this.playerservice.findPlayerById(id);
    }

    @Delete('/:_id')
    async delete(@Param('_id',PlayerValidationParamsPipe) _id:string):Promise<void>{
        this.playerservice.deletePlayer(_id);
    }
}
