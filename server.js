// import modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();
const Transaction = require("./modals/Transaction.js");
const mongoose = require("mongoose");

// midldleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Backend Server is running ...");
});

// db
app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price, description, datetime } = req.body;

  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
  });
  
  res.json(transaction);
});

app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();

  res.json(transactions);
})


// port || listener 
app.listen(process.env.PORT || 4040);
