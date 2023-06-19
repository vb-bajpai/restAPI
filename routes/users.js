import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';

const router = express.Router();

router.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'data';
const collectionName = 'employeedata';

router.get('/', async (req, res) => {
const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection(collectionName);
const users = await collection.find({}).toArray();
client.close();
console.log(users);
res.send(users);
});

router.post('/', async (req, res) => {
  console.log('POST ROUTE REACHED');
  console.log('user');
  const employee = req.body;
  const employeeId = uuidv4();
  const employeeWithId = { ...employee, id: employeeId };
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(employeeWithId);
    client.close();
    res.send(`User with the name ${employee.firstName} added to the database!`);

});

router.get('/:id', async (req, res) => {
const { id } = req.params;
const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection(collectionName);    
const foundUser = await collection.findOne({ id });
client.close();
res.send(foundUser);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection(collectionName);
const deletedEmployee = await collection.findOneAndDelete({ id });
client.close();
res.send(`User with the id ${deletedEmployee.value.id} deleted from the database!`);
  
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  await collection.updateOne({ id }, { $set: updatedEmployee });
  client.close();
  res.send(`User with the id ${id} updated in the database!`);
});

export default router;
