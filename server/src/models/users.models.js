import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fisrtName: {type: String, require: true},
    lastName: {type: String, require: true},
    rol: {type: String, default: 'cliente'},
    email: {type: String, require: true, unique: true},
    address: {type: String, default: ''},
    phone: {type: String}, default: '',
    password: {type: String, require: true},
    userState: {type: Boolean,default: true},
    city: {type: String, default: ''},
    photo: {type: String, default: 'https://www.coachhousevets.com/wp-content/uploads/2023/04/no-photo-icon-22.png'},
    lastConnection :[],
    favoriteProducts :[],
    addedShopingCar: [],
    age: {type: Number, default: 18},
})

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;


// module.exports = mongoose.model('user', UserSchema);