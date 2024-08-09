import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
    title: String,
    price: Number,
    categoria: String,
    disponibilidad: Boolean
},
{
    timestamps: true
}
)

productSchema.plugin(mongoosePaginate)
const ProductModel = model("Product", productSchema)
export default ProductModel