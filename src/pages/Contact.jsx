import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin 
} from 'react-icons/fi';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa6';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import MapEmbed from '../components/MapEmbed';
import { ACADEMY_INFO } from '../data/academyData';

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCourse = searchParams.get('course') || '';

  return (
    <>
      <SEO
        title="Contact Us & Location"
        description="Get in touch with The Consistent Academy in Pune, Maharashtra. Verified phone, email, Google Maps directions, and enquiry prototype form."
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 mb-3">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Connect with The Academy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Whether you are preparing for IELTS, looking to advance your corporate communication, or enrolling your child in elocution, we are here to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Grid: Verified Details + Form + Google Map */}
      <section className="py-10 sm:py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form & Direct Contact Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Form Component (Card Header Integrated Inside) */}
              <ContactForm initialCourse={selectedCourse} />

              {/* Direct Instant Channels */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Prefer Direct Communication?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fastest response channels for immediate admission guidance.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={ACADEMY_INFO.contact.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/70 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block text-emerald-800">
                        WhatsApp Community
                      </span>
                      <span className="text-xs text-emerald-700">
                        Join for updates & queries
                      </span>
                    </div>
                  </a>

                  <a
                    href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200/80 text-brand-900 hover:bg-brand-100/70 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-700 text-white flex items-center justify-center text-lg shrink-0">
                      <FiPhone />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block text-brand-800">
                        Direct Phone Call
                      </span>
                      <span className="text-xs text-brand-700 font-semibold">
                        {ACADEMY_INFO.contact.phone}
                      </span>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Verified Details & Embedded Google Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Verified Contact Details Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Academy Contact Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Direct communication desk & center details in Pune.
                  </p>
                </div>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-brand-50 text-brand-700 shrink-0 mt-0.5">
                      <FiMapPin className="text-base" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                        Address / Location
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {ACADEMY_INFO.contact.address}
                      </p>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Serving local Pune batches & pan-India / international online batches.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-brand-50 text-brand-700 shrink-0 mt-0.5">
                      <FiPhone className="text-base" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                        Telephone
                      </span>
                      <a
                        href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                        className="text-slate-800 hover:text-brand-700 font-semibold transition-colors"
                      >
                        {ACADEMY_INFO.contact.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-brand-50 text-brand-700 shrink-0 mt-0.5">
                      <FiMail className="text-base" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                        Official Email
                      </span>
                      <a
                        href={`mailto:${ACADEMY_INFO.contact.email}`}
                        className="text-slate-800 hover:text-brand-700 font-medium transition-colors break-all"
                      >
                        {ACADEMY_INFO.contact.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Connect on Social Platforms
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={ACADEMY_INFO.contact.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 text-xs font-medium transition-colors"
                    >
                      <FaInstagram />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={ACADEMY_INFO.contact.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium transition-colors"
                    >
                      <FaLinkedinIn />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map Section */}
              <MapEmbed />

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
