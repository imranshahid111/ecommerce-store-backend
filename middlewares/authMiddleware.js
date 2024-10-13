import jwt from 'jsonwebtoken';


export const requireSignin = async(req, res , next) =>{
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.status(401).send({ message: 'Access denied. No token provided.' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message :  "Error in auth Midleware",
            error

        })
    }
}