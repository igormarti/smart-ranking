import {Document} from 'mongoose'

export interface Players extends Document{
    readonly phone: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    urlPhotoPlayer: string;
}