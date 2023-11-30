const express = require('express');
const connection =require('./config');
const Employee=require('./Employe');
const app=express();
let data=[]
app.use(express.json());
app.get('/',(req,res)=>res.send('Hello from Homepage. And hi'));
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
app.delete("/delete/:id", async (req, resp) => {
    console.log(req.params.id);
    let data = await Employee.deleteOne({ _id: req.params.id });
    resp.send(data);
  });
  
/*app.put("/update/:id",async(req,resp)=>{
    console.log(req.params.id)
    let data=await Employee.updateOne(
        _id:req.params.id,
        {
            $set:req.body
        }
    );
    resp.send(data);
})*/
app.put("/update/:id", async (req, resp) => {
    console.log(req.params.id);
    let data = await Employee.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    resp.send(data);
  });
  app.get("/search/:key", async (req, resp) => {
    console.log(req.params.key);
    let data = await Employee.find({
      $or: [
        { firstName: { $regex: req.params.key } },
        { lastname: { $regex: req.params.key } }
      ]
    });
    resp.send(data);
  });
  app.get("/list-with-experience/:key", async (req, res) => {
    console.log(req.params.key);
      let data = await Employee.aggregate([
        /*  {
          "$match":
            {
                $or: [
                    { firstName: { $regex: req.params.key } },
                    { lastname: { $regex: req.params.key } }
                  ]

            }
        },*/
        {
          $lookup: {
            from: "experience",
            localField: "_id",
            foreignField: "eid",
            as: "exp",
          },
        },
        {"$limit": 3},
        {$project: {
            _id: "$_id",
            firstName: "$firstName"
        }},
        {"$sort": {"firstName": 1}},
      ]);
      res.send(data);
  });
app.listen(8080);
