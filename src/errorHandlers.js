//400
export const badRequestHandler = (err,req,res,next) => {
    if (err.status === 400) {
        res.status(400).send({success: false, message: err.message})
    } else {
        next(err);
    };
};

//404
export const notFoundHandler = (err,req,res,next) => {
    if (err.status === 404) {
        res.status(404).send({success: false, message: err.message})
    } else {
        next(err);
    };
}; 

//500
export const genericHandler = (err,req,res,next) => {
    console.log(err)
    res.status(500).send({success: false, message: "Error on our side!"})
};