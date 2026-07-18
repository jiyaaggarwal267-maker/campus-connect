import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Zap, Bell } from 'lucide-react';
import api from '../services/api';

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  banner?: string;
}

interface Announcement {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [eventsRes, annRes] = await Promise.all([
          api.get('/events'),
          api.get('/announcements')
        ]);
        // Get only the first 3 upcoming events for the landing page
        setUpcomingEvents(eventsRes.data.slice(0, 3));
        setAnnouncements(annRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching landing data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
              Experience Campus Life Like <span className="text-gradient">Never Before</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Discover, manage, and register for campus events seamlessly. CampusConnect is your one-stop portal for everything happening around you.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/events" className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2">
                Browse Events <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/register" className="px-8 py-3 rounded-full bg-white text-[var(--color-primary)] font-semibold border border-indigo-100 hover:bg-indigo-50 transition-colors shadow-sm">
                Join Now
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why CampusConnect?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Registration</h3>
              <p className="text-gray-600">Register for events with just one click. Keep track of your schedule effortlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-gray-600">Connect with peers who share your interests through technical, cultural, and sports events.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600">Get instant notifications about event changes, announcements, and important deadlines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-500">Don't miss out on what's happening next.</p>
            </div>
            <Link to="/events" className="text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid md:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse"></div>
               ))}
             </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <div key={event._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover">
                  <div className="h-48 bg-gray-200 relative">
                    {event.banner ? (
                      <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-sm font-semibold px-3 py-1 rounded-full text-indigo-700">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">{event.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                    <Link to={`/events/${event._id}`} className="block text-center w-full py-2 bg-indigo-50 text-[var(--color-primary)] font-semibold rounded-lg hover:bg-indigo-100 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500">No upcoming events found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Latest Announcements</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">Stay updated with important news and alerts from the administration.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div key={ann._id} className="glass-dark p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Bell className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{ann.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3">{ann.description}</p>
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(ann.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
