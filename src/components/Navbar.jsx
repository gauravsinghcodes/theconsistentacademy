import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiArrowRight } from 'react-icons/fi';
import { ACADEMY_INFO } from '../data/academyData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Tests', path: '/tests' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 rounded-lg p-1 shrink-0">
          <img
            src="/assets/logo2.png"
            alt={ACADEMY_INFO.name}
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/logo.png';
            }}
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none">
              The Consistent
            </span>
            <span className="text-xs sm:text-sm font-semibold text-brand-700 tracking-wider uppercase mt-0.5">
              Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-2.5 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-brand-800 bg-brand-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/courses"
            className="group relative inline-flex items-center gap-2 px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-brand-700 via-brand-600 to-purple-700 hover:from-brand-800 hover:via-brand-700 hover:to-purple-800 shadow-md shadow-brand-700/25 hover:shadow-lg hover:shadow-brand-700/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Enroll Now</span>
            <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-800 bg-brand-50 font-semibold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <FiPhone className="text-brand-700" />
              <span>Call: {ACADEMY_INFO.contact.phone}</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-700 to-purple-700 hover:from-brand-800 hover:to-purple-800 shadow-md transition-all"
            >
              <span>Enroll Now</span>
              <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
