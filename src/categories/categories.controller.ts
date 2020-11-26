import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto/CreateCategory.dto';
import { UpdateCategory } from './dto/UpdateCategory.dto';
import { Category } from './interface/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private readonly categoriesservice:CategoriesService){}

    @Get()    
    async index(@Query('page') page:number):Promise<Category[]>{
        const pageCurrent = page?page:1;
        return this.categoriesservice.findCategories(pageCurrent); 
    }

    @Get('/:_id')
    async show(@Param('_id')_id:string):Promise<Category>{
        return await this.categoriesservice.findCategoryById(_id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body()createcategory:CreateCategory):Promise<Category> {
        return this.categoriesservice.createCategory(createcategory);
    }

    @Put('/:_id')
    async update(@Body() updatecategory:UpdateCategory,@Param('_id')_id):Promise<void> {
        await this.categoriesservice.updateCategory(updatecategory,_id)
    }

}
