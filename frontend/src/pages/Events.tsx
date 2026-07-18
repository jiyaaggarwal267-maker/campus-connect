import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import api from '../services/api';

interface Event {
  _id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  banner?: string;
  availableSeats: number;
  capacity: number;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = Array.from(new Set(events.map(e => e.category)));

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Discover Events</h1>
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-gray-50"
              />
            </div>
            <div className="md:w-64">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-gray-50"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col">
                <div className="h-48 relative bg-gray-200">
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
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-6 text-gray-600 text-sm flex-grow">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>{event.availableSeats} / {event.capacity} seats left</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full ${event.availableSeats === 0 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.max(0, ((event.capacity - event.availableSeats) / event.capacity) * 100)}%` }}
                    ></div>
                  </div>
                  
                  <Link 
                    to={`/events/${event._id}`} 
                    className="block w-full py-3 bg-[var(--color-primary)] text-white text-center rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchTerm(''); setCategoryFilter('');}}
              className="mt-4 text-[var(--color-primary)] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;