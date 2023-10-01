const express = require('express');
const app = express();
const dotenv = require('dotenv')

const databaseConnect = require('./config/database')
const authRouter = require('./routes/authRoute')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser');
const messengerRoute=require('./routes/messengerRoute');



dotenv.config({ 
     path : 'backend/config/config.env' //configuration via dotenv
})
app.use(bodyParser.json()); //setting up middleware
app.use(cookieParser());
app.use('/api/chat_application',authRouter); //route configuration   routing
app.use('/api/chat_application',messengerRoute);

const PORT = process.env.PORT || 5000 //defining port on which server will listen 
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})
databaseConnect();
app.listen(PORT, ()=>{           //listening to port
     console.log(`Server is running on port ${PORT}`)
})