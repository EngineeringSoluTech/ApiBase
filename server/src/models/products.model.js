import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productName: {type: String, require: true},
    reference: {type: String, default: "Otros"},
    productState: {type: Boolean,default: true},
    photo: [],
    quantityStock: {type: Number, require: true, default: 1},
    whoLoveThis :[],
    sizes:[],
    size:{type: String},
    description : {type: String, default: "New product¡"},
    price: {type: Number, require: true, default:1},
    typeOfCurrency: {type: String, default: 'COP'}

})

const UserModel = mongoose.model('Product', productSchema);
export default UserModel;
