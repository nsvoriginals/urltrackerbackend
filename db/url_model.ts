import { Model, Schema,Document } from "mongoose";
import mongoose  from "mongoose";

interface IURL extends Document{
    UrlCode:string;
    longUrl:String;
    shortUrl:string;
    date:Date;
}

const URLSchema=new mongoose.Schema<IURL>({
    UrlCode:{
        type:String,
        required:true
    },
    longUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: false,
});
const URLModel: Model<IURL> = mongoose.model('Url', URLSchema);

export { URLModel, IURL };