require('dotenv').config()

const express = require('express');
const PORT = process.env.PORT;

const app = express();
const authRoute = require('./routes/authRoutes');

app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.use('/auth/', authRoute)


app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`)
})
