import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { Calendar, MapPin, Users, Loader2, Ticket, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const EventDetails: React.FC = () => {

  const { id } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);


  const fetchData = async () => {

    try {

      const eventRes = await api.get(`/events/${id}`);
      setEvent(eventRes.data);


      if(user?.role === "student"){

        const regRes = await api.get(
          "/registrations/my-events"
        );


        const existing = regRes.data.find(
          (r:any)=>
            r.event._id === id &&
            r.status === "registered"
        );


        setRegistration(existing || null);

      }


    }
    catch(error){

      toast.error(
        "Failed to load event"
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchData();

  },[id,user]);





  const registerEvent = async()=>{

    try{

      setRegistering(true);


      await api.post(
        "/registrations",
        {
          eventId:id
        }
      );


      toast.success(
        "Registered successfully!"
      );


      fetchData();


    }
    catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
    finally{

      setRegistering(false);

    }

  };






  const cancelRegistration = async()=>{

    try{

      await api.delete(
        `/registrations/${registration._id}`
      );


      toast.success(
        "Registration cancelled"
      );


      fetchData();


    }
    catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Cancellation failed"
      );

    }

  };





  if(loading){

    return(
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-12 h-12"/>
      </div>
    );

  }





  if(!event){

    return(
      <div className="text-center p-10">
        Event not found
      </div>
    );

  }





  return (

<div className="bg-gray-50 min-h-screen py-12">

<div className="max-w-5xl mx-auto px-4">


<div className="bg-white rounded-3xl overflow-hidden shadow">


{
event.banner ?

<img
src={event.banner}
alt={event.title}
className="w-full h-96 object-cover"
/>

:

<div className="h-96 bg-gradient-to-r from-indigo-400 to-pink-400 flex items-center justify-center text-white">

<Ticket size={60}/>

</div>

}




<div className="p-8">


<h1 className="text-4xl font-bold">
{event.title}
</h1>


<span className="inline-block mt-3 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full">
{event.category}
</span>



<p className="mt-6 text-gray-600">
{event.description}
</p>





<div className="grid md:grid-cols-3 gap-6 mt-8">


<div className="flex gap-3">
<Calendar/>
<div>
<p className="text-gray-500">
Date
</p>

<p>
{new Date(event.date).toLocaleDateString()}
</p>

</div>
</div>




<div className="flex gap-3">
<MapPin/>

<div>
<p className="text-gray-500">
Venue
</p>

<p>
{event.venue}
</p>

</div>

</div>




<div className="flex gap-3">
<Users/>

<div>

<p className="text-gray-500">
Seats
</p>

<p>
{event.availableSeats}/{event.capacity}
</p>

</div>

</div>


</div>





{
!user ? (

<button
onClick={() => {
  toast.error("Please login first to register");
}}
className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
>
<Ticket />

Login to Register

</button>


) : user.role !== "student" ? (

<div className="mt-8 text-center text-gray-500">
Only students can register for events
</div>


) : registration ? (

<button

onClick={cancelRegistration}

className="mt-8 w-full bg-red-500 text-white py-3 rounded-xl flex justify-center gap-2"

>

<XCircle/>

Cancel Registration

</button>


) : (

<button

onClick={registerEvent}

disabled={
registering || event.availableSeats===0
}

className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2 disabled:opacity-50"

>

{
registering ?

<Loader2 className="animate-spin"/>

:

<Ticket/>

}


{
event.availableSeats===0
?
"Event Full"
:
"Register For Event"

}

</button>

)
}




</div>

</div>

</div>

</div>

  );

};


export default EventDetails;