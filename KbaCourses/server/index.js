import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/addcourse.js'
import { adminauth1 } from './Routes/multerbase64.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app=express() 

app.use(json())

app.use(cors({
    origin:'*',
    credentials:true
}))


app.use('/',userauth)
app.use('/',adminauth)
app.use('/',adminauth1)

//connecting databases

mongoose.connect('mongodb://mongodb:27017/kbacourses1').then(()=>
    {
        console.log("MongoBD connected successfully to kbacourse")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed",error)
    })

app.listen(8000,function(){
    console.log("server is listening at 8000")
})
