import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import {Event} from '../interface/category.interface';

export class CreateCategory{
    @IsString()
    @IsNotEmpty()
    category:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsArray()
    @ArrayMinSize(1)
    events:Array<Event>;
}