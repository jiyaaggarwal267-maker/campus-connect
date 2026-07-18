import { Request, Response } from "express";
import Event from "../models/Event";
import { uploadToCloudinary } from "../utils/uploadCloudinary";



// GET ALL EVENTS

export const getEvents = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const events =
await Event.find({})
.sort({
createdAt:-1
});


res.json(events);


}
catch(error:any){


res.status(500).json({

message:error.message

});


}


};








// GET SINGLE EVENT

export const getEventById = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const event =
await Event.findById(
req.params.id
);



if(!event){

res.status(404).json({

message:"Event not found"

});

return;

}



res.json(event);



}
catch(error:any){


res.status(500).json({

message:error.message

});


}


};









// CREATE EVENT

export const createEvent = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const {
title,
description,
category,
venue,
date,
deadline,
capacity
}=req.body;




let bannerUrl="";



if(req.file){

const result:any =
await uploadToCloudinary(
req.file.buffer
);


bannerUrl =
result.secure_url;


}





const event =
await Event.create({

title,

description,

category,

venue,

date,

deadline,

capacity:Number(capacity),

availableSeats:Number(capacity),

banner:bannerUrl,

createdBy:req.user?._id


});



res.status(201).json(event);



}
catch(error:any){


console.log(error);


res.status(500).json({

message:error.message

});


}


};









// UPDATE EVENT

export const updateEvent = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const event =
await Event.findById(
req.params.id
);



if(!event){

res.status(404).json({

message:"Event not found"

});

return;

}





const {
title,
description,
category,
venue,
date,
deadline,
capacity
}=req.body;





event.title =
title || event.title;


event.description =
description || event.description;


event.category =
category || event.category;


event.venue =
venue || event.venue;


event.date =
date || event.date;


event.deadline =
deadline || event.deadline;





if(req.file){


const result:any =
await uploadToCloudinary(
req.file.buffer
);


event.banner =
result.secure_url;


}





if(
capacity &&
Number(capacity)!==
event.capacity
){


const diff =
Number(capacity)
-
event.capacity;



event.capacity =
Number(capacity);



event.availableSeats += diff;


}






const updated =
await event.save();



res.json(updated);



}
catch(error:any){


res.status(500).json({

message:error.message

});


}


};









// DELETE EVENT

export const deleteEvent = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const event =
await Event.findById(
req.params.id
);



if(!event){


res.status(404).json({

message:"Event not found"

});


return;

}



await event.deleteOne();



res.json({

message:"Event removed"

});



}
catch(error:any){


res.status(500).json({

message:error.message

});


}


};