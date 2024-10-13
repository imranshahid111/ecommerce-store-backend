import User from "../models/usermodel.js";
import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import  jwt  from 'jsonwebtoken';

export const registerController = async(req,res)=>{
    try {
        const {name, email, password, confirmPassword} = req.body;
            if(!name  || !email || !password || !confirmPassword){
                return res.status(400).json({message: "Please fill in all fields."});
            };
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: 'User already registered',
              });
        }

    const hashedPassword = await hashPassword(password);

    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      
    });
    await user.save();
  

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });


    } catch (error) {
        console.log("error in loging" ,error);
      res.status(400).send({
        success : false,
        message : "Error in registration",
        error
      })
        
    }
}

export const loginController = async(req,res) =>{
try {
  const {email , password}  = req.body;
  if(!email || !password){
    return  res.status(400).json({message: "Please fill in all fields."});
  }

  const user = await User.findOne({email});
  if(!user) {
    return res.status(300).send({
      success : false,
      message : "Email not found",
    })
  }

  const match =  await comparePassword(password,user.password);
  if(!match) {
    return res.status(200).send({
      success : false,
      message : "Incorrect Password",
    })
  }

  const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
    expiresIn:"7d",
  })
  res.status(200).send({
    success : true,
    message : "Login successful",
    user:{
      name : user.name,
      email : user.email,
      role : user.role,
    },
    token,
  })



} catch (error) {
  console.log(error);
  res.status(400).send({
    success : false,
    message : "Error in login",
  })
}
}