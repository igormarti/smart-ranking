import { Controller, Param, Post } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('api/v1/subscribe')
export class SubscribeController {

    constructor(private readonly categoryservice:CategoriesService){}

    @Post('/:category_id/:player_id')
    async create(@Param() params:string[]):Promise<void>{   
       await this.categoryservice.toAssignPlayerCategory(params);
    }

}
