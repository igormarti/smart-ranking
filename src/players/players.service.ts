import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { Players } from './interfaces/players.interface';
import * as uuid from 'uuid/v1';

@Injectable()
export class PlayersService {

    private players:Players[] = [];
    private readonly logger = new Logger(PlayersService.name);

    async createOrUpdatePlayer(createplayer:CreatePlayer):Promise<void>{
        
        const {email} = createplayer;

        const playerFound:Players = this.players.find(player => player.email===email)

        if(playerFound){
            this.updatePlayer(playerFound,createplayer);
        }else{
            this.createPlayer(createplayer);
        }
    }

    async findAllPlayers():Promise<Players[]>{
        return await this.players;
    }

    private createPlayer(createplayer:CreatePlayer):void{
        const {name,email,phone} =  createplayer;

        const player:Players = {
            _id:uuid(),
            name,
            email,
            phone,
            ranking:'A',
            rankingPosition:4,
            urlPhotoPlayer:'http://photo/photo2.jpg'
        }
        this.players.push(player);
        this.logger.log(JSON.stringify(player));
    }

    private updatePlayer(playerFound:Players,player:CreatePlayer):void{
        const {name} = player;

        playerFound.name = name;
        this.logger.log(JSON.stringify(playerFound));
    }

}
