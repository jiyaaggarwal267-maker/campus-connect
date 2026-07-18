import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';


const App: React.FC = () => {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Toaster 
          position="top-right"
          reverseOrder={false}
        />


        <div className="min-h-screen flex flex-col">


          <Navbar />


          <main className="flex-grow">

            <Routes>


              {/* Home */}
              <Route 
                path="/" 
                element={<Home />} 
              />



              {/* All Events */}
              <Route 
                path="/events" 
                element={<Events />} 
              />



              {/* Single Event Details */}
              <Route 
                path="/events/:id" 
                element={<EventDetails />} 
              />



              {/* Authentication */}
              <Route 
                path="/login" 
                element={<Login />} 
              />


              <Route 
                path="/register" 
                element={<Register />} 
              />



              {/* Student Dashboard */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />



              {/* Admin Dashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />



              {/* Unknown routes */}
              <Route
                path="*"
                element={
                  <Navigate 
                    to="/" 
                    replace 
                  />
                }
              />


            </Routes>


          </main>


          <Footer />


        </div>


      </BrowserRouter>


    </AuthProvider>

  );

};


export default App;