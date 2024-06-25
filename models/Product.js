import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  price: {type:Number, required: true},
  reprice: {type:Number, required: true},
  coin: {type:String, required: true},
  topprod: { type:Boolean, default: false},
  brand: {type:String},
  cantidad: {type:Number, required: true},
  sizes: {type:String},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category', required: true},
  enabled: { type:Boolean, default: true },
});

export const Product = models.Product || model('Product', ProductSchema);