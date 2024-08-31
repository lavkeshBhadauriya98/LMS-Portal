const errorMiddleware = (err,req,res,next)=>{
    console.log("Error middleware loaded");
    err.statusCode = err.statusCode || 500;
    err.message = err.message|| "Something went wrong!"

    return res.status(err.statuscode).json({
        sucess: false,
        message:  err.stack,
    })
}

export default errorMiddleware;