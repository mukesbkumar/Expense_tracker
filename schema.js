const mongoose=require('mongoose')
const expenseTrackerSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    }
})
const Expense =mongoose.model('expensedeatils',expenseTrackerSchema)
module.exports=(Expense)