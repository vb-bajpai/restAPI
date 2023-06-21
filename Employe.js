const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    firstName:String,
    lastname:String,
    age:Number
});
module.exports=mongoose.model('employeedata',employeeSchema)