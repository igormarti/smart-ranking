import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayerValidationParamsPipe implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
      
       if(!value){
           throw new BadRequestException(`${metadata.data} is required`);
       } 

       return value;
    }

}