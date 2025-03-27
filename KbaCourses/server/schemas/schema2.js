import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo2 = new Schema({
    
    coursename:{type:String,required:true},
    courseid:{type:String,required:true,unique:true},
    coursetype:String,
    description:String,
    price:String,
    image:String
})


const course =model('admindetails',demo2)

export {course}