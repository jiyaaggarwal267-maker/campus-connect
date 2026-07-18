import { Request, Response } from "express";
import Registration from "../models/Registration";
import Event from "../models/Event";


// REGISTER FOR EVENT
// POST /api/registrations
// Private
export const registerForEvent = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { eventId } = req.body;

    const studentId = req.user?._id;


    if (!studentId) {
      res.status(401).json({
        message: "User not authenticated"
      });
      return;
    }


    if (req.user?.role !== "student") {
      res.status(403).json({
        message: "Only students can register for events"
      });
      return;
    }



    const event = await Event.findById(eventId);


    if (!event) {
      res.status(404).json({
        message: "Event not found"
      });
      return;
    }



    if (event.availableSeats <= 0) {

      res.status(400).json({
        message:"Event is full"
      });

      return;
    }



    if(new Date() > new Date(event.deadline)){

      res.status(400).json({
        message:"Registration deadline expired"
      });

      return;

    }




    const existingRegistration =
      await Registration.findOne({
        student: studentId,
        event:eventId
      });



    // Already registered
    if(
      existingRegistration &&
      existingRegistration.status==="registered"
    ){

      res.status(400).json({
        message:"Already registered"
      });

      return;

    }



    // Register again after cancellation
    if(
      existingRegistration &&
      existingRegistration.status==="cancelled"
    ){

      existingRegistration.status="registered";

      await existingRegistration.save();


      event.availableSeats -=1;

      await event.save();


      res.status(200).json({
        message:"Registered again",
        registration:existingRegistration
      });

      return;

    }




    const registration =
      await Registration.create({

        student:studentId,

        event:eventId

      });



    event.availableSeats -=1;

    await event.save();



    res.status(201).json({

      message:"Registration successful",

      registration

    });



  }

  catch(error:any){

    console.log(error);


    if(error.code===11000){

      res.status(400).json({
        message:"Already registered"
      });

      return;

    }


    res.status(500).json({
      message:error.message
    });

  }

};







// CANCEL REGISTRATION
// DELETE /api/registrations/:id
// Private

export const cancelRegistration = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const registration =
      await Registration.findById(req.params.id);



    if(!registration){

      res.status(404).json({
        message:"Registration not found"
      });

      return;

    }




    if(
      registration.student.toString()
      !== req.user?._id.toString()
      &&
      req.user?.role!=="admin"
    ){

      res.status(403).json({
        message:"Not allowed"
      });

      return;

    }




    if(registration.status==="cancelled"){

      res.status(400).json({
        message:"Already cancelled"
      });

      return;

    }




    registration.status="cancelled";

    await registration.save();




    const event =
      await Event.findById(
        registration.event
      );



    if(event){

      event.availableSeats +=1;

      await event.save();

    }



    res.json({

      message:"Registration cancelled"

    });



  }

  catch(error:any){

    res.status(500).json({
      message:error.message
    });

  }


};







// GET MY EVENTS
// GET /api/registrations/my-events

export const getMyRegistrations = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const registrations =
      await Registration.find({
        student:req.user?._id
      })
      .populate("event")
      .sort({
        registeredAt:-1
      });



    res.json(registrations);



  }

  catch(error:any){


    res.status(500).json({
      message:error.message
    });


  }


};