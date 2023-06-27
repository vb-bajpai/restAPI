const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    firstName:String,
    lastname:String,
    age:Number,
    exp:Array
});
module.exports=mongoose.model('employeedata',employeeSchema)