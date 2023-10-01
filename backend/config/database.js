 const mongoose=require('mongoose');
 const databaseConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{       // nodejs library establishing connection
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(()=>{         //promise handler
        console.log('Mongodb database connected')
    }).catch(error=>{          //error handler
        console.log(error)
    })
 }
 module.exports=databaseConnect;
 // tokens and cookies are mechanisms for managing user authentication stores on the client side,tokens have more flexibility,securirty features