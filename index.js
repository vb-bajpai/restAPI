import express from "express";
import bodyParser from "body-parser";
import usersRoutes from './routes/users.js';
const app=express();
/*const {MongoClient}=require('mongodb');
const url = 'mongodb://localhost:27017';
async function getData()
{
    let result= await clientInformation.connect();
    let db=result.db(database);
    let collection=db.collection('products');
    let response=await collection.find({}).toArray();
    console.log(response);
}*/
const PORT=5000;
app.use(bodyParser.json());
app.use('/users',usersRoutes);
app.get('/',(req,res)=>res.send('Hello from Homepage.'));
//app.get('../pc',(req,res)=>res.send('Hello from pc  Homepage.'));
app.listen(PORT,()=> console.log('Server running on port: http://localhost: ${PORT}'));