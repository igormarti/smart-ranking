import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategory } from './dto/CreateCategory.dto';
import { UpdateCategory } from './dto/UpdateCategory.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category')private readonly category:Model<Category>,
    private readonly player:PlayersService){}

    async findCategories(page:number):Promise<Category[]>{
        return await this.category.find().populate('players','_id name')
        .skip((page-1)*5).limit(5).exec();
    }

    async findCategoryById(_id:string):Promise<Category>{
       const category = await this.category.findById(_id).populate('players','_id name').exec();

       if(!category){
           throw new NotFoundException(`category ${_id} not found`);
       }

       return category;
    }

    async createCategory(createcategory:CreateCategory):Promise<Category>{

        const {category} = createcategory;

        const categoryFound = await this.category.findOne({category}).exec();

        if(categoryFound){
            throw new BadRequestException(`the category ${category} already exists`);
        }

        const categoryCreate = new this.category(createcategory);
        return await categoryCreate.save();
    }

    async updateCategory(category:UpdateCategory,_id:string):Promise<void>{

        const categoryFound = await this.category.findById(_id).exec();

        if(!categoryFound){
            throw new NotFoundException(`category not found`);
        }
        
        await this.category.findByIdAndUpdate({_id},{$set:category}).exec();
    }

    async toAssignPlayerCategory(params:string[]):Promise<void>{

        const categoryFound = await this.category.findById(params['category_id']).exec();
        if(!categoryFound){
            throw new NotFoundException(`category ${params['category_id']} not found`);
        }

        const playerInCategory = await this.category.findById(categoryFound._id)
        .where('players').in(params['player_id']).exec();
        if(playerInCategory){
            throw new BadRequestException(`player ${params['player_id']} already to assign in category ${categoryFound._id} `);
        }

        await this.player.findPlayerById(params['player_id']);

        categoryFound.players.push(params['player_id']);
        this.category.findByIdAndUpdate(params['category_id'],{$set:{players:params['player_id']}}).exec();
    }
}
