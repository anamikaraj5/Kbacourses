import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import { admincheck } from '../Middleware/admin.js'
import { course } from '../schemas/schema2.js'
import {upload} from '../Middleware/upload1.js'
import sharp from 'sharp'

const adminauth=Router()

const converttobase64 = (buffer)=>
    {
        return buffer.toString('base64')
    }

adminauth.post('/addcourse',authenticate,upload.single('CourseImage'),async(req,res)=>
{
    try
    {


        if(req.Roles=='admin')
            {
                const {Coursename,Courseid,Description,Price} = req.body
        
                const result = await course.findOne({coursename:Coursename})
                 if(result)
                 {
                    res.status(400).json({message:"Course already added"})
                 }
                 else
                 {

                    let imagebase64=null
                    if(req.file)
                    {
                        imagebase64 = converttobase64(req.file.buffer)
                    }
                    const newcourse = new course(
                        {
                            coursename:Coursename,
                            courseid:Courseid,
                            description:Description,
                            price:Price,
                            image:imagebase64
                        }
                    )

                    await newcourse.save()
                 }
            }
        else
        {
            res.status(401).json({message:"Unauthorized access"})
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Internal Server error"})
    }
   
})



//using query
adminauth.get('/getcourse',async(req,res)=>
{
    try{
        const name=req.query.coursename 

        const result = await course.findOne({coursename:name})

        if(!result)
        {
            res.status(400).send("Course not found")
           
           
        }
        
        res.status(200).json({
            coursename : result.coursename,
            courseid :result.courseid,
            description:result.description,
            price:result.price,
            imageurl: `/api/getcourseimg?coursename=${encodeURIComponent(name)}`
        })
    }
    catch
    {
        res.status(500).send("Internal server error")
    }
})


adminauth.get('/getcourseimg',async(req,res)=>{
    try{
        const name = req.query.coursename
        const result = await course.findOne({coursename:name})
        if(!result || !result.image)
        {
            return res.status(404).json({msg:"Image not found!"})
        }

        const imagebuffer = Buffer.from(result.image,'base64')
        const compressedimg = await sharp(imagebuffer)
        .resize({width:300})
        .jpeg({quality:70})
        .toBuffer()

        res.set("Content-Type","image/jpeg")
        res.send(compressedimg)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

//to get all courses

adminauth.get('/getallcourses',async(req,res)=>{
    try
    {
        const result = await course.find()
        if(result)
            {
                res.json(result)
                console.log(result)
               
            }
        else
            {
                res.status(400).send("Course not found")
            }

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

//UPDATE
//PUT METHOD

adminauth.put('/updatecourse',authenticate,async(req,res)=>
{
    if(req.Roles=='admin')
    {
        const {CourseName,CourseId,Description,Price} = req.body
        
        const result = await course.findOne({coursename:CourseName})
        if(result)
            {
                result.courseid=CourseId,
                result.description=Description,
                result.price=Price

                await result.save()
                res.status(200).send("Updated successfully...")
            }
        else
            {
                res.status(400).send("Course not found")
            }
    }
    else
    {
         res.status(401).send("Unauthorized access")
    }
    
})

//patch

adminauth.patch('/updatecourse2',authenticate,admincheck,async(req,res)=>
{
        const {CourseName,Price} =req.body
        const result = await course.findOne({coursename:CourseName})
     
        if(result)
        {
                result.price=Price

                await result.save()
                res.status(200).send("Updated successfully...")
        }
        else
            {
                res.status(404).send("Course not found")
            }

})

//DELETE
//delete course

adminauth.delete('/deletecourse',authenticate,admincheck,async(req,res)=>
{
    const name=req.query.coursename
    
    const result=await course.findOne({coursename:name})
    if(result)
    {
        await course.findOneAndDelete({coursename:name})
        res.status(200).send("Course deleted")
    }
    else
    {
        res.status(404).send("Course not found")
    }

})

export {adminauth}