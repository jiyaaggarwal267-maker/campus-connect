import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Ticket, Bell, XCircle, Loader2, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import api from '../services/api';


interface Event {
  _id: string;
  title: string;
  date: string;
  venue: string;
}


interface Registration {
  _id: string;
  event: Event;
  status: string;
  registeredAt: string;
}


interface Announcement {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}



const StudentDashboard: React.FC = () => {


  const { user } = useAuth();


  const [registrations,setRegistrations] = useState<Registration[]>([]);

  const [announcements,setAnnouncements] = useState<Announcement[]>([]);

  const [loading,setLoading] = useState(true);

  const [cancelling,setCancelling] = useState<string | null>(null);




  const fetchDashboardData = async()=>{

    try{


      const [
        regRes,
        annRes
      ] = await Promise.all([

        api.get('/registrations/my-events'),

        api.get('/announcements')

      ]);



      setRegistrations(regRes.data);

      setAnnouncements(
        annRes.data.slice(0,5)
      );


    }
    catch(error){

      console.error(error);

      toast.error(
        "Failed to load dashboard"
      );

    }
    finally{

      setLoading(false);

    }


  };




  useEffect(()=>{

    fetchDashboardData();

  },[]);






  const handleCancelRegistration = async(id:string)=>{


    if(
      !window.confirm(
        "Cancel this registration?"
      )
    )
    return;



    try{


      setCancelling(id);



      await api.delete(
        `/registrations/${id}`
      );


      toast.success(
        "Registration cancelled"
      );


      fetchDashboardData();



    }
    catch(error:any){


      toast.error(
        error.response?.data?.message ||
        "Cancellation failed"
      );


    }
    finally{

      setCancelling(null);

    }

  };





  const activeRegistrations =
    registrations.filter(
      reg=>reg.status==="registered"
    );







  if(loading){

    return(

      <div className="flex justify-center items-center min-h-[60vh]">

        <Loader2 className="w-12 h-12 animate-spin text-[var(--color-primary)]"/>

      </div>

    );

  }






  return(


<div className="bg-gray-50 min-h-screen py-10">


<div className="max-w-7xl mx-auto px-4">





{/* Welcome */}

<div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl p-8 mb-8 text-white">


<h1 className="text-3xl font-bold">
Welcome back, {user?.name} 👋
</h1>


<p className="mt-2 text-indigo-100">

You have {activeRegistrations.length} registered event
{activeRegistrations.length!==1 && "s"}

</p>


</div>







<div className="grid lg:grid-cols-3 gap-8">





{/* Registrations */}


<div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">


<div className="flex justify-between mb-6">


<h2 className="text-xl font-bold flex gap-2">

<Ticket/>

My Registrations

</h2>


<Link
to="/events"
className="text-blue-600"
>

Browse Events

</Link>


</div>





{
registrations.length===0 ?


<div className="text-center py-10">


<Calendar className="mx-auto mb-3"/>


<p>
No registered events yet
</p>


<Link
to="/events"
className="text-blue-600"
>
Explore Events
</Link>


</div>



:

<div className="space-y-4">


{
registrations.map(reg=>(


<div
key={reg._id}
className="border rounded-xl p-5 flex justify-between items-center"
>



<div>


<h3 className="font-bold text-lg">

{reg.event?.title || "Event removed"}

</h3>



{
reg.event &&

<>

<p className="text-sm text-gray-500 flex gap-2 mt-2">

<Calendar size={15}/>

{new Date(
reg.event.date
).toLocaleDateString()}

</p>


<p className="text-sm text-gray-500 flex gap-2">

<MapPin size={15}/>

{reg.event.venue}

</p>

</>

}



</div>






<div className="flex gap-3 items-center">


{
reg.status==="registered" ?

<>


<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">

Confirmed

</span>



<button

onClick={()=>handleCancelRegistration(reg._id)}

disabled={
cancelling===reg._id
}

className="text-red-500"

>

{
cancelling===reg._id ?

<Loader2 className="animate-spin"/>

:

<XCircle/>

}


</button>


</>


:

<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">

Cancelled

</span>

}



{
reg.event &&

<Link

to={`/events/${reg.event._id}`}

className="border px-3 py-2 rounded-lg text-sm"

>

View

</Link>

}



</div>



</div>


))

}


</div>


}



</div>









{/* Sidebar */}


<div className="space-y-8">



<div className="bg-white rounded-3xl p-6">


<h2 className="font-bold flex gap-2 mb-5">

<Bell/>

Announcements

</h2>



{

announcements.length===0 ?

<p>
No announcements
</p>


:

announcements.map(ann=>(


<div
key={ann._id}
className="border-l-4 border-blue-500 pl-3 mb-4"
>


<h4 className="font-semibold">

{ann.title}

</h4>


<p className="text-sm text-gray-500">

{ann.description}

</p>


</div>


))

}



</div>







<div className="bg-white rounded-3xl p-6 text-center">


<div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">


{user?.name?.charAt(0).toUpperCase()}


</div>



<h3 className="font-bold mt-3">

{user?.name}

</h3>


<p className="text-gray-500">

{user?.email}

</p>



</div>




</div>



</div>



</div>



</div>


);


};


export default StudentDashboard;