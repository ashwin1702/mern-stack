import express from 'express'
import connect from "./database/mongodb.js"
import cors from 'cors'
import bodyParser from 'body-parser';
import TransactionRouters from "./routes/TransactionApi.js"
const PORT = 4000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello");
});

app.use("/transaction",TransactionRouters);

await connect();



app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:4000`);
})