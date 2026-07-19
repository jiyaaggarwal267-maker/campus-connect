import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Calendar as CalendarIcon,
  Ticket,
  Bell,
  Plus,
  Loader2,
  Trash2
} from 'lucide-react';

import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import api from '../services/api';


interface Stats {
  totalStudents: number;
  totalEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  recentActivities: any[];
}


const AdminDashboard: React.FC = () => {

  const { user } = useAuth();

  const [stats,setStats] = useState<Stats | null>(null);

  const [loading,setLoading] = useState(true);


  const [announcements,setAnnouncements] = useState<any[]>([]);

  const [events,setEvents] = useState<any[]>([]);


  const [, setIsCreatingAnn] = useState(false);

  const [isCreatingEvent,setIsCreatingEvent] = useState(false);
  const [eventImage,setEventImage] = useState<File | null>(null);



  const {
    register: regAnn,
    handleSubmit: submitAnn,
    reset: resetAnn

  } = useForm();



  const {
    register: regEvent,
    handleSubmit: submitEvent,
    reset: resetEvent

  } = useForm();



  const fetchDashboardData = async()=>{

    try{


      const [
        statsRes,
        annRes,
        eventsRes

      ] = await Promise.all([

        api.get('/admin/dashboard'),

        api.get('/announcements'),

        api.get('/events')

      ]);


      setStats(statsRes.data);

      setAnnouncements(annRes.data);

      setEvents(eventsRes.data);


    }
    catch(error){

      console.error(error);

      toast.error("Failed to load dashboard");

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchDashboardData();

  },[]);




  // CREATE ANNOUNCEMENT

  const onCreateAnnouncement = async(data:any)=>{


    setIsCreatingAnn(true);


    try{


      await api.post(
        '/admin/announcement',
        data
      );


      toast.success("Announcement created");


      resetAnn();

      fetchDashboardData();


    }
    catch(error:any){


      toast.error(
        error.response?.data?.message ||
        "Failed to create announcement"
      );


    }
    finally{

      setIsCreatingAnn(false);

    }

  };





  // DELETE ANNOUNCEMENT

  const deleteAnnouncement = async(id:string)=>{


    if(!window.confirm("Delete announcement?"))
      return;



    try{


      await api.delete(
        `/admin/announcement/${id}`
      );


      toast.success("Deleted");


      fetchDashboardData();


    }
    catch(error){

      toast.error("Delete failed");

    }


  };





  // CREATE EVENT

const onCreateEvent = async(data:any)=>{

  setIsCreatingEvent(true);

  try{

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("venue", data.venue);
    formData.append("date", data.date);
    formData.append("deadline", data.deadline);
    formData.append("capacity", data.capacity);


    if(eventImage){
      formData.append(
        "banner",
        eventImage
      );
    }


    await api.post(
      "/events",
      formData
    );


    toast.success("Event created");


    resetEvent();

    setEventImage(null);


    fetchDashboardData();


  }
  catch(error:any){

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to create event"
    );

  }
  finally{

    setIsCreatingEvent(false);

  }

};// DELETE EVENT

  const deleteEvent = async(id:string)=>{


    if(!window.confirm("Delete event?"))
      return;



    try{


      await api.delete(
        `/events/${id}`
      );


      toast.success("Event deleted");


      fetchDashboardData();


    }
    catch(error){

      toast.error("Failed to delete event");

    }


  };






  if(loading || !stats){


    return (

      <div className="flex justify-center items-center min-h-[60vh]">

        <Loader2 className="w-12 h-12 animate-spin"/>

      </div>

    );


  }







return (

<div className="bg-gray-50 min-h-screen py-10">


<div className="max-w-7xl mx-auto px-4">



<h1 className="text-3xl font-bold mb-2">
Admin Dashboard
</h1>


<p className="text-gray-500 mb-10">
Welcome back, {user?.name}
</p>






{/* STATS */}


<div className="grid md:grid-cols-4 gap-6 mb-10">



<div className="bg-white p-6 rounded-xl">

<Users/>

<p>Total Students</p>

<h2 className="text-2xl font-bold">
{stats.totalStudents}
</h2>

</div>



<div className="bg-white p-6 rounded-xl">

<CalendarIcon/>

<p>Total Events</p>

<h2 className="text-2xl font-bold">
{stats.totalEvents}
</h2>

</div>




<div className="bg-white p-6 rounded-xl">

<Ticket/>

<p>Registrations</p>

<h2 className="text-2xl font-bold">
{stats.totalRegistrations}
</h2>

</div>




<div className="bg-white p-6 rounded-xl">

<CalendarIcon/>

<p>Upcoming</p>

<h2 className="text-2xl font-bold">
{stats.upcomingEvents}
</h2>

</div>



</div>







<div className="grid lg:grid-cols-2 gap-8">







{/* EVENTS */}


<div className="bg-white rounded-3xl p-6">


<h2 className="text-xl font-bold flex gap-2 mb-5">

<CalendarIcon/>

Manage Events

</h2>




<form
onSubmit={submitEvent(onCreateEvent)}
className="space-y-3"
>



<input
{...regEvent("title")}
placeholder="Event title"
className="w-full border p-3 rounded-lg"
/>



<textarea
{...regEvent("description")}
placeholder="Description"
className="w-full border p-3 rounded-lg"
/>




<input
{...regEvent("category")}
placeholder="Category"
className="w-full border p-3 rounded-lg"
/>




<input
{...regEvent("venue")}
placeholder="Venue"
className="w-full border p-3 rounded-lg"
/>




<input
type="date"
{...regEvent("date")}
className="w-full border p-3 rounded-lg"
/>





<input
type="date"
{...regEvent("deadline")}
className="w-full border p-3 rounded-lg"
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>{

    if(e.target.files){

      setEventImage(
        e.target.files[0]
      );

    }

  }}
  className="w-full border p-3 rounded-lg"
/>


{
  eventImage && (

    <div className="mt-3">

      <p className="text-sm text-gray-500 mb-2">
        Image Preview
      </p>

      <img
        src={URL.createObjectURL(eventImage)}
        alt="Event Preview"
        className="w-full h-40 object-cover rounded-xl"
      />

    </div>

  )
}





<input
type="number"
{...regEvent("capacity")}
placeholder="Capacity"
className="w-full border p-3 rounded-lg"
/>





<button
className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
>


{
isCreatingEvent ?

<Loader2 className="animate-spin"/>

:

<Plus/>

}

Create Event


</button>



</form>





<hr className="my-6"/>



<h3 className="font-bold mb-4">
Existing Events
</h3>



{

events.length===0 ?

<p className="text-gray-500">
No events created
</p>


:

events.map(event=>(


<div
key={event._id}
className="border p-4 rounded-xl mb-3 flex justify-between"
>


<div>

<h4 className="font-bold">
{event.title}
</h4>


<p>
{event.category}
</p>


<p>
Seats: {event.availableSeats}/{event.capacity}
</p>


</div>



<button
onClick={()=>deleteEvent(event._id)}
className="text-red-500"
>

<Trash2/>

</button>



</div>


))

}




</div>









{/* ANNOUNCEMENTS */}



<div className="bg-white rounded-3xl p-6">


<h2 className="text-xl font-bold flex gap-2 mb-5">

<Bell/>

Create Announcement

</h2>



<form
onSubmit={submitAnn(onCreateAnnouncement)}
className="space-y-4"
>



<input

{...regAnn("title")}

placeholder="Title"

className="w-full border p-3 rounded-lg"

/>





<textarea

{...regAnn("description")}

placeholder="Description"

className="w-full border p-3 rounded-lg"

/>





<button

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>


Publish


</button>



</form>





<div className="mt-6">


<h3 className="font-bold mb-3">
Announcements
</h3>



{

announcements.map(ann=>(


<div
key={ann._id}
className="border p-3 rounded-lg flex justify-between mb-3"
>


<div>

<p className="font-semibold">
{ann.title}
</p>

</div>


<button
onClick={()=>deleteAnnouncement(ann._id)}
className="text-red-500"
>

<Trash2/>

</button>


</div>


))


}


</div>



</div>





</div>



</div>


</div>


);

};


export default AdminDashboard;