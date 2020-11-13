import * as mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    name:String,
    phone:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    ranking:String,
    rankingPosition:Number,
    urlPhotoPlayer:String
},
{
  timestamps:true,
  collection:'players'
});

export default PlayerSchema;