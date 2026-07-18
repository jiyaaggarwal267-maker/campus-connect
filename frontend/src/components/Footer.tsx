import React from 'react';
import { Calendar } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-[var(--color-primary)]" />
              <span className="font-bold text-xl text-gray-900">
                CampusConnect
              </span>
            </Link>

            <p className="text-gray-500 text-sm">
              Your ultimate platform for managing and discovering campus events.
              Connect, learn, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  Browse Events
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Support
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-gray-500 hover:text-[var(--color-primary)] text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Connect
            </h3>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CampusConnect. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;