import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowUpRight 
} from 'react-icons/fi';
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedinIn 
} from 'react-icons/fa6';
import { ACADEMY_INFO } from '../data/academyData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-flex items-center justify-center md:justify-start gap-3 group">
              <div className="p-1.5 bg-white rounded-lg inline-flex items-center justify-center">
                <img
                  src="/assets/logo2.png"
                  alt={ACADEMY_INFO.name}
                  className="h-9 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/logo.png';
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-white text-base">
                  {ACADEMY_INFO.name}
                </span>
                <span className="text-xs text-brand-400 uppercase tracking-wider font-semibold">
                  Pune, India
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed text-center md:text-left mx-auto md:mx-0">
              {ACADEMY_INFO.tagline} Led by British Council Certified IELTS Master Trainer Vidya Wankhade with 19+ years of professional pedagogy.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
              <a
                href={ACADEMY_INFO.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaInstagram className="text-base" />
              </a>
              <a
                href={ACADEMY_INFO.contact.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Community"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="text-base" />
              </a>
              <a
                href={ACADEMY_INFO.contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Company Page"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn className="text-base" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (Hidden on mobile view, visible on md+ screens) */}
          <div className="hidden md:flex space-y-3 flex-col items-start text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 flex flex-col items-start">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">About & Founder</a>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">All Courses</Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-white transition-colors">Proficiency Tests</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Educational Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">Careers & Faculty</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us & Map</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Programs */}
          <div className="space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Key Programs
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 flex flex-col items-center md:items-start">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">IELTS | TOEFL | PTE</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Corporate Survival</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Crack Your Interview</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Elocution for Kids</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Online Reading Club</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact */}
          <div className="space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Verified Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 flex flex-col items-center md:items-start w-full">
              <li className="w-full flex justify-center md:justify-start">
                <a
                  href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center md:items-start justify-center md:justify-start gap-2.5 hover:text-white transition-colors group"
                >
                  <FiPhone className="text-brand-400 shrink-0" />
                  <span>{ACADEMY_INFO.contact.phone}</span>
                </a>
              </li>
              <li className="w-full flex justify-center md:justify-start">
                <a
                  href={`mailto:${ACADEMY_INFO.contact.email}`}
                  className="flex items-center md:items-start justify-center md:justify-start gap-2.5 hover:text-white transition-colors group"
                >
                  <FiMail className="text-brand-400 shrink-0" />
                  <span className="break-all">{ACADEMY_INFO.contact.email}</span>
                </a>
              </li>
              <li className="w-full flex items-center md:items-start justify-center md:justify-start gap-2.5 text-center md:text-left">
                <FiMapPin className="text-brand-400 shrink-0" />
                <span>{ACADEMY_INFO.contact.address}</span>
              </li>
              <li className="pt-1 w-full flex justify-center md:justify-start">
                <a
                  href={ACADEMY_INFO.contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center md:justify-start gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium"
                >
                  <span>View on Google Maps</span>
                  <FiArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="text-center sm:text-left">
            <span>{ACADEMY_INFO.meta.copyright}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span>Developed & Maintained by</span>
            <a
              href={ACADEMY_INFO.meta.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>ThinkBuild</span>
              <FiArrowUpRight className="text-[11px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
