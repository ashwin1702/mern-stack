import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
const PORT = 4000;
const app = express();

app.use(cors);

await mongoose.connect("mongodb+srv://ashwin1:ashwin123@cluster0.1o18ziq.mongodb.net/?retryWrites=true&w=majority");
console.log("Mongo DB connection is successful")


app.get('/',(req,res)=>{
    res.send("Hello");
});

app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:4000`);
})