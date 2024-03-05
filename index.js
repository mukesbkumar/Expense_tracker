// console.log("hello")
const mongoose=require('mongoose')
const express = require('express')
const Expense=require('./schema.js')
const parse=require('body-parser')
const app=express()

app.use(parse.json())
async function connectToDb(){

try{
   await mongoose.connect('mongodb+srv://mukeshbkumar2007:Cricket18*@cluster.fdivwwt.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=Cluster')
   console.log("great")
   const port=8094
app.listen(port,function()
{
    console.log(`listening ${(port)}..`)
})
}
catch(err)
{
    console.log(err)
    console.log("not connected")
}
}
connectToDb()

app.post('/add-expense',async function(request,response){
    try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
       response.status(201).json({
        "status":"success"
       })
    }
       catch(err)
       {
        response.status(404).json({
            "status":"Not found"
        })
       }
    })
       
    
    
    app.get('/get-Expense',async function(request,response)
       {

          const expenseData= await Expense.find()
         
          response.json(expenseData)
})
app.delete('/ouu/:id',async function(request,response)
{
   try {
    const dat1= await Expense.findById(request.params.id)
    if(dat1){
       response.send("Exceuted")
        
    }
    else 
     {
        response.status(404).json(
            {
                "status":"not found",
                "message":"file not been present"
            }
        )
    }
   } catch(error) {
    response.status(500).json({
        "error" : error
    })
   }
})
// app.patch("/edit-expense",function(request,response)
// try{
//     const expenseEntry=await Expense.findById(request.params.id)
//     if()
// {
//     Expense.findById(request,params.id)
//     if(expenseEntry)
//     {
//         console
//     }
// })
app.patch('/edit-expense/:id', async function(request, response) {
    try {
        const expenseEntry = await Expense.findById(request.params.id)
        if(expenseEntry) {
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "updated entry"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})