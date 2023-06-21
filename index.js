const express = require('express');
const connection =require('./config');
const Employee=require('./Employe');
const app=express();
let data=[]
app.use(express.json());
app.get('/',(req,res)=>res.send('Hello from Homepage.'));
app.get("/list",async(req,resp)=>{
    let data = await Employee.find();
    resp.send(data);
})
app.post("/create",async(req,resp)=>{
    let data=new Employee(req.body);
    let result= await data.save();
    console.log(result)
    resp.send(result);
})
app.get("/list",async(req,resp)=>{
    let data = await Employee.find();
    resp.send(data);
})
app.delete("/delete/:id",async(req,resp)=>{
    console.log(req.params)
    let data=await Employee.deleteOne(req.params);
    resp.send(data);
})
app.put("/update/:id",async(req,resp)=>{
    console.log(req.params)
    let data=await Employee.updateOne(
        req.params,
        {
            $set:req.body
        }
    );
    resp.send(data);
})
app.listen(5000);