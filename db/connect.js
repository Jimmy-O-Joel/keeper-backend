import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export default  (url) =>{
    return mongoose.connect(url,{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    })
}
