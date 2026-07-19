import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import generateToken from "../utils/generateToken";


// REGISTER USER
// POST /api/auth/register
// Public

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      email,
      password
    } = req.body;



    const userExists =
      await User.findOne({ email });



    if(userExists){

      res.status(400).json({
        message:"User already exists"
      });

      return;

    }




    const salt =
      await bcrypt.genSalt(10);



    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );



    const user =
      await User.create({

        name,

        email,

        password:hashedPassword,

        // IMPORTANT
        // everyone registering becomes student
        role:"student"

      });




    generateToken(
      res,
      user._id as any
    );



    res.status(201).json({

      _id:user._id,

      name:user.name,

      email:user.email,

      role:user.role,

      avatar:user.avatar

    });



  }

  catch(error:any){

    res.status(500).json({
      message:error.message
    });

  }


};








// LOGIN USER
// POST /api/auth/login

export const loginUser = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const {
      email,
      password
    } = req.body;




    const user =
      await User.findOne({
        email
      });





    if(
      user &&
      user.password &&
      await bcrypt.compare(
        password,
        user.password
      )
    ){



      generateToken(
        res,
        user._id as any
      );



      res.json({

        _id:user._id,

        name:user.name,

        email:user.email,

        role:user.role,

        avatar:user.avatar

      });



    }

    else{


      res.status(401).json({

        message:"Invalid email or password"

      });


    }



  }

  catch(error:any){

    res.status(500).json({
      message:error.message
    });

  }


};










// LOGOUT USER
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {

  const isProduction = process.env.NODE_ENV === "production";

res.cookie("jwt", "", {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  expires: new Date(0),
  path: "/",
});
  res.status(200).json({
    message: "Logged out successfully",
  });

};

// CURRENT USER

export const getMe = async(
req:Request,
res:Response
):Promise<void>=>{


try{


if(req.user){


res.json({

_id:req.user._id,

name:req.user.name,

email:req.user.email,

role:req.user.role,

avatar:req.user.avatar


});


}

else{


res.status(404).json({

message:"User not found"

});


}



}

catch(error:any){


res.status(500).json({

message:error.message

});


}



};