import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-[var(--color-primary)]" />
              <span className="font-bold text-2xl text-gradient">CampusConnect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/') ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-600 hover:text-[var(--color-primary)]'} transition-colors`}>Home</Link>
            <Link to="/events" className={`${isActive('/events') ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-600 hover:text-[var(--color-primary)]'} transition-colors`}>Events</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">Login</Link>
                <Link to="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:opacity-90 transition-opacity font-medium shadow-md shadow-indigo-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[var(--color-primary)] focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg absolute w-full border-b border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/') ? 'bg-indigo-50 text-[var(--color-primary)] font-medium' : 'text-gray-600'}`}>Home</Link>
            <Link to="/events" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/events') ? 'bg-indigo-50 text-[var(--color-primary)] font-medium' : 'text-gray-600'}`}>Events</Link>
            
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 font-medium">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 px-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-2 bg-[var(--color-primary)] text-white rounded-full font-medium">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
