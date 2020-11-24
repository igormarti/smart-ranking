import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto/CreateCategory.dto';
import { Category } from './interface/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private readonly categoriesservice:CategoriesService){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body()createcategory:CreateCategory):Promise<Category> {
        return this.categoriesservice.createCategory(createcategory);
    }

}
