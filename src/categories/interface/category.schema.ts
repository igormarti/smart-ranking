import * as  Mongoose from "mongoose"

export const CategorySchema = new Mongoose.Schema({
    category:{
        type:String,
        unique:true,
    },
    description:String,
    events:[
        {
            name:String,
            operation:String,
            value:Number
        }
    ],
    players:[
        {
            type:Mongoose.Schema.Types.ObjectId,
            ref:"Player"
        }
    ]
},
{
    timestamps:true,
    collection:'categories'
});