import mongoose from 'mongoose';

async function connect(){
    await mongoose.connect(
    "mongodb+srv://ashwin1:ashwin123@cluster0.1o18ziq.mongodb.net/?retryWrites=true&w=majority");
console.log("Mongo DB connection is successful");
}

export default connect;
