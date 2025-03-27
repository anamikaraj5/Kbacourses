const admincheck=(req,res,next)=>
{
    if(req.Roles=='admin')
    {
        next()
    }
    else
    {
        res.status(401).send("Unauthorized access")
    }
}

export {admincheck}