import {Document} from 'mongoose';
import { Players } from 'src/players/interfaces/players.interface';

export interface Category extends Document{
    readonly category:string;
    description:string;
    events:Array<Event>
    players:Array<Players>
}

export interface Event{
    readonly name:string;
    operation:string;
    value:number;
}
