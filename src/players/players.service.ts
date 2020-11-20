import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayer } from './dtos/CreatePlayer.dto';
import { Players } from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player')private readonly Player:Model<Players>){}

    private readonly logger = new Logger(PlayersService.name);

    async createPlayer(createplayer:CreatePlayer):Promise<Players>{

        const {email} = createplayer;

        const playerFound = await this.Player.findOne({email}).exec();

        if(playerFound){
            throw new BadRequestException(`This email already exists`);
        }

        return this.create(createplayer);
    }

    async updatePlayer(_id,createplayer:CreatePlayer):Promise<void>{

        const {email} = createplayer;

        const playerFound = await this.Player.findById(_id).exec();

        if(!playerFound){
            throw new NotFoundException(`Player not found.`); 
        }

        if(email!==playerFound.email){
            const emailExists = await this.Player.findOne({email}).exec();

            if(emailExists){
                throw new BadRequestException(`This email already exists`);
            }
        }

        this.update(_id,createplayer);
    }

    async findAllPlayers(page):Promise<Players[]>{
        return await this.Player.find().skip((page-1)*5).limit(5).exec();
    }

    async findPlayerById(_id:string):Promise<Players>{
        const playerFound = await this.Player.findById(_id).exec();
        if(!playerFound){
            throw new NotFoundException(`Player with id:${_id} not found.`); 
        }
        return playerFound;
    }

    async deletePlayer(_id:string):Promise<any>{
      return await this.Player.findByIdAndDelete(_id).exec();
    }

    private async create(createplayer:CreatePlayer):Promise<Players>{
        const player = new this.Player(createplayer);
        return await player.save();
    }

    private async update(_id,player:CreatePlayer):Promise<Players>{
        return await this.Player.findByIdAndUpdate(_id,{$set:player}).exec();
    }

}
