const mongoose = require('mongoose');
let uri = 'mongodb://127.0.0.1:27017/person'
// uri = 'mongodb+srv://ahmedcherif19x:123@cluster0.di7vh4t.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri)
const adressSchema = new mongoose.Schema({
    neighborhood:{type:String},
    city:{type:String}
})
const personSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    favoriteFood:[String],
    email:{
    type:String,
    lowercase:true
},
address:adressSchema
})
module.exports = mongoose.model('PersonSchema',personSchema)