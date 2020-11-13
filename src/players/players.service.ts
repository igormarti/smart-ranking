import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { Players } from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player')private readonly Player:Model<Players>){}

    private readonly logger = new Logger(PlayersService.name);

    async createOrUpdatePlayer(createplayer:CreatePlayer):Promise<Players>{
        
        const {email} = createplayer;

        const playerFound = await this.Player.findOne({email}).exec();

        if(playerFound){
           return this.updatePlayer(createplayer);
        }else{
           return this.createPlayer(createplayer);
        }
    }

    async findAllPlayers():Promise<Players[]>{
        return await this.Player.find().exec();
    }

    async findPlayerByEmail(email:string):Promise<Players>{
        const playerFound = await this.Player.findOne({email}).exec();
        if(!playerFound){
            throw new NotFoundException(`Player with email:${email} not found.`); 
        }
        return playerFound;
    }

    async deletePlayer(email:string):Promise<any>{
      return await this.Player.remove({email}).exec();
    }

    private async createPlayer(createplayer:CreatePlayer):Promise<Players>{
        const player = new this.Player(createplayer);
        return await player.save();
    }

    private async updatePlayer(player:CreatePlayer):Promise<Players>{
        const {email} = player;
        return await this.Player.findOneAndUpdate({email},{$set:player}).exec();
    }

}
