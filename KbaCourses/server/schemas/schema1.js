import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo = new Schema({
    // Name:String

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    roles:{type:String,required:true}
})


const sample=model('userdetails',demo)

export {sample}