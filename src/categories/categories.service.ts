import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategory } from './dto/CreateCategory.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category')private readonly category:Model<Category>){}

    async createCategory(createcategory:CreateCategory):Promise<Category>{

        const {category} = createcategory;

        const categoryFound = await this.category.findOne({category}).exec();

        if(categoryFound){
            throw new BadRequestException(`the category ${category} already exists`);
        }

        const categoryCreate = new this.category(createcategory);
        return await categoryCreate.save();
    }
}
